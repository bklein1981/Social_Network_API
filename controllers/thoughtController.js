const { Thought, User } = require('../models')

module.exports = {
    //Get All Thoughts
    async getThought(req, res) {
        console.log(`Get all thoughts GET route request received`);
        try {
            let thoughts = await Thought.find();
            return res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //GET Single Thought
    async getSingleThought(req, res) {
        console.log(`Get single thought GET request received`);
        try {
            let thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            return res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //Create New Thought
    async newThought(req, res) {
        console.log(`Create new thoughts POST request received`)
        try {
            let thoughts = await Thought.create(req.body);
            //username from the body
            let username = thoughts.username
            //update user with thoughts via username
            let updatedUser = await User.findOneAndUpdate({ userName: username }, {
                $addToSet: {
                    thoughts: thoughts._id
                }
            }, { new: true })
            //send thought id to user model
            return res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //PUT Thought by Id
    async updateThought(req, res) {
        console.log(`Update thought PUT request received`);
        try {
            let thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            return res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //DELETE Thought by Id
    async deleteThought(req, res) {
        console.log(`Delete thought DELETE request received`);
        try {
            let thought = await Thought.findByIdAndDelete(req.params.thoughtId)
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            return res.json(thought);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //Create a new Reaction
    async newReaction(req, res) {
        console.log(`New reaction POST request received`);
        const thoughtId = req.params.thoughtId
        const reaction = req.body

        try {
            let thought = await Thought.findByIdAndUpdate(
                { _id: thoughtId },
                { $addToSet: { reactions: reaction } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thoughts found' });
            }
            return res.status(200).json(thought);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        console.log(`New reaction DELETE request received`);
        const thoughtId = req.params.thoughtId

        try {
            let thought = await Thought.findByIdAndUpdate(
                { _id: thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thoughts found' });
            }
            return res.status(200).json(thought);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}