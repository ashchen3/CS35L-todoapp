const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

// CRUD for tasklists
router.get('/lists', controllers.Tasklist.getAllTasklists);
router.get('/lists/:tasklistId', controllers.Tasklist.getTasklistById);
router.post('/lists', controllers.Tasklist.createTasklist);
router.put('/lists/:tasklistId', controllers.Tasklist.updateTasklist);
router.delete('/lists/:tasklistId',controllers.Tasklist.deleteTasklist);

// CRUD for tasks
router.get('/tasks', controllers.Task.getAllTasks);
router.get('/tasks/:taskId', controllers.Task.getTaskById);
router.put('/tasks/:taskId', controllers.Task.updateTask);
router.delete('/tasks/:taskId', controllers.Task.deleteTask);

/* TODO: CRUD for tasks
router.post('/task', controllers.getTask);
router.put('/lists/:taskID', controllers.updateList);
*/

// CRUD for Users
router.post('/login', controllers.User.verifyUser);
router.post('/users', controllers.User.createUser);
router.delete('/users', controllers.User.deleteUser);


module.exports = router;