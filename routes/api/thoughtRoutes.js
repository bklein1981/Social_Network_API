const router = require('express').Router();

const  {
    getThought,
    newThought

} = require('../../controllers/thoughtController.js');

router.route('/').get(getThought).post(newThought); 

module.exports = router