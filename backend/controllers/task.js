const models = require('../database/models');

const noTasklistIdError = new Error("tasklistId not provided. Please provide it at the top level of the JSON transmitted");
const noTaskIdError = new Error("taskId not provided in URL. Please provided the id literal as if it is a subdirectory e.g. /api/tasks/1");


// Create new task (all keys for which allowNull is false have to be in the JSON passed)
const createTask = async (req,res) => {

    try{
        if(!req.query.tasklistId) throw noTasklistIdError; 

        const task = await models.Task.create(req.body); 
        return res.status(201).json({task}); 

    } catch (error){
        return res.status(500).json({error: error.message})
    }
}

// Returns all tasks tagged to a tasklist
const getAllTasks = async (req, res) => {

    try{
        const { userId, tasklistId } = req.query;
        if (!tasklistId) throw noTasklistIdError;

        const tasks = await models.Task.findAll({
            where: { tasklistId: tasklistId },
            include: [{
                model: models.Tasklist,
                as: 'parent-tasklist',
            }]
        });

        if(!userId || (tasks && tasks.length && userId != tasks[0]["parent-tasklist"].userId))
            return res.status(403).send("Unauthorized access");

        if(!tasks) return res.status(500).send('Retrieval failed on the backend');
        if(!tasks.length) return res.status(404).send('Task list does not exist for that id');

        return res.status(200).json(tasks);

    } catch (error){
        return res.status(500).send(error.message);
    }
}

// Returns one task based on the taskId provided
const getTaskById = async (req, res) => {

    try{
        const userId = req.query.userId;
        const { taskId } = req.params;
        if (!taskId) throw noTaskIdError;
        
        const { result, success } = await getSingleTask(userId, taskId, res);
        if (!success) return result;

        return res.status(200).json(result);

    } catch (error){
        return res.status(500).send(error.message);
    }
}

// Update the fields of a task based on the JSON fields passed. Requires a taskId to be passed to determine which task to update
const updateTask = async (req, res) => {
    try{
        const userId = req.query.userId;
        const { taskId } = req.params;
        if (!taskId) throw noTaskIdError;

        const { result, success } = await getSingleTask(userId, taskId, res);
        if (!success) return result;

        const updated = await models.Task.update(req.body,{ where: { id: taskId } });

        if (updated) {
            const updatedTask = await models.Task.findOne({ where: { id: taskId } });
            res.status(200).json({task: updatedTask});
        }
        else return res.status(500).send('Update failed on the backend');

    } catch (error){
        return res.status(500).send(error.message);
    }
}

// Delete a task based on the taskId
const deleteTask = async (req, res) => {

    try{
        const userId = req.query.userId;
        const { taskId } = req.params;
        if (!taskId) throw noTaskIdError;

        const { result, success } = await getSingleTask(userId, taskId, res);
        if (!success) return result;

        const deleted = await models.Task.destroy({
            where: { id: taskId }
        });
        if (deleted) return res.status(204);
        else return res.status(500).send('Deletion failed on the backend');

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getSingleTask = async (userId, taskId, res) => {

    const task = await models.Task.findOne({
        where: {id: taskId},
        include: [{
            model: models.Tasklist,
            as: 'parent-tasklist',
        }]
    });

    if(!userId || (task && task["parent-tasklist"] && userId != task["parent-tasklist"].userId))
        return { result: res.status(403).send("Unauthorized access"), success: false };

    if (!task) return { result: res.status(404).send('Task does not exist for that id'), success: false };
    if (!task["parent-tasklist"]) return { result: res.status(404).send('Task list for task no longer exists'), success: false };

    return { result: task, success: true };
}

module.exports = {
    createTask,
    deleteTask,
    updateTask,
    getAllTasks,
    getTaskById
};