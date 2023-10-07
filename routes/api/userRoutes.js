const router = require('express').Router();

const  {
    getUsers,
    newUser

} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(newUser); 

module.exports = router