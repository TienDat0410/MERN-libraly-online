const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
var bodyParser = require("body-parser");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = 8000;
const authorRoute = require("./routes/author");
const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");
//middlewares
const error = require('./middlewares/errorMiddlewareHandler');

dotenv.config();
//connect database
mongoose.connect((process.env.MONGODB_URI), (err) => {
    if(!err) {
      
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

//Error middleware
app.use(error.errorMiddlewareHandler);

//Register
// app.post('/api/user/register',async (req, res) =>{
//     try {
//         // console.log(req.body);
//         const {username, password, email, permission} = req.body;
        


//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

//ROUTES
app.use("/author", authorRoute);
app.use("/book", bookRouter);
app.use("/user", userRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});