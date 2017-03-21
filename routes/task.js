var express = require('express');
var router = express.Router();

var TaskCtrl = require('../controllers/task')
var task_find = require('../middlewares/find_task')

router.get('/new', TaskCtrl.renderNewTask)

router.route('/')
    .get(TaskCtrl.findAll)
    .post(TaskCtrl.addTask)

router.all('/:id*', task_find)
router.get('/:id/edit', TaskCtrl.renderEditTask)
router.route('/:id')
     .get(TaskCtrl.renderShowTask)
     .delete(TaskCtrl.deleteTask)

module.exports = router;