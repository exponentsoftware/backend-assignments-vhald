const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const adminAuth = require('../Middleware/admin')

router.get('/', adminAuth, userController.getAll)
router.post('/signup', userController.addUser)
router.post('/login', userController.getLogIn)
router.get('/:id', adminAuth, userController.getOneUser)
router.patch('/:id', adminAuth, userController.updateOneUser)
// router.delete('/', adminAuth, userController.deleteAllUser)
router.delete('/:id', adminAuth, userController.deleteOneUser)

module.exports = router