
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: {
		first: {
			type: String,
			required: true,
			min: 6, max: 256
		},
		last: {
			type: String,
			required: true,
			min: 6, max: 256
		}
	},
	gender: {
		type: String,
		required: true,
		enum: ['male', 'female']
	},
	dateOfBirth: {
		type: Date,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true,
		max: 64,
	},
	password: {
		type: String,
		required: true,
		min: 8, max: 1024
	},
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	}]
}, {
	timestamps: true
})

UserSchema.virtual('fullName')
	.get(function() {
		return (this.name.first + ' ' + this.name.last)
	})

const User = mongoose.model("User", UserSchema)
module.exports = User
