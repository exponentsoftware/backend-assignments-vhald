const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')

const adminAuth = require('../Middleware/admin')

// pagination to users info
router.get('/:page/:limit', adminAuth, userController.getAll)

router.get('/', adminAuth, userController.getAll)
router.post('/signup', userController.addUser)
router.post('/login', userController.getLogIn)
router.get('/:id', adminAuth, userController.getOneUser)
router.patch('/:id', adminAuth, userController.updateOneUser)
router.delete('/:id', adminAuth, userController.deleteOneUser)

// DAY 5 pagination

router.get('/todayRegistered/:page/:limit', userController.todayRegistered)
router.get('/todayActive/:page/:limit', userController.todayActive)
router.get('/weekActive/:page/:limit', userController.todayActive)
router.get('/monthActive/:page/:limit', userController.todayActive)


module.exports = router