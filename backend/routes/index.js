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

// API for User Deletion and Searching
apiRouter.get('/users/search', controllers.User.findUser);
apiRouter.get('/users/friends', controllers.Friend.getFriends);
apiRouter.get('/users/friendreq', controllers.Friend.getFriendReqs);
apiRouter.post('/users/friendreq', controllers.Friend.sendFriendRequest);
apiRouter.put('/users/friendreq', controllers.Friend.acceptFriendRequest);

//Check if Server is Running
apiRouter.get('/', () => {
    return res.status(500).send("Server Running");
});

module.exports = apiRouter;