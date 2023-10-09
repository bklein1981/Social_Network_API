const { User, Thought } = require('../models')

module.exports = {
    //GET All Users
    async getUsers(req, res) {
        console.log(`Get all users GET request received`);
        try {
            let users = await User.find()
                .populate({ path: 'thoughts', model: Thought })
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //GET Single User
    async getSingleUser(req, res) {
        console.log(`Get single user GET request received`);
        try {
            let user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //POST New User
    async newUser(req, res) {
        console.log(`Create new user POST request received`);
        try {
            let user = await User.create(req.body)
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //PUT User by Id
    async updateUser(req, res) {
        console.log(`Update user PUT request received`);
        try {
            let user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //DELETE User by Id
    async deleteUser(req, res) {
        console.log(`Delete user DELETE request received`);
        try {
            let user = await User.findByIdAndDelete(req.params.userId)
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            return res.json(user);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}