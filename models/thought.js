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
            default: new Date(),
            get: function (savedDate) {   
                    
              return date.format(savedDate, 'ddd, MMM DD YYYY');
            },
          },
        //reaction
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

//virtual to retrieve reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

// create Thought Model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
