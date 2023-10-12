const router = require('express').Router();

const  {
    getThought,
    getSingleThought,
    newThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction

} = require('../../controllers/thoughtController.js');

router.route('/').get(getThought).post(newThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought); 
router.route('/:thoughtId/reactions').post(newReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router