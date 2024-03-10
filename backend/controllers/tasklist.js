const models = require('../database/models');

const noTasklistIdError = new Error("tasklistId not provided in URL. Please provided the id literal as if it is a subdirectory e.g. /api/lists/1");
const authenticationError = new Error('Unauthorized access');

// Create new list (all keys for which allowNull is false have to be in the JSON passed)
const createTasklist = async (req,res) => {

    try{
        req.body.userId = req.userId;
        const tasks = req.body.tasks;

        const tasklist = await models.Tasklist.create(req.body);
        if (!tasklist) return res.status(500).send('Task list creation failed on the backend');

        if (tasks && tasks.length > 0){
            const tasksAdded = await models.Task.bulkCreate(
                tasks.map(task => {
                    if (task.deadline == "") delete task.deadline;
                    if (!task.completed) task.completed = false;
                    task['tasklistId'] = tasklist.id;
                    return task;
                })
            );
            if (!tasksAdded) return res.status(500).send('Bulk task creation failed on the backend');
        }

        const { result, success } = await getSingleTasklist(req.body.userId, tasklist.id, res);
        if (!success) return result;

        return res.status(201).json(result);

    } catch (error){
        return res.status(500).json({error: error.message})
    }
}

// Returns all tasklists belonging to a user (userId obtained from JWT)
// If the sendTasks flag (query string param) is set to 0, the associated tasks will not be sent. By default, this flag is set to 1
const getAllTasklists = async (req, res) => {

    try {
        const userId = req.userId;
        const sendTasks = req.query.sendTasks || 1;

        var findTasklistOptions = {
            where: { userId: userId },
            include: [{
                model: models.Task,
                as: 'tasks',
            }]
        };
        if (sendTasks == 0) delete findTasklistOptions.include;

        const tasklists = await models.Tasklist.findAll(findTasklistOptions);
        return res.status(200).json(tasklists);

    } catch (error) {
        return res.status(500).send(error.message);
    };
};

// Returns one tasklist based on the tasklistId provided
// Uses the userId from JWT to check ownership of tasklist
const getTasklistById = async (req, res) => {

    try{
        const userId = req.userId;
        const { tasklistId } = req.params;
        if (!tasklistId) throw noTasklistIdError;
        
        const { result, success } = await getSingleTasklist(userId, tasklistId, res);
        if (!success) return result;

        return res.status(200).json(result);

    } catch (error){
        return res.status(500).send(error.message);
    }
}

// Update the fields of a tasklist based on the JSON fields passed. Requires a tasklistId to be passed to determine which tasklist to update
// Uses the userId from JWT to check ownership of tasklist
const updateTasklist = async (req, res) => {

    try{
        const userId = req.userId;
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
// Uses the userId from JWT to check ownership of tasklist
const deleteTasklist = async (req, res) => {

    try{
        const userId = req.userId;
        const { tasklistId } = req.params;
        if (!tasklistId) throw noTasklistIdError;

        const tasklist = await models.Tasklist.findOne({where: {id: tasklistId}});
        if(!tasklist) return res.status(404).send('Tasklist with the speciifed ID does not exist');
        if(tasklist.userId != userId) throw authenticationError;

        const deleted = await models.Tasklist.destroy({
            where: { id: tasklistId }
        });

        if (deleted) return res.status(204).send("Tasklist deleted");
        else return res.status(500).send('Delete failed on the backend');

    } catch (error){
        return res.status(500).send(error.message);
    }
}

const getSingleTasklist = async (userId, tasklistId, res) => {

    const tasklist = await models.Tasklist.findOne({
        where: { id: tasklistId },
        include: [
            {
                model: models.Task,
                as: 'tasks',
            }
        ]
    });

    if (tasklist && tasklist.userId != userId)
        return { result: res.status(403).send("Unauthorized access"), success: false };        

    if (!tasklist) return { result: res.status(404).send('Tasklist does not exist for that id'), success: false };

    return { result: tasklist, success: true };
}

module.exports = { 
    createTasklist, 
    getAllTasklists, 
    getTasklistById, 
    updateTasklist, 
    deleteTasklist
};
