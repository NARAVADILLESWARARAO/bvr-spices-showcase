const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bvr-spices',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});

const upload = multer({ storage });

router.post('/', (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err) {
            console.error('Multer/Cloudinary Error:', err);
            return res.status(400).send({ message: err.message || err });
        }
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }
        console.log('File uploaded to Cloudinary:', req.file.path);
        res.send({
            message: 'Image Uploaded to Cloudinary',
            image: req.file.path,
        });
    });
});

module.exports = router;
