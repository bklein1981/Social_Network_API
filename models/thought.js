const { Schema, model } = require('mongoose');
const reactionSchema = requre("./reaction")
const date = require('date-and-time');

const thoughtSchema = new Schema({
    //thoughtText
    thoughtText: {
        type: String,
        required: true,
        trim: true,
        min: 1,
        max: 280
    },
    //username
    username: {
        type: String,
        required: true,
    },
    //createdAt
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => date.format(createdAt, 'M-D-YYYY h:m A'),
        set: (createdAt) => date.parse(createdAt, 'M-D-YYYY h:m A')
    },
    //reaction
    reactions: [reactionSchema]
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
