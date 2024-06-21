const { Schema, default: mongoose } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: '60f3b3b3b3b3b3b3b3b3b3b3',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    topics: [
        {
            type: String,
        }
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ]
})

module.exports = mongoose.model('Post', postSchema);