var express = require('express');
var router = express.Router();

var NoteCtrl = require('../middlewares/note_reset')
var task_find = require('../middlewares/find_task')

router.route('/')

router.get('/new/:id',task_find ,NoteCtrl.renderNewNote)

router.get('/:id/edit',task_find, NoteCtrl.renderEditNote)

router.all('/:id*', task_find)

router.route('/:id')
    .put(NoteCtrl.updateNote)
    .post(NoteCtrl.addNote)
    .delete(NoteCtrl.deleteNote)

module.exports = router;