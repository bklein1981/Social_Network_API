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
    }
}