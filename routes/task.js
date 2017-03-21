var express = require('express');
var router = express.Router();

var TaskCtrl = require('../controllers/task')
var task_find = require('../middlewares/find_task')

router.get('/new', TaskCtrl.renderNewTask)

router.route('/')
    .get(TaskCtrl.findAll)
    .post(TaskCtrl.addTask)

router.all('/:id*', task_find)

router.route('/:id')
     .get(TaskCtrl.renderShowTask)

module.exports = router;