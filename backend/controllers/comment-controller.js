const asyncHandler = require('express-async-handler')

const Comment = require('../models/comment-model')

const getComments = asyncHandler ( async(req, res) => {
    const comments = await Comment.find();
    res.status(200).json(comments);
} )

const crearComments = asyncHandler ( async(req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error( 'Por favor teclea un comentario.' );
    }

    const comentarioomment = await Comment.create(
        {
            text : req.body.text,
            user : req.user.id
        }
    )

    res.status(201).json(comentario);
} )

const updateComments = asyncHandler ( async(req, res) => {
    const comentario = await Comment.findById(req.params.id);

    if(!Comment){
        res.status(404);
        throw new Error('El comentario no existe.');
    }
    const commentUpdated = await Comment.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.status(200).json({commentUpdated});
} )

const deleteComments = asyncHandler ( async(req, res) => {
    const comment = await Comment.findById(req.params.id);

    if(!comment){
        res.status(404);
        throw new Error('El comentario no existe.');
    }

    await Comment.deleteOne(comment);
    res.status(203).json({commentDeleted : comment});
} )

module.exports = {
    getComments,
    crearComments,
    updateComments,
    deleteComments
}