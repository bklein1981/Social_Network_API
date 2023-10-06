const { Schema, model } = require('mongoose');
const reactionSchema = require("./reaction")
const date = require('date-and-time');

//create Thought schema
const thoughtSchema = new Schema(
    {
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
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//virtual to retrieve reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

// create Thought Model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
