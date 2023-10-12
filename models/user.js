const { Schema, model } = require('mongoose');

//create User Schema
const userSchema = new Schema(
    {
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
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.pre('deleteMany', { query: true }, async function (next) {
    const query = this.getQuery();

    console.log('Query object:', query);

    if (query._id) {
        try {
            const user = await this.model.findById(query._id);

            console.log('User ID:', query._id);

            if (user) {
                const thoughtIds = user.thoughts.map(thought => thought._id);

                console.log('Thought IDs:', thoughtIds);
                
                await Thought.deleteMany({ _id: { $in: thoughtIds } });
            }
        } catch (err) {
            console.error('An error occurred', err);
            throw err;
        }
    }
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

//create User model
const User = model('user', userSchema);

module.exports = User;