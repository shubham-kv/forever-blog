const express = require("express")
const router = express.Router()

const {
    getPosts,
    getPost,
    createPost,
	updatePost,
    deletePost,
} = require("../../controllers/postsController")

const authenticate = require("../../middlewares/authenticate")

// router.get("/", authenticate, getAllPosts);
// router.post("/", authenticate, createPost);

// when routes are same you can chain them
router.route('/')
	.get(authenticate, getPosts)
	.post(authenticate, createPost)

router.route('/:id')
	.get(authenticate, getPost)
	.put(authenticate, updatePost)
	.delete(authenticate, deletePost)

module.exports = router;
