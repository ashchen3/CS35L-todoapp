const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))

//CRUD for TaskList
router.post('/lists', controllers.createPost);
router.get('/list/:listID', controllers.getList);
router.delete('/lists/:listID',controllers.deleteList);
router.put('/lists/:listID', controllers.updateList);

router.post('/task', controllers.getTask);
router.get('/tasks/:taskID', controllers.getTask);
router.delete('tasks/:taskID', controllers.deleteTask);
router.put('/lists/:taskID', controllers.updateList);


module.exports = router;