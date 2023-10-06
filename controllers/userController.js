const { User, Thought } = require('../models')

//Get All Users
module.exports = {
    async getUsers(req, res) {
        console.log(`Get all users GET request received`);
        try {
            const users = await User.find()
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}