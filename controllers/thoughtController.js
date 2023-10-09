const { Thought } = require('../models')

module.exports = {
    //Get All Thoughts
    async getThought(req, res) {
        console.log(`Get all thoughts GET route request received`);
        try {
            let thoughts = await Thought.find();
            return res.json(thoughts);
        }catch(err) {
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
            return res.json(thoughts);
        } catch(err) {
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
    }
}