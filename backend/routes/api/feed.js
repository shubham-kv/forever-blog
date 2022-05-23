
const express = require('express')
const router = express.Router()

const authenticate = require("../../middlewares/authenticate")
const Post = require('../../models/Post')
const User = require('../../models/User')

router.get('/', authenticate, async (req, res, next) => {
	try {
		const posts = await Post.find({})
		const postList = []

		let memoisedUsers = {}

		for(let i = 0; i < posts.length; i++) {
			const post = posts[i]
			const user = (`${post.userId}` in memoisedUsers)
				? memoisedUsers[`${post.userId}`]
				: await User.findById(post.userId)

			if(!(`${post.userId}` in memoisedUsers)) {
				memoisedUsers = {
					...memoisedUsers,
					[post.userId]: user
				}
			}

			postList[i] = {
				id: post.id,
				author: user.fullName,
				timestamp: post.createdAt,
				title: post.title,
				body: post.body.slice(0, 300)
			}
		}

		res.json({
			posts: postList
		})
	}
	catch(e) {
		next(e)
	}
})

module.exports = router
