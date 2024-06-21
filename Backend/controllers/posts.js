const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const fileHelper = require('../util/file');
const path = require('path');

exports.postAddPost = async (req, res,  next) => {
    const title = req.body.title;
    const summary = req.body.summary;
    const content = req.body.content;
    const image = req.file;
    const userID = req.body.userID;
    let topics = req.body.topics;

    if(typeof topics === 'string') {
        topics = JSON.parse(topics);
    }
    
    try {
        if(!image) {
            const error = new Error('No image provided.');
            error.statusCode = 422;
            throw error;
        }
        const imageURL = path.join('images', image.filename);
        const author = await User.findById(userID);
        const post = new Post({
            title: title,
            summary: summary,
            content: content,
            imageURL: imageURL,
            author: author,
            topics: topics,
        });
        await post.save();
        author.posts.push(post._id);
        await author.save();
        res.status(201).json({
            message: 'Post created successfully!',
            post: post,
        });
    }
    catch(err) {
        console.log(err);
        if(err.statusCode === 422) {
            return res.status(422).json({
                message: 'No image provided.'
            })
        }
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
};

exports.getRecentPosts = async (req, res, next) => {
    const limit = req.query.limit || 4;
    try {
        const posts = await Post.find()
            .populate('author', 'first_name last_name')
            .sort({ createdAt: -1 })
            .limit(limit);
        res.status(200).json({
            message: 'Recent posts fetched successfully!',
            posts: posts,
        })
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
}

exports.getAllPosts = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 6;
    const ITEMS_PER_PAGE = limit;
    try {
        const totalItems = await Post.find().countDocuments();
        const posts = await Post.find()
            .populate('author', 'first_name last_name')
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        res.status(200).json({
            message: 'Posts fetched successfully!',
            posts: posts,
            totalItems: totalItems,
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
};

exports.getMyPosts = async (req, res, next) => {
    const userID = req.query.userID;
    try {
        const posts = await Post.find({author: userID}).populate('author', 'first_name last_name');
        res.status(200).json({
            message: 'Posts fetched successfully!',
            posts: posts,
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
};

exports.getPost = async(req, res, next) => {
    const postID = req.params.postID;
    try {
        const post = await Post.findById(postID)
            .populate('author', 'first_name last_name')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'first_name last_name'
                },
                select: 'content date'
            });
        if(!post) {
            const error = new Error('Post not found.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Post fetched successfully!',
            post: post,
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
};

exports.editPost = async (req, res, next) => {
    const postID = req.params.postID;
    const title = req.body.title;
    const summary = req.body.summary;
    const content = req.body.content;
    let image;
    if(req.file) {
        image = req.file;
    }
    let topics = req.body.topics;

    if(typeof topics === 'string') {
        topics = JSON.parse(topics);
    }

    try {
        const post = await Post.findById(postID);
        if(!post) {
            const error = new Error('Post not found.');
            error.statusCode = 404;
            throw error;
        }
        if(image) {
            // fileHelper.deleteFile(post.imageURL);
            post.imageURL = path.join('images', image.filename);
        }
        post.title = title;
        post.summary = summary;
        post.content = content;
        post.topics = topics;
        await post.save();
        res.status(200).json({
            message: 'Post updated successfully!',
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
};

exports.deletePost = async (req, res, next) => {
    const postID = req.params.postID;
    try {
        const post = await Post.findById(postID);
        if(!post) {
            const error = new Error('Post not found.');
            error.statusCode = 404;
            throw error;
        }
        await Post.findByIdAndDelete(postID);
        // fileHelper.deleteFile(post.imageURL);
        res.status(200).json({
            message: 'Post deleted successfully!',
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
}

exports.postAddComment = async (req, res, next) => {
    const postID = req.body.postID;
    const userID = req.body.userID;
    const comment = req.body.comment;
    try {
        const post = await Post.findById(postID);
        if(!post) {
            const error = new Error('Post not found.');
            error.statusCode = 404;
            throw error;
        }
        const user = await User.findById(userID);
        if(!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        const newComment = new Comment({
            content: comment,
            post: post._id,
            author: user._id,
        });
        await newComment.save();
        post.comments.push(newComment._id);
        await post.save();
        user.comments.push(newComment._id);
        await user.save();
        res.status(201).json({
            message: 'Comment added successfully!',
            comment: newComment,
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
};

exports.postAddLike = async (req, res, next) => {
    const postID = req.body.postID;
    const userID = req.body.userID;
    try {
        const post = await Post.findById(postID);
        if(!post) {
            const error = new Error('Post not found.');
            error.statusCode = 404;
            throw error;
        }
        const user = await User.findById(userID);
        if(!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        if(!post.likes.includes(user._id)) {
            post.likes.push(user._id);
            await post.save();
        }
        if(!user.likes.includes(post._id)) {
            user.likes.push(post._id);
            await user.save();
        }
        res.status(201).json({
            message: 'Like added successfully!',
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
};

exports.postRemoveLike = async (req, res, next) => {
    const postID = req.body.postID;
    const userID = req.body.userID;
    try {
        const post = await Post.findById(postID);
        if(!post) {
            const error = new Error('Post not found.');
            error.statusCode = 404;
            throw error;
        }
        const user = await User.findById(userID);
        if(!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        post.likes.pull(user._id);
        await post.save();
        user.likes.pull(post._id);
        await user.save();
        res.status(200).json({
            message: 'Like removed successfully!',
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
};