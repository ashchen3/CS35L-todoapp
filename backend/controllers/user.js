const { and } = require('sequelize');
const models = require('../database/models');

const noUsernameError = new Error("username not provided. Please provide it at the top level of the JSON transmitted");

const createUser = async (req, res) => {
    try{
        /*const newName = req.body.username;
        const newEmail = req.body.email;
        const newPwd = req.body.pwdhash;
    
        const [existingUser] = await models.Tasklist.findOne({
            where: {id: newName},
            }
        );
    
        if (existingUser){
            return res.status(400).json({ error: 'User already exists.' });
        }
        
        const newUser = await models.User.create({
            newName,
            newEmail,
            newPwd,
        });*/

        if(!req.body.username) throw noUsernameError;

        const user = await models.User.create(req.body);

        userID = user.id;
        return res.status(201).json({ userID });

        }catch (error){
            return res.status(500).json({ error: error.message });
        }
}

const deleteUser = async (req,res) => {
    try{
        const username = req.body.username;
        if (!username) throw noUsernameError;
        const user = await models.User.findOne({where: {id: username}});
        if(!user) return res.status(404).send('User with the speciifed username does not exist');
        const deleteduser = await models.User.destroy({
            where: {id: username},
        });

        if (deleteUser){
            return res.status(204).send("User Deleted");
        }

    }catch (error){
        return res.status(500).send(error.message);
    }


}

const verifyUser = async (req, res) => {
    try{
        const userName = req.body.username;
        const password = req.body.password;   

        const [checkUser] = await models.Tasklist.findOne({
            where: {id: userName},
            }
        );

        if (checkUser && password === checkUser.pwdhash){
            return res.status(200).send("User Verified");
        }
        
        
    }catch (error){
        return res.status(500).send(error.message);
    }   
}

module.exports = {
    createUser, 
    deleteUser,
    verifyUser
};