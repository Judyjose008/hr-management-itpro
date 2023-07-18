require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./winston');

const connectToMongoDB = async () => {
    try {
        await mongoose.connect( process.env.MONGOURI , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        logger.info({status: 'success', time: Date.now(), msg: `MongoDB connection: SUCCESS. Database ENV: ${process.env.ENVNAME}`});
        console.log(`MongoDB connected on ${process.env.ENVNAME} environment`);
    } catch (error) {
        logger.error({status: 'failed', time: Date.now(), msg: `MongoDB connection: FAILED. Database ENV: ${process.env.ENVNAME}`, error});
        throw error;
    }
}

module.exports = { 
    connectToMongoDB 
};