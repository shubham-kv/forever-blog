
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

// GET /tokens
// generates a new access token based on the refresh token
router.get('/', async (req, res, next) => {
	const refreshToken = req.cookies.refreshToken

	try {
		if(!refreshToken) {
			res.status(401)
			throw new Error('Unauthorized to access, Please Log in!!')
		}
		else {
			jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, value) => {
				if(err) {
					// return res.status(400).clearCookie('refreshToken').json({ message: 'Token expired or invalid' })
					res.status(401).clearCookie('refreshToken')
					throw new Error('Access Denied!!')
				}
				else {
					const payload = {
						name: value.name
					}
					
					const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
					res.json({ accessToken })
				}
			})
		}
	}
	catch(e) {
		next(e)
	}
})

module.exports = router
