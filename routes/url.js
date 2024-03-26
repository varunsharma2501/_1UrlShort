// varun
const express=require("express")
const {handleGenerateNewShortURL,handleGetAnalytics,handleEditURL,handleDeleteUrl}=require("../controllers/url")

const router=express.Router();
router.post('/',handleGenerateNewShortURL);
router.put('/',handleEditURL);
router.delete('/:shortId',handleDeleteUrl);
router.get('/analytics/:shortId',handleGetAnalytics);
module.exports=router;