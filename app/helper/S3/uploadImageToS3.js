require('dotenv').config();
var AWS = require("aws-sdk");

const uploadFileToS3 = async (file, params) => {

    let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });
    return new Promise(async (resolve, reject) => {
        s3bucket.upload(params, async (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
} 

module.exports = uploadFileToS3;