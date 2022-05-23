
// This errorHandler will override the default express error handler
const errorHandler = (err, req, res, next) => {

	console.log(err)

	const statusCode = (res.statusCode) ? res.statusCode : 500
	res.status(statusCode).json({
		message: err.message
	})
}

module.exports = {
	errorHandler
}
