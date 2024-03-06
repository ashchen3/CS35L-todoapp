const { and } = require('sequelize');
const models = require('../database/models');

const noUsernameError = new Error("Username not provided. Please provide it at the top level of the JSON transmitted");
const noPasswordError = new Error("Password not provided. Please provide it in the JSON transmitted");
const authenticationError = new Error('Incorrect username or password');

const createUser = async (req, res) => {

    try{
        const { username: newUsername, pwd: newPwd } = req.body;
        if(!newUsername) throw noUsernameError;
        if(!newPwd) throw noPasswordError;

        const existingUser = await models.User.findOne({ where: {username: newUsername} });
        if (existingUser)
            return res.status(400).json({ error: 'User already exists.' });

        // TO CHANGE IF HASHING IS IMPLEMENTED - currently the pwdhash is the pwd
        req.body.pwdhash = newPwd;
        delete req.body.pwd;

        const user = await models.User.create(req.body);

        userID = user.id;
        return res.status(201).json({ userID });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req,res) => {
    
    try{
        const { username, pwd } = req.body;
        if (!username) throw noUsernameError;
        if (!pwd) throw noPasswordError;

        const user = await models.User.findOne({ where: {username: username} });
        if (!user || user.pwdhash != pwd) throw authenticationError;

        const deletedUser = await models.User.destroy({
            where: {id: user.id},
        });

        if (deletedUser) return res.status(204);
        else return res.status(500).send('Delete failed on the backend');

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const verifyUser = async (req, res) => {
    
    try{
        const { username, pwd } = req.body;
        if (!username) throw noUsernameError;
        if (!pwd) throw noPasswordError;

        const checkUser = await models.User.findOne({ where: {username: username} });
        if (!checkUser || checkUser.pwdhash != pwd)
            return res.status(400).json({
                message: "Incorrect username or password"
            });

        return res.status(200).json({
            message: "User Verified",
            userId: user.id
        });

    } catch (error){
        return res.status(500).send(error.message);
    }
}

module.exports = {
    createUser, 
    deleteUser,
    verifyUser
};