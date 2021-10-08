var express = require("express");
var router = express.Router();

const postController = require("../../../controllers/vaccine/postController");
const authModule = require("../../../modules/authModule");

router.post("/", authModule.loggedIn, postController.postUpload);
router.put("/:id", authModule.loggedIn, postController.postUpdate);
router.delete("/:id", authModule.loggedIn, postController.postDelete);

module.exports = router;
