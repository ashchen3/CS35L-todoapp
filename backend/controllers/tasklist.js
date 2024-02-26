const models = require('../database/models');
//create empty list
const createList = async (req,res) => {
    try{
        const list = await models.Task.create(req.body);
        return res.status(201).json({
            list,
          });
    }catch (error){
        return res.status(500).json({error: error.message})
    }
}

//get all tasks in a list
const getList = async (req, res) => {
    try{
        const {listID} = req.params;
        const list = await models.TaskList.findOne({
            where: {id: listID},
            include: [
                {
                    model: models.Task,
                    as: 'tasks',
                }
            ]
        });
        if (list){
            return res.status (200).json({list});
        }
    }catch (error){
        return res.status(500).send(error.message);
    }
}

//update a list
const updateList = async (req, res) => {
    try{
        const {listID} = req.params;
        const [updated] = await models.TaskList.update(req.body,{
            where: {id: listID}
        });
        if (updated){
            const updatedList = await models.TaskList.findOne({where: {id: listID}});
            res.status(200).json({list: updatedList});
        }
    }catch{
        return res.status(500).send(error.message);
    }
}


//delete a list
const deleteList = async (req, res) => {
    try{
        const {listID} = req.params;
        const deleted = await models.TaskList.destroy({
            where: {id: listID}
        })
    }catch (error){
        if (deleted){
            return res.status(500).send(error.message);
        }
    }
}

module.exports = {
    createList,
}