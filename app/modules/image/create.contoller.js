require('dotenv').config();
const baseResponse = require('../../helper/baseResponse/baseResponse');
const uploadFileToS3 = require('../../helper/S3/uploadImageToS3');

const uploadImage = async (req, res) => {
    try {
        const imagesUploadPromises = req.files.map( async (file) => {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `RMS_IMAGE_${Math.floor(Math.random() * 100 + 1)}${Math.floor(Math.random() * 1000 + 1)}${Math.floor(Math.random() * 10000 + 1)}${Math.floor(Math.random() * 10000 + 1)}${Math.floor(Math.random() * 100000 + 1)}`,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read'
            };
            const imageUploaded = await uploadFileToS3(file, params);
            if (!imageUploaded) return null;
            return imageUploaded.Location; 
        });
        const imagesUploaded  = await Promise.all(imagesUploadPromises);
        return res.status(200).json(baseResponse(200, "Image uploaded", { images: imagesUploaded}));
    } catch (error) {
        console.log(error);
        return res.status(500).json(baseResponse(500, "Internal server error, Could not upload image", {}));
    }
};

module.exports = uploadImage;