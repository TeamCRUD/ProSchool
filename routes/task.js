var express = require('express');
var router = express.Router();

var TaskCtrl = require('../controllers/task')
var task_find = require('../middlewares/find_task')

router.route('/')
    .get(TaskCtrl.findAll)
    .post(TaskCtrl.addTask)

router.get('/new', TaskCtrl.renderNewTask)

router.all('/:id*', task_find)
router.get('/:id/edit', TaskCtrl.renderEditTask)
router.route('/:id')
     .get(TaskCtrl.renderShowTask)
     .put(TaskCtrl.updateTask)
     .delete(TaskCtrl.deleteTask)

module.exports = router;