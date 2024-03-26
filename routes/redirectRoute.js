// varun
const express = require("express");
const { redirectController } = require("../controllers/redirectController");
const router = express.Router();

router.get("/:shortId",redirectController);
module.exports = router;
