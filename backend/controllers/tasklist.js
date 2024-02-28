const models = require('../database/models');

const noUserIdError = new Error("userId not provided. Please provide it at the top level of the JSON transmitted");
const noTasklistIdError = new Error("tasklistId not provided in URL. Please provided the id literal as if it is a subdirectory e.g. /api/lists/1");
const authenticationError = new Error('Unauthorized access');

// Create new list (all keys for which allowNull is false have to be in the JSON passed)
const createTasklist = async (req,res) => {

    try{
        if(!req.body.userId) throw noUserIdError;

        const tasklist = await models.TaskList.create(req.body);
        return res.status(201).json({ tasklist });

    } catch (error){
        return res.status(500).json({error: error.message})
    }
}

// Returns all tasklists belonging to a user
const getAllTasklists = async (req, res) => {

    try {
        const userId = req.body.userId;
        if (!userId) throw noUserIdError;

        const tasklists = await models.Tasklist.findAll({
            where: { userId: userId },
            include: [{
                model: models.Task,
                as: 'tasks',
            }]
        });
        return res.status(200).json(tasklists);

    } catch (error) {
        return res.status(500).send(error.message);
    };
};

// Returns one tasklist based on the tasklistId provided
// For now, uses the userId as authentication
const getTasklistById = async (req, res) => {

    try{
        const userId = req.body.userId;
        if (!userId) throw noUserIdError;
        const { tasklistId } = req.params;
        if (!tasklistId) throw noTasklistIdError;

        const tasklist = await models.Tasklist.findOne({
            where: { id: tasklistId },
            include: [
                {
                    model: models.Task,
                    as: 'tasks',
                }
            ]
        });
        if (tasklist.userId != userId) throw authenticationError;

        if (tasklist) return res.status(200).json(tasklist);
        else return res.status(404).send('Tasklist with the speciifed ID does not exist');

    } catch (error){
        return res.status(500).send(error.message);
    }
}

// Update the fields of a tasklist based on the JSON fields passed. Requires a tasklistId to be passed to determine which tasklist to update
const updateTasklist = async (req, res) => {

    try{
        const userId = req.body.userId;
        if (!userId) throw noUserIdError;
        const { tasklistId } = req.params;
        if (!tasklistId) throw noTasklistIdError;

        const tasklist = await models.Tasklist.findOne({where: {id: tasklistId}});
        if(!tasklist) return res.status(404).send('Tasklist with the speciifed ID does not exist');
        if(tasklist.userId != userId) throw authenticationError;

        const [ updated ] = await models.Tasklist.update(req.body, {
            where: { id: tasklistId }
        });
        if (updated){
            const updatedTasklist = await models.Tasklist.findOne({where: {id: tasklistId}});
            res.status(200).json(updatedTasklist);
        }
        else return res.status(500).send('Update failed on the backend');

    } catch (error){
        return res.status(500).send(error.message);
    }
}

// Delete a tasklist based on the tasklistId
// TODO: Ensure that the authorization token authenticates the user as the userId for that tasklist
const deleteTasklist = async (req, res) => {

    try{
        const userId = req.body.userId;
        if (!userId) throw noUserIdError;
        const { tasklistId } = req.params;
        if (!tasklistId) throw noTasklistIdError;

        const tasklist = await models.Tasklist.findOne({where: {id: tasklistId}});
        if(!tasklist) return res.status(404).send('Tasklist with the speciifed ID does not exist');
        if(tasklist.userId != userId) throw authenticationError;

        const deleted = await models.Tasklist.destroy({
            where: { id: tasklistId }
        });
        if (deleted) return res.status(204).send("Tasklist with id " + tasklistId + " deleted");
        else return res.status(500).send('Delete failed on the backend');

    } catch (error){
        return res.status(500).send(error.message);
    }
}

module.exports = { createTasklist, getAllTasklists, getTasklistById, updateTasklist, deleteTasklist };