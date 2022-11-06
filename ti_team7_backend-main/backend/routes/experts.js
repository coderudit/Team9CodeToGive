const router = require('express').Router()

const expertsListController = require('../controllers/experts')

router.get('/displayProfessionals', expertsListController.getAllExperts)
router.get('/bookProfessional/:id', expertsListController.bookExpert)

module.exports = router