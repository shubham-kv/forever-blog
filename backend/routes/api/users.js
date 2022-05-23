
const express = require('express')
const router = express.Router()

const authenticate = require('../../middlewares/authenticate')
const {createUser, updateUser, deleteUser} = require('../../controllers/userController')

router.post('/', createUser)

router.route('/:id')
	.put(authenticate, updateUser)
	.delete(authenticate, deleteUser)

module.exports = router
