const { Router } = require('express');
const controllers = require('../controllers');

const rootRouter = Router();

// User Login and Creation
rootRouter.post('/login', controllers.User.verifyUser);
rootRouter.post('/signup', controllers.User.createUser);

module.exports = rootRouter;