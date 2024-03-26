const express = require("express");
const app = express();
const PORT = 8001;
const path=require('path');
const cookieParser=require('cookie-parser');
const { connectToMongoDB } = require("./connect");


const {restrictToLoggedInUserOnly,checkAuth}=require('./middleware/auth');
// const { getUser } = require("./service/auth");
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
console.log("MongoDB connected")
);
const urlRouter = require("./routes/url");
const redirectRouter = require("./routes/redirectRoute");
const userRoute=require("./routes/user");
const staticRouter=require("./routes/staticRoute");

  
app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use('/',checkAuth,staticRouter);
app.use('/redirect',redirectRouter);
app.use("/url",restrictToLoggedInUserOnly,urlRouter);
app.use("/user",checkAuth,userRoute);


app.listen(PORT, () => {
  console.log("running on port ", PORT);
});
