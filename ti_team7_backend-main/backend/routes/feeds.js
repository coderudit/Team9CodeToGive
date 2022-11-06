const router = require('express').Router()

const feedController = require('../controllers/feedController')

router.get('/:user', feedController.getAllFeed)
router.post('/', feedController.addFeed)
router.put('/:feedid', feedController.updateBadges)
router.get('/profile/:user', feedController.getUserProfileBadges)

module.exports = router