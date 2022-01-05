const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require("./routes/users");
const productRouter = require("./routes/products");



mongoose.connect('mongodb+srv://admin:'+process.env.MONGO_PASS+'@cluster0.newyq.mongodb.net/empressdb?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
).then(()=>{
    console.log('db conn success')
}).catch((err)=>{
    console.log(err)
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((res,req,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


//Routes which should handle requests
app.use("/api/users",userRouter);
app.use("/api/products",productRouter);


app.use((req,res,next)=> {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;