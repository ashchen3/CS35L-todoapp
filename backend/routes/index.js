const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))

//CRUD for TaskList
router.post('/lists', controllers.createPost);
router.get('/list/:listID', controllers.getList);
router.delete('/lists/:listID',controllers.delteList);
router.put('/lists/:listID', controllers.updateList);


module.exports = router;