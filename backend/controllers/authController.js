
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const {validateLoginData} = require('../validations')


// @desc	Logs in the user
// @route	POST /auth/login
// @access	Public
const login = async (req, res, next) => {
	try {
		const {error} = validateLoginData(req.body)

		// check if error exists after validation
		if(error) {
			return res.status(400).json({
				key: error.details[0].context.key,
				message: error.details[0].message
			})
		}
	
		const keys = Object.keys(req.body)
		
		// check if user exists
		const user = await User.findOne({ username: req.body.username })
	
		if(!user) {
			return res.status(400).json({
				key: keys[0],
				message: `No user exists with username '${req.body.username}'.`
			})
		}

		// console.log('login')
		// console.log(`user._id: ${user._id}`)
		// console.log(`user.id: ${user.id}`)
		// console.log(`user.name.first: ${user.name.first}`)
		// console.log(`user.name.last: ${user.name.last}`)
		// console.log(`user.gender: ${user.gender}`)
		// console.log(`user.dateOfBirth: ${user.dateOfBirth}`)
		// console.log(`user.username: ${user.username}`)
		// console.log(`user.passHash: ${user.password}`)

		// const userDetails = {
		// 	id: user.id,
		// 	fullName: `${user.name.first} ${user.name.last}`,
		// 	username: user.username
		// }
	
		// validate the correctness of password
		const compareRes = await bcrypt.compare(req.body.password, user.password)
	
		if(!compareRes) {
			return res.status(400).json({
				key: keys[1],
				message: 'Incorrect login credentials.'
			})
		}

		const payload = {
			name: user.username
		}
	
		const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
		const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '24h'})

		res.cookie('refreshToken', refreshToken, {
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
			httpOnly: true,
			secure: false
		})
		.json({ message: `Hello, ${user.username}`, accessToken })
	}
	catch(e) {
		next(e)
	}
}


// @desc	Logs the user out
// @route	POST /auth/logout
// @access	Private
const logout = (_, res) => {
	res.clearCookie('refreshToken')
		.json({ message: 'Successfully Logged Out!' })
}

module.exports = {
	login,
	logout
}
