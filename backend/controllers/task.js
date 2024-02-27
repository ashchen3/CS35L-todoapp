const models = require('../database/models');
//create new task
const createTask = async (req,res) => {
    try{
        const task = await models.Task.create(req.body);
        return res.status(201).json({task});
    }catch (error){
        return res.status(500).json({error: error.message})
    }
}

//delete a task
const deleteTask = async (req, res) => {
    try{
        const {taskID} = req.params;
        const deleted = await models.Task.destroy({
            where: {id: taskID}
        })
        if (deleted){
            return res.status(204).send("Task Deleted");
        }
    }catch (error){
        return res.status(500).send(error.message);
    }
}

//update a task
const updateTask = async (req, res) => {
    try{
        const {taskID} = req.params;
        const [updated] = await models.TaskList.update(req.body,{
            where: {id: taskID}
        });
        if (updated){
            const updatedTask = await models.Task.findOne({where: {id: taskID}});
            res.status(200).json({task: updatedTask});
        }
    }catch (error){
        return res.status(500).send(error.message);
    }
}

//get task title and description
const getTask = async (req, res) => {
    try{
        const {taskID} = req.params;
        const task = await models.Task.findOne({
            where: {id: taskID},
        });
        if (task){
            return res.status (200).json({task});
        }
    }catch (error){
        return res.status(500).send(error.message);
    }
}