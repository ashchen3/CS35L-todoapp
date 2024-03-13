import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import PendingIcon from "@mui/icons-material/MoreHorizOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
    Box,
    Button,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../services/AuthContext";

/**
 * Return a ListItem corresponding to a user on the search bar.
 * Contains the following fields:
 * - username
 * - button to add friend
 */
const SearchFriendListItem = ({
    friendUsername,
    friendId,
    handleClick,
    userIsFriendWith,
    userIsPendingWith,
}) => {
    // TODO: check if friend is already requested or not
    return (
        <ListItem>
            <ListItemText primary={friendUsername} />

            {!userIsFriendWith && !userIsPendingWith && (
                <IconButton onClick={() => handleClick(friendUsername, friendId)}>
                    <Tooltip title="Send friend request">
                        <PersonAddIcon />
                    </Tooltip>
                </IconButton>
            )}

            {userIsFriendWith && (
                <Tooltip title="Already in friends list">
                    <CheckIcon />
                </Tooltip>
            )}

            {/* TODO: display (and update) outgoing requests */}
            {userIsPendingWith && (
                <Tooltip title="Friend request pending">
                    <PendingIcon />
                </Tooltip>
            )}
        </ListItem>
    );
};

/**
 * Return a ListItem corresponding to a current friend.
 * Contains the following fields:
 * - username, with a link to the friend's home page
 * - delete button, to remove a friend
 */
const CurrentFriendListItem = ({ friendUsername, friendId }) => {
    return (
        <ListItem>
            <Link to={`/friends/${friendUsername}`} style={{ textDecoration: "none" }}>
                <ListItemText primary={friendUsername} />
            </Link>
        </ListItem>
    );
};

/**
 * Return a ListItem corresponding to a pending friend request.
 * Contains the following fields:
 * - username
 * - button to accept
 * - button to decline
 */
const PendingFriendListItem = ({ friendUsername, friendId, handleClick }) => {
    return (
        <ListItem>
            <ListItemText primary={friendUsername} />
            <IconButton onClick={() => handleClick(friendUsername, friendId)}>
                <CheckIcon />
            </IconButton>
        </ListItem>
    );
};

const FriendList = () => {
    const { username, token, logoutOnTokenExpiry } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    /**
     * Sample matchedUsers:
    [
        {
            "id": 4,
            "username": "aritra",
            "email": "ariiraari@example.com",
            "pwdhash": "ihatevvv",
            "salt": null,
            "friendReqReceivedFromIds": null,
            "friendReqReceivedFromNames": null,
            "friendIds": null,
            "friends": null,
            "createdAt": "2024-03-11T04:54:20.753Z",
            "updatedAt": "2024-03-11T04:54:20.753Z"
        },
    ]
     */
    const [matchedUsers, setMatchedUsers] = useState();

    // Sample: {"friendIds":[2,5],"friends":["jondoe","tts"]}
    const [currentFriends, setCurrentFriends] = useState();

    // Sample: {"friendReqRecFromIds": [1],"friendReqRecFromNames": ["janedoe"]}
    const [incomingRequests, setIncomingRequests] = useState();

    // Sample: {"friendReqSentToIds": [3,4],"friendReqSentToNames": ["chuawh","aritra"]}
    const [outgoingRequests, setOutgoingRequests] = useState();

    useEffect(() => {
        // Get current friends
        axios
            .get("http://localhost:3000/api/users/friends", {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                // console.log("Data received from friends");
                // console.log(res);
                setCurrentFriends(res.data);
            })
            .catch((err) => {
                console.log(err);
                // logoutOnTokenExpiry(err);
            });

        // Get incoming friend requests
        axios
            .get("http://localhost:3000/api/users/friendreq", {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                // console.log("Data received from friend requests");
                // console.log(res);
                setIncomingRequests(res.data);
            })
            .catch((err) => {
                console.log(err);
                // logoutOnTokenExpiry(err);
            });

        // Get outgoing friend requests
        axios
            .get("http://localhost:3000/api/users/sentfriendreq", {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                // console.log("Data received from friend requests");
                // console.log(res);
                setOutgoingRequests(res.data);
            })
            .catch((err) => {
                console.log(err);
                // logoutOnTokenExpiry(err);
            });

        // Populate search field
        getMatchedUsers(searchTerm);
    }, []);

    /** Callback to get users with usernames matching `query` */
    const getMatchedUsers = (query) => {
        axios
            .get("http://localhost:3000/api/users/search", {
                headers: {
                    Authorization: token,
                },
                params: {
                    searchTerm: query,
                },
            })
            .then((res) => {
                setMatchedUsers(res.data.filter((data) => data.username !== username));
                // console.log(matchedUsers);
            })
            .catch((err) => logoutOnTokenExpiry(err));
    };

    /** Update data whenever search result changed. */
    const handleSearchChange = (event) => {
        setSearchTerm(event.currentTarget.value);
        getMatchedUsers(event.currentTarget.value);
    };

    /** Handles when a friend request is sent. */
    const handleSendFriendRequest = (friendUsername, friendId) => {
        axios
            .post(
                "http://localhost:3000/api/users/friendreq",
                {
                    friendId: friendId,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((res) => {
                // outgoingRequests: {"friendReqSentToIds": [3,4],"friendReqSentToNames": ["chuawh","aritra"]}
                if (outgoingRequests?.friendReqSentToIds) {
                    setOutgoingRequests((prevData) => ({
                        friendReqSentToIds: [...prevData.friendReqSentToIds, friendId],
                        friendReqSentToNames: [...prevData.friendReqSentToNames, friendUsername],
                    }));
                } else {
                    setOutgoingRequests({
                        friendReqSentToIds: [friendId],
                        friendReqSentToNames: [friendUsername],
                    });
                }
            })
            .catch((err) => {
                logoutOnTokenExpiry(err);
            });
    };

    /** Handles when an incoming friend request is accepted. */
    const handleAcceptFriendRequest = (friendUsername, friendId) => {
        console.log(`Trying to accept friend request from ${friendUsername},${friendId}`);
        axios
            .put(
                "http://localhost:3000/api/users/friendreq",
                {
                    friendId: friendId,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            .then((res) => {
                // Sample: {"friendIds":[2,5],"friends":["jondoe","tts"]}
                setCurrentFriends((prevData) => ({
                    friendIds: [...prevData.friendIds, friendId],
                    friends: [...prevData.friends, friendUsername],
                }));

                // Sample: {"friendReqRecFromIds": [1],"friendReqRecFromNames": ["janedoe"]}
                let friendReqRecFromIds = incomingRequests.friendReqRecFromIds.slice();
                let friendReqRecFromNames = incomingRequests.friendReqRecFromNames.slice();
                setIncomingRequests({
                    friendReqRecFromIds: friendReqRecFromIds.filter((id) => id !== friendId),
                    friendReqRecFromNames: friendReqRecFromNames.filter(
                        (name) => name !== friendUsername
                    ),
                });
            })
            .catch((err) => {
                logoutOnTokenExpiry(err);
            });
    };

    return (
        <Grid
            container
            columnGap={5}
            sx={{
                justifyContent: "center",
                textAlign: "center",
                display: "flex",
                height: "100%",
            }}
        >
            {/* Left column: Search field and to add friends. */}
            <Grid item xs={10} sm={5} sx={{ height: "100%" }}>
                <Paper sx={{ height: "100%", overflowY: "inherit" }}>
                    <Box sx={{ height: "25%" }}>
                        <Typography variant="h6">Search for a user</Typography>
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            sx={{ width: "90%", my: 1 }}
                        />
                    </Box>
                    <List sx={{ height: "75%", overflowY: "auto", p: 0 }}>
                        {matchedUsers?.map((friend) => (
                            <SearchFriendListItem
                                key={friend.id}
                                friendUsername={friend.username}
                                friendId={friend.id}
                                handleClick={handleSendFriendRequest}
                                userIsFriendWith={
                                    currentFriends?.friendIds &&
                                    currentFriends.friendIds?.indexOf(friend.id) !== -1
                                }
                                userIsPendingWith={
                                    outgoingRequests?.friendReqSentToIds &&
                                    outgoingRequests?.friendReqSentToIds?.indexOf(friend.id) !== -1
                                }
                            />
                        ))}
                    </List>
                </Paper>
            </Grid>

            {/* Right column: Current friends and pending requests */}
            <Grid item xs={10} sm={5} sx={{ height: "100%", my: { xs: "10px", sm: 0 } }}>
                <Stack
                    sx={{
                        direction: "column",
                        justifyContent: "center",
                        rowGap: { sm: "10px", md: "4%" },
                        height: "100%",
                    }}
                >
                    {/* Current friends */}
                    <Paper sx={{ height: "48%", my: { xs: "10px", sm: 0 } }}>
                        <Typography variant="h6">Current Friends</Typography>
                        <List sx={{ height: "80%", overflowY: "auto", p: 0 }}>
                            {currentFriends?.friends?.map((username, i) => (
                                // TODO
                                <CurrentFriendListItem
                                    key={i}
                                    friendUsername={username}
                                    friendId={currentFriends.friendIds[i]}
                                />
                            ))}
                        </List>
                    </Paper>

                    {/* Incoming pending requests */}
                    <Paper sx={{ height: "48%", my: { xs: "10px", sm: 0 } }}>
                        <Typography variant="h6">Pending Requests</Typography>
                        <List sx={{ height: "80%", overflowY: "auto", p: 0 }}>
                            {/* Sample: {"friendReqRecFromIds": [1],"friendReqRecFromNames": ["janedoe"]} */}
                            {incomingRequests?.friendReqRecFromNames?.map((friend, i) => (
                                <PendingFriendListItem
                                    key={i}
                                    friendUsername={friend}
                                    friendId={incomingRequests?.friendReqRecFromIds?.at(i)}
                                    handleClick={handleAcceptFriendRequest}
                                />
                            ))}
                        </List>
                    </Paper>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default FriendList;
