var express = require("express");
var router = express.Router();

const postController = require("../../../controllers/vaccine/postController");
const authModule = require("../../../modules/authModule");

router.post("/", authModule.loggedIn, postController.uploadPost);
module.exports = router;
