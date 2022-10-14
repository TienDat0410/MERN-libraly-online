const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
var bodyParser = require("body-parser");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = 5000;
const http = require('http');
//route
const authorRoute = require("./routes/author");
const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");
//middlewares
const error = require('./middlewares/errorMiddlewareHandler');
//upload file
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');


dotenv.config();
//connect database
mongoose.connect((process.env.MONGODB_URI), (err) => {
    if (!err) {

        console.log("Connected to MongoDB");
    } else {
        console.log('db error!!!');
    }
    // const storage = multer.diskStorage({
    //     destination: (req, file, cb) => {
    //         cb(null, 'images');
    //     },
    //     filename: (req, file, cb) => {
    //         // cb(null, req.body.name);
    //         // cb(null, "hoahongbo1.jpg");
    //         // cb(null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`);
    //         cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    //     },
    // });
    // //
    // const checkFileType = (file, cb) => {
    //     // const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    //     const fileTypes = /jpg|jpeg|png/;
    //     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    //     const mimetype = fileTypes.test(file.mimetype);
    //     if (extname && mimetype) {
    //         return cb(null, true);
    //     } else {
    //         cb("Image only");
    //     }
    // }
    // //
    // const upload = multer({
    //     storage: storage,
    //     fileFilter: (req, file, cb) => {
    //         checkFileType(file, cb);
    //     },
    // });
    // // const upload = multer({ storage: storage });

    // app.post("/api/upload", upload.single("file"), (req, res) => {
    //     res.status(200).json("File has been uploaded");
    // });
});
//Passing body data
app.use(express.json());
app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));
app.use(fileUpload({
    useTempFiles: true
}));
//set header
// app.use((req, res, next) => {
//     res.set('name', 'tiendat');
//     // res.set('Content-Type', 'text/plain');
//     // res.header("x-powered-by", "ZeroServer");
//     // next();
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
//    });
//Error middleware
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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});