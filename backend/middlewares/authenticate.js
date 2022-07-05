
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const accessToken = authHeader && authHeader.split(' ')[1]

	if(!authHeader || !accessToken) {
		// return res.status(401).json({ message: "Unauthorized!" })
		res.status(401)
		throw new Error('Unauthorized, Plese Log in!!')
	}

	try {
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, value) => {
			if(err) {
				// 403 => Forbidden (User Identity is known, but he is forbidden to access)
				// or maybe the token is invalid
				res.status(403).json({ message: "Forbidden to access." })
			}
			else {
				req.user = { name: value.name }
				next()
			}
		})
	}
	catch(e) {
		// 500 => Internal Server Error
		throw new Error('Some Server Error')
	}
}

module.exports = authenticate
