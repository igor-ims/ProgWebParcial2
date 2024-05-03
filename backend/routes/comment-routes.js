const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth-middleware');
const {getComments, crearComments, updateComments, deleteComments} = require('../controllers/comment-controller');


router.route('/').get(protect, getComments).post(protect, crearComments);

router.route('/:id').delete(deleteComments).put(updateComments);

module.exports = router;