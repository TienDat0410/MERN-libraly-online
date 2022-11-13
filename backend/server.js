const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
var bodyParser = require("body-parser");
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const http = require('http');
//route
const authorRoute = require("./routes/author");
const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");
const orderRouter = require('./routes/order');
const paymentRouter = require('./routes/payment');
//middlewares
const error = require('./middlewares/errorMiddlewareHandler');
//upload file
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

const port = 5000;

dotenv.config();
//connect database
mongoose.connect((process.env.MONGODB_URI), (err) => {
    if (!err) {

        console.log("Connected to MongoDB");
    } else {
        console.log('db error!!!');
    }
});
//Passing body data
app.use(express.json());
app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));
app.use(fileUpload({
    useTempFiles: true
}));

app.use(error.errorMiddlewareHandler);

// Setting up cloudinary configuration

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//ROUTES
app.use("/author", authorRoute);
app.use("/book", bookRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use('/payment', paymentRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});