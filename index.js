require('dotenv').config();
require('dotenv-flow').config({ path: './env/' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./app/config/db');
const app = express();
global.logger = require('./app/config/winston');
const PORT = process.env.PORT || 5000;

db.connectToMongoDB();

const onServerStarted = () => {
    logger.info(`Server started on ${PORT}`)
};


//user the body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Enable CORS
app.use(cors());


app.use(process.env.API_VERSION, require('./app/modules/user/user.route'));
app.use(process.env.API_VERSION, require('./app/modules/business-hours/business-hours.route'));
app.use(process.env.API_VERSION, require('./app/modules/vendor/vendor.route'));
app.use(process.env.API_VERSION, require('./app/modules/category/category.route'));
app.use(process.env.API_VERSION, require('./app/modules/subcategory/subcategory.route'));
app.use(process.env.API_VERSION, require('./app/modules/menu/menu.route'));
app.use(process.env.API_VERSION, require('./app/modules/inventory/inventory.route'));
app.use(process.env.API_VERSION, require('./app/modules/image/image.route'));
app.use(process.env.API_VERSION, require('./app/modules/menu-items/menu-item.route'));
app.use(process.env.API_VERSION, require('./app/modules/order/order.route'));


app.listen(PORT, onServerStarted());