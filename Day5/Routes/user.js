const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')

const passport = require('passport');
require('../Middleware/admin')(passport);


router.get('/', passport.authenticate('jwt', { session: false }), userController.getAll)
router.post('/signup', userController.addUser)
router.post('/login', userController.getLogIn)
router.get('/:id', passport.authenticate('jwt', { session: false }), userController.getOneUser)
router.patch('/:id', passport.authenticate('jwt', { session: false }), userController.updateOneUser)
router.delete('/:id', passport.authenticate('jwt', { session: false }), userController.deleteOneUser)
router.get('/passportTest', passport.authenticate('jwt', { session: false }))


module.exports = router