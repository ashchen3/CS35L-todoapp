const { Router } = require('express');
const controllers = require('../controllers');
const { verifyToken } = require('../middleware/auth');

const apiRouter = Router();
apiRouter.use(verifyToken);

// CRUD for tasklists
apiRouter.get('/lists', controllers.Tasklist.getAllTasklists);
apiRouter.get('/lists/:tasklistId', controllers.Tasklist.getTasklistById);
apiRouter.post('/lists', controllers.Tasklist.createTasklist);
apiRouter.put('/lists/:tasklistId', controllers.Tasklist.updateTasklist);
apiRouter.delete('/lists/:tasklistId',controllers.Tasklist.deleteTasklist);

// CRUD for tasks
apiRouter.get('/tasks', controllers.Task.getAllTasks);
apiRouter.get('/tasks/:taskId', controllers.Task.getTaskById);
apiRouter.post('/tasks', controllers.Task.createTask);
apiRouter.put('/tasks/:taskId', controllers.Task.updateTask);
apiRouter.delete('/tasks/:taskId', controllers.Task.deleteTask);

// Delete User
apiRouter.delete('/users', controllers.User.deleteUser);

module.exports = apiRouter;