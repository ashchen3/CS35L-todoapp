const models = require('../database/models');

const noFriendReqFromError = (friendId) => new Error("No friend request received from user " + friendId);

// Send a friend request to another user by appending your id and username to their list of friend requests
const sendFriendRequest = async (req, res) => {

    try{
        const userId = req.userId;
        const friendId = req.body.friendId;
        if (!friendId) return res.status(400).send("No friendId provided in posted JSON");

        const requestTo = await models.User.findOne({ where: {id: friendId} });
        if (!requestTo) return res.status(404).send('User with the speciifed ID does not exist');
        if (requestTo.friendReqRecFromIds && requestTo.friendReqRecFromIds.includes(userId))
            throw Error("Friend Request Pending, do not request again");
        if (requestTo.friendIds && requestTo.friendIds.includes(userId))
            throw Error("Friend Request Denied. User is already in friendlist");

        const requestFrom = await models.User.findOne({ where: {id: userId} });
        if (!requestFrom) return res.status(500).send('Internal Server Error');
        if (requestFrom.friendReqRecFromIds && requestFrom.friendReqRecFromIds.includes(friendId))
            throw Error("Friend Request Denied. The other user has already requested to be friends");

        const [ updatedFriend ] = await models.User.update({
            friendReqRecFromIds: 
                requestTo.friendReqRecFromIds ? 
                    [...(requestTo.friendReqRecFromIds), userId] : 
                    [userId],
            friendReqRecFromNames: 
                requestTo.friendReqRecFromNames ? 
                    [...(requestTo.friendReqRecFromNames), requestFrom.username] :
                    [requestFrom.username]
        }, { where: { id: friendId }});

        const [ updatedUser ] = await models.User.update({
            friendReqSentToIds:
                requestFrom.friendReqSentToIds ?
                    [...(requestFrom.friendReqSentToIds), friendId]:
                    [friendId],
            friendReqSentToNames: 
                requestFrom.friendReqSentToNames ? 
                    [...(requestFrom.friendReqSentToNames), requestTo.username] :
                    [requestTo.username]
        }, {where: { id: userId }});
        
        if(!updatedFriend || !updatedUser) return res.status(500).send('Friend request failed on the backend');
        return res.status(200).send('Friend request succeeded');
        
    } catch (error){
        return res.status(500).send(error.message);
    }
}

/**
 * Accepts a friend request by: 
 * (1) Removing the friend request from the current user friend request list
 * (2) Adding the friend to the current user's friendlist
 * (3) Adding the user to his/her friend's friendlist
 */
const acceptFriendRequest = async (req, res) => {

    try{
        const userId = req.userId;
        const friendId = req.body.friendId;
        if (!friendId) return res.status(400).send("No friendId provided in posted JSON");

        const user = await models.User.findOne({ where: {id: userId} });
        if (!user) return res.status(500).send('Internal Server Error');
        if (user.friendIds && user.friendIds.includes(friendId))
            throw Error("User is already a friend!");
        if (!user.friendReqRecFromIds || !user.friendReqRecFromNames) 
            throw noFriendReqFromError(friendId);

        const friendIndex = user.friendReqRecFromIds.findIndex((element) => element === friendId);
        if (friendIndex === -1) throw noFriendReqFromError(friendId);

        const friend = await models.User.findOne({ where: {id: friendId} });
        if (!friend) return res.status(404).send('Friend with the speciifed ID does not exist');

        user.friendReqRecFromIds.splice(friendIndex, 1);
        user.friendReqRecFromNames.splice(friendIndex, 1);

        // Remove from friend requests, add to friends for current user
        const [ updatedUser ] = await models.User.update({
            friendReqRecFromIds: user.friendReqRecFromIds,
            friendReqRecFromNames: user.friendReqRecFromNames,
            friendIds: 
                user.friendIds ? 
                    [...(user.friendIds), friendId] : 
                    [friendId],
            friends: 
                user.friends ? 
                    [...(user.friends), friend.username] :
                    [friend.username]
        }, { where: { id: userId }});
        
        if(!updatedUser) return res.status(500).send('Friend request acceptance (accepter side) failed on the backend');
        
        const sentIndex = friend.friendReqSentToIds.findIndex((element) => element === userId);
        if (sentIndex === -1) throw noFriendReqFromError(friendId);

        friend.friendReqSentToIds.splice(sentIndex, 1);
        friend.friendReqSentToNames.splice(sentIndex, 1);

        // Add to friends for friend and remove from list of pending sent requests
        const [ updatedFriend ] = await models.User.update({
            friendReqSentToIds : friend.friendReqSentToIds,
            friendReqSentToNames: friend.friendReqSentToNames,
            friendIds: 
                friend.friendIds ? 
                    [...(friend.friendIds), userId] : 
                    [userId],
            friends: 
                friend.friends ? 
                    [...(friend.friends), user.username] :
                    [user.username]
        }, { where: { id: friendId }});

        if(!updatedFriend) return res.status(500).send('Friend request acceptance (requester side) failed on the backend');

        return res.status(200).send('Friend request accepted');
        
    } catch (error){
        return res.status(500).send(error.message);
    }
}

// Returns a JSON object containing two arrays - one for friendIds, one for friend usernames
const getFriends = async (req, res) => {

    try {
        const userId = req.userId;
        const user = await models.User.findOne({ where: {id: userId} });
        if (!user) return res.status(500).send('Internal Server Error');

        return res.status(200).json({
            friendIds: user.friendIds,
            friends: user.friends
        });

    } catch (error) {
        return res.status(500).send(error.message);
    };
};

// Returns a JSON object containing two arrays - one for user Ids from which friend requests were received, and the other for their usernames
const getFriendReqs = async (req, res) => {

    try {
        const userId = req.userId;
        const user = await models.User.findOne({ where: {id: userId} });
        if (!user) return res.status(500).send('Internal Server Error');

        return res.status(200).json({
            friendReqRecFromIds: user.friendReqRecFromIds,
            friendReqRecFromNames: user.friendReqRecFromNames
        });

    } catch (error) {
        return res.status(500).send(error.message);
    };
};

// Returns a JSON object containing two arrays - one for user Ids to which friend requests were sent, and the other for their usernames
const getSentFriendReqs = async (req, res) => {

    try {
        const userId = req.userId;
        const user = await models.User.findOne({ where: {id: userId} });
        if (!user) return res.status(500).send('Internal Server Error');

        return res.status(200).json({
            friendReqSentToIds: user.friendReqSentToIds,
            friendReqSentToNames: user.friendReqSentToNames
        });

    } catch (error) {
        return res.status(500).send(error.message);
    };
};

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    getFriends,
    getFriendReqs,
    getSentFriendReqs
};