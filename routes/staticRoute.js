const express=require("express");
const URL=require("../models/url");
const {staticController,staticSignUp,staticLogin}=require("../controllers/staticController");
const router=express.Router();

router.get("/",staticController);
router.get("/signup",staticSignUp);
router.get("/login",staticLogin);
module.exports=router;