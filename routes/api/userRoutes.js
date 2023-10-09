const router = require('express').Router();

const  {
    getUsers,
    getSingleUser,
    newUser,
    updateUser,
    deleteUser

} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(newUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser); 

module.exports = router