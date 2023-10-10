const router = require('express').Router();

const  {
    getUsers,
    getSingleUser,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend

} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(newUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser); 
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router