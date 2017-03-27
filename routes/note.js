var express = require('express');
var router = express.Router();

var NoteCtrl = require('../controllers/note')
var task_find = require('../middlewares/find_task')

router.route('/')
    .get(NoteCtrl.findAll)
    
router.route('/:username')
    .get(NoteCtrl.findStudentNote)
    
router.get('/new/:id',task_find ,NoteCtrl.renderNewNote)

router.get('/:id/edit',task_find, NoteCtrl.renderEditNote)

router.all('/:id*', task_find)

router.route('/:id')
    .put(NoteCtrl.updateNote)
    .post(NoteCtrl.addNote)
    .delete(NoteCtrl.deleteNote)


module.exports = router;