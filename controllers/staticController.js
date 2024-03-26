const URL = require("../models/url");
const { getUser } = require("../service/auth");

async function staticController(req,res){
    if(!req.user) return res.redirect("/login")
    const allurls=await URL.find({createdBy:req.user._id});
    return res.render('home',{
        urls:allurls
    });
}

async function staticSignUp(req,res){
return res.render('signup');
}

async function staticLogin(req,res){
return res.render('login');
}

module.exports={
    staticController,staticSignUp,staticLogin
}