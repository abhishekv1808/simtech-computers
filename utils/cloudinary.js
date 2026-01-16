const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dobvyt9yw',
    api_key: '977591232949275',
    api_secret: 'S9Egv2i4jGUWp8IgI49FcJkjWio'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'rgcomputers_laptops',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

const parser = multer({ storage: storage });

module.exports = {
    cloudinary,
    parser
};
