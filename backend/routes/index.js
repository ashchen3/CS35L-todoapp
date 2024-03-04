const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

// CRUD for tasklists
router.get('/lists', controllers.Tasklist.getAllTasklists);
router.get('/lists/:tasklistId', controllers.Tasklist.getTasklistById);
router.post('/lists', controllers.Tasklist.createTasklist);
router.put('/lists/:tasklistId', controllers.Tasklist.updateTasklist);
router.delete('/lists/:tasklistId',controllers.Tasklist.deleteTasklist);

/* TODO: CRUD for tasks
router.post('/task', controllers.getTask);
router.get('/tasks/:taskID', controllers.getTask);
router.delete('tasks/:taskID', controllers.deleteTask);
router.put('/lists/:taskID', controllers.updateList);
*/

router.post('/users', controllers.User.createUser);
router.delete('/users', controllers.User.deleteUser);
router.get('/users', controllers.User.verifyUser);
module.exports = router;