const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const http = require('http')
dotenv.config()

const {errorHandler} = require('./middlewares/error')

const mongoUri = 
	(process.env.NODE_ENV === 'development')
		? process.env.LOCAL_MONGO_URI
		: process.env.REMOTE_MONGO_URI

mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

const con = mongoose.connection

con.on('error', () => {
	throw new Error('Failed to connect to MongoDB')
})
con.once('open', () => {
	console.log('MongoDB connected!')
})

const app = express()
const PORT = process.env.PORT || 3000

// middlewares
app.use(cors({
	origin: (process.env.NODE_ENV === 'development')
				? 'http://localhost:8080'
				: 'https://princev-simple-blog.netlify.app',
	credentials: true
}))

// body parser for raw json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// route middlewares
app.use('/auth', require('./routes/auth/index'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/tokens', require('./routes/api/tokens'))

app.use('/api/feed', require('./routes/api/feed'))
app.use('/api/posts', require('./routes/api/posts'))

app.get('/', (req, res) => {
	res.send('Server is up and running')
})

// necessary to be below those route middlware
app.use(errorHandler)

http.createServer(app).listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/ ...`)
});
