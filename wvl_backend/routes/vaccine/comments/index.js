var express = require("express");
var router = express.Router();

const commentController = require("../../../controllers/vaccine/commentController");
const authModule = require("../../../modules/authModule");

router.post("/:id", authModule.checkVerified, commentController.createComment);

module.exports = router;
