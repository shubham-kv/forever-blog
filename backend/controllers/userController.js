
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const {validateRegitserData} = require('../validations')

// @desc	Gets a user
// @route	GET /api/users/:id
// @access  Private
const getUser = async (req, res) => {
	res.json({
		id: req.params.id,
		message: 'Get User'
	})
}


// @desc	Creates a user
// @route	POST /api/users
// @access  Public
const createUser = async (req, res, next) => {
	try {
		const {error} = validateRegitserData(req.body)

		if(error) {
			// client side error [400 - 499] 
			// 400 => Bad malformed request
			res.status(400).json({
				key: error.details[0].context.key,
				message: error.details[0].message
			})
		}
		else {
			// check if user already exists
			if(await User.findOne({ username: req.body.username })) {
				res.status(400).json({
					key: 'username',
					message: `Username '${req.body.username}' is already taken.`
				})
			}
			else {
				const salt = await bcrypt.genSalt()
				const hashedPassword = await bcrypt.hash(req.body.password, salt)

				const user = new User({
					name: {
						first: req.body.name.first,
						last: req.body.name.last,
					},
					gender: req.body.gender,
					dateOfBirth: req.body.dateOfBirth,
					username: req.body.username,
					password: hashedPassword
				})
				await user.save()

				// Success [200 - 299]
				// 201 => Created
				res.status(201).json({
					message: "Registration Success."
				})
			}
		}
	}
	catch(e) {
		next(e)
	}
}


// @desc	Updates a user
// @route	PUT /api/users/:id
// @access  Private
const updateUser = async (req, res) => {
	res.json({
		id: req.params.id,
		message: 'Update user'
	})
}


// @desc	Deletes a user
// @route	DELETE /api/users/:id
// @access  Private
const deleteUser = async (req, res) => {
	res.json({
		id: req.params.id,
		message: 'Delete user'
	})
}

module.exports = {
	getUser,
	createUser,
	updateUser,
	deleteUser
}
