const { Schema, Types } = require('mongoose');
const date = require('date-and-time');

//create reaction schema
const reactionSchema = new Schema({
    //reactionId
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    //reaction
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
        default: new Date(),
        get: function (savedDate) {
            return date.format(savedDate, 'M-D-YYYY h:m A');
        },
    },
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    })

module.exports = reactionSchema


