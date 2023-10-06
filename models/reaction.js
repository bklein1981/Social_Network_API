const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
    //reactionId
    reactionId: {
        type: Types.ObjectId,
        default: () => new Schema.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
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
        default: Date.now
    },
    //reaction
})

module.exports = reactionSchema


