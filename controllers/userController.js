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
            let user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            return res.json(user);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //Add a friend to the friends list
    async addFriend(req, res) {
        console.log(`New friend POST request received`);
        const userId = req.params.userId;
        const friendId = req.params.friendId;

        try {
            const user = await User.findById(userId);
            //checks if user id is valid
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            //checks if friend id is valid
            if (!friendId) {
                return res.status(404).json({ message: 'Friend not found' });
            }
            //checks if friends list already includes the friendId and if not, pushes the friendId to the friends list
            if (!user.friends.includes(friendId)) {
                user.friends.push(friendId);
                await user.save();
            }
            return res.status(200).json(user)

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //remove a friend from the friends list
    async removeFriend(req, res) {
        const userId = req.params.userId;
        const friendId = req.params.friendId;

        //checks if user id is valid
        if (!userId || !friendId) {
            return res.status(404).json({ message: 'User not found' });
        }

        try {
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { friends: friendId },
                { $pull: { friends: friendId } },
                { new: true }
            );

            return res.status(200).json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }

}