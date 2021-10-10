var express = require("express");
var router = express.Router();

const postController = require("../../../controllers/vaccine/postController");
const authModule = require("../../../modules/authModule");

router.get("/", postController.readAllPost);
router.get("/:id", postController.readPost);

router.post("/", authModule.checkVerified, postController.createPost);
router.put("/:id", authModule.checkVerified, postController.updatePost);
router.delete("/:id", authModule.checkVerified, postController.deletePost);

module.exports = router;
