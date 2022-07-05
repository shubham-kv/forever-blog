
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	title: {
		type: String,
		required: true,
		max: 256
	},
	body: {
		type: String,
		required: true,
		max: 1024
	}
}, {
	timestamps: true
})

const Post = mongoose.model("Post", PostSchema)
module.exports = Post
