
const User = require('../models/User')
const Post = require('../models/Post')

const {validatePostData} = require('../validations')
const mongoose = require('mongoose')


// @desc	Get every posts
// @route	GET /api/posts
// @access	Private
const getPosts = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.user.name })

		if(!user) {
			res.status(401)
			throw new Error(`No User found with username ${req.user.name}`)
		}
		else {
			const posts = await Promise.all(user.posts.map(async (postId) => 
				await Post.findById(postId)
			))
	
			const postList = []
	
			posts.map(post => {
				postList.push({
					id: post.id,
					author: user.fullName,
					timestamp: post.createdAt,
					title: post.title,
					body: post.body.slice(0, 300)
				})
			})
	
			res.json({posts: postList})
		}
	}
	catch(e) {
		next(e)
	}
}


// @desc	Create a post
// @route	POST /api/posts
// @access	Private
const createPost = async (req, res, next) => {
	try {
		const {error} = validatePostData(req.body)

		if(error) {
			return res.status(400).json({
				key: error.details[0].context.key,
				message: error.details[0].message
			})
		}

		const user = await User.findOne({ username: req.user.name })

		if(!user) {
			console.log(`User '${req.user.name}' was not found.`)
			throw new Error('Some Server error')
		}
	
		const post = new Post({
			userId: user._id,
			title: req.body.title,
			body: req.body.body
		})
		await post.save()

		user.posts.unshift(post._id)
		await user.save()

		res.status(201).json({message: 'Created!!', post})
	}
	catch(e) {
		next(e)
	}
}


// @desc	Get specific post
// @route	GET /api/posts/:id
// @access	Private
const getPost = async (req, res, next) => {
	try {
		const postId = req.params.id

		if(!mongoose.isValidObjectId(postId)) {
			res.status(400)
			throw new Error(`Invalid post id`)
		}

		const post = await Post.findById(postId)

		if(!post) {
			res.status(400)
			throw new Error(`Post not found.`)
		}

		const user = await User.findById(post.userId)

		if(!user) {
			console.log(`User with id '${post.userId}' was not found.`)
			throw new Error('Some Server error')
		}

		const postData = {
			author: user.fullName,
			timestamp: post.createdAt,
			title: post.title,
			body: post.body
		}
		res.json({post: postData})
	}
	catch(e) {
		next(e)
	}
}


// @desc	Updates an existing post
// @route	POST /api/posts/:id
// @access	Private
const updatePost = async (req, res, next) => {
	try {
		const {error} = validatePostData(req.body)

		if(error) {
			res.status(400).json({
				key: error.details[0].context.key,
				message: error.details[0].message
			})
		}
		else {
			const postId = req.params.id

			if(!mongoose.isValidObjectId(postId)) {
				res.status(400)
				throw new Error(`Invalid post id`)
			}

			const post = await Post.findById(postId)

			if(!post) {
				res.status(400)
				throw new Error(`Post not found.`)
			}

			const user = await User.findById(post.userId)

			if(!user) {
				console.log(`User with id '${post.userId}' was not found.`)
				throw new Error('Some Server error')
			}

			// check if the user is accessing it's own documents
			if(req.user.name !== user.username) {
				console.log('\n**Malicious activity detected**')
				console.log(`User '${req.user.name}' tried to modify '${user.username}'s post '${postId}'`)

				res.status(400)
				throw new Error(`Post not found.`)
			}
			else {
				post.title = req.body.title
				post.body = req.body.body
				await post.save()

				const postData = {
					author: user.fullName,
					timestamp: post.createdAt,
					title: post.title,
					body: post.body
				}
				res.json({message: 'Updated!!', post: postData})
			}
		}
	}
	catch(e) {
		next(e)
	}
}


// @desc	Delete a post
// @route	DELETE /api/posts/:id
// @access	Private
const deletePost = async (req, res, next) => {
	try {
		const postId = req.params.id

		if(!mongoose.isValidObjectId(postId)) {
			res.status(400)
			throw new Error(`Invalid post id`)
		}

		const post = await Post.findById(postId)

		if(!post) {
			res.status(400)
			throw new Error(`Post not found.`)
		}
		else {
			const user = await User.findById(post.userId)

			if(req.user.name !== user.username) {
				console.log('\n**Malicious activity detected**')
				console.log(`User '${req.user.name}' tried to delete '${user.username}'s post '${postId}'`)

				res.status(400)
				throw new Error(`Post not found.`)
			}
			else {
				// remove postId from the users post id array
				const index = user.posts.indexOf(new mongoose.Types.ObjectId(postId))
				if(index > -1) {
					user.posts.splice(index, 1)
					await user.save()
				}

				// delete the post
				await post.remove()
				res.json({message: 'Deleted!!'})
			}
		}
	}
	catch(e) {
		next(e)
	}
}

module.exports = {
	getPosts,
	createPost,
	getPost,
	updatePost,
	deletePost
}
