const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    //username
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    //email
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    //thoughts
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    //friends
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const User = model('User', userSchema);
module.exports = User;