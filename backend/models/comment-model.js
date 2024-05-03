const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    text : {
        type : String,
        required : [true, 'Por favor teclea un comentario']
    }
}, { timestamps : true })

module.exports = mongoose.model('Comment', tareaSchema);