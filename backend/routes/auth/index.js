
const express = require('express')
const router = express.Router()

const {login, logout} = require('../../controllers/authController')
const authenticate = require('../../middlewares/authenticate')

router.post('/login', login)
router.delete('/logout', authenticate, logout)

module.exports = router
