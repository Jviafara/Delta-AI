require('dotenv').config();
const express = require('express');
const Post = require('../models/post');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(201).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, msg: error });
    }
});

//Post  posts
router.post('/', async (req, res) => {
    const { name, prompt, image } = req.body;
    try {
        const imgURL = await cloudinary.uploader.upload(image, {
            folder: 'Open_AI',
        });
        console.log(name + ' ' + prompt + ' ' + imgURL.toString());
        const post = await Post.create({
            name,
            prompt,
            photo: imgURL.url,
        });
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        res.status(404).json({ success: false, msg: error });
    }
});

module.exports = router;
