const { Schema, model } = require('mongoose');

//create User Schema
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
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    //thoughts
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    //friends
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
})

//create User model
const User = model('user', userSchema);

module.exports = User;