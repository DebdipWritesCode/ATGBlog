const express = require('express');
const { postAddPost, getAllPosts, getMyPosts, getPost, postAddComment, postAddLike, postRemoveLike, deletePost, editPost, getRecentPosts } = require('../controllers/posts');

const router = express.Router();

router.post('/add-post', postAddPost);

router.get('/recent-posts', getRecentPosts);

router.get('/all-posts', getAllPosts);

router.get('/my-posts', getMyPosts);

router.get('/:postID', getPost);

router.put('/edit-post/:postID', editPost);

router.delete('/delete-post/:postID', deletePost);

router.post('/add-comment', postAddComment);

router.post('/add-like', postAddLike);

router.post('/remove-like', postRemoveLike);

module.exports = router;