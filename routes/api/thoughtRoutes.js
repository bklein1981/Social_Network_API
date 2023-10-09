const router = require('express').Router();

const  {
    getThought,
    getSingleThought,
    newThought,
    updateThought,
    deleteThought

} = require('../../controllers/thoughtController.js');

router.route('/').get(getThought).post(newThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);  

module.exports = router