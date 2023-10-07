const { User, Thought } = require('../models')

module.exports = {
    //Get All Users
    async getUsers(req, res) {
        console.log(`Get all users GET request received`);
        try {
            let users = await User.find()
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //Create New User
    async newUser(req, res) {
        console.log(`Create new user POST request received`);
        try {
            let users = await User.create(req.body)
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}