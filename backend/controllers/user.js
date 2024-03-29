require('dotenv').config();
const jwt = require('jsonwebtoken');
const models = require('../database/models');

const noUsernameError = new Error("Username not provided. Please provide it at the top level of the JSON transmitted");
const noPasswordError = new Error("Password not provided. Please provide it in the JSON transmitted");

// Requires no authorization token, but will not hand out tokens
// Login with newly created account to obtain token
const createUser = async (req, res) => {

    try{
        const { username: newUsername, pwd: newPwd } = req.body;
        if(!newUsername) throw noUsernameError;
        if(!newPwd) throw noPasswordError;
        if(newUsername.includes(',')) throw Error("Commas are not allowed in usernames")

        const existingUser = await models.User.findOne({ where: {username: newUsername} });
        if (existingUser)
            return res.status(400).json({ error: 'User already exists.' });

        // TO CHANGE IF HASHING IS IMPLEMENTED - currently the pwdhash is the pwd
        req.body.pwdhash = newPwd;
        delete req.body.pwd;

        const user = await models.User.create(req.body);

        if(!user) return res.status(500).send('User creation failed on the backend');
        return res.status(201).send("Account created. Please login");

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Requires no authentication token, since it is the callback that issues the tokens
const verifyUser = async (req, res) => {
    
    try{
        const { username, pwd } = req.body;
        if (!username) throw noUsernameError;
        if (!pwd) throw noPasswordError;

        const checkUser = await models.User.findOne({ where: {username: username} });
        if (!checkUser || checkUser.pwdhash != pwd)
            return res.status(401).json({
                message: "Incorrect username or password"
            });

        const token = jwt.sign(
            { userId: checkUser.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        return res.status(200).json({
            message: "User Verified",
            token: token
        });

    } catch (error){
        return res.status(500).send(error.message);
    }
}

/**
 * FUNCTIONS FROM HERE REQUIRE A JWT TOKEN IN THE AUTHORIZATION HEADER
 */

// Searching functionality for users, case-insensitive, partial matches are included
const findUser = async (req, res) => {

    try{
        const term = req.query.searchTerm;
        // if (!term) return res.status(400).send("No search term provided in query string");

        const users = await models.User.findAll({
            where: {
                username: {
                    [models.Sequelize.Op.iLike] : `%${term}%`
                }
            }
        })
        
        if(!users) return res.status(500).send('User search failed on the backend');
        return res.status(200).json(users);
        
    } catch (error){
        return res.status(500).send(error.message);
    }
}

// DEPRECATED: Delete yourself from the database
/*
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
*/

module.exports = {
    createUser, 
    verifyUser,
    findUser
};