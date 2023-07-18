require('dotenv').config();
const baseResponse =  require('../../helper/baseResponse/baseResponse');
const deleteFileFromS3 = require('../../helper/s3/deleteImageFromS3');

const deleteImageFromS3 = async (req, res) => {
    try {
        const { id } = req.params;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: id
        };
        const imageDeleted = await deleteFileFromS3(params);
        if(!imageDeleted) return res.status(477).json(baseResponse(477, "Could not delete", {}));
        else return res.status(200).json(baseResponse(200, "Image deleted", {id: id}));
    } catch (error) {
        console.log(error);
        return res.status(500).json(baseResponse(500, "Internal server error, Could not delete image", {}));
    }
};

module.exports = deleteImageFromS3;