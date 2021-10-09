var express = require("express");
var router = express.Router();

const postController = require("../../../controllers/vaccine/postController");
const authModule = require("../../../modules/authModule");

router.get("/", postController.postReadAll);
router.get("/:id", postController.postRead);

router.post("/", authModule.checkVerified, postController.postCreate);
router.put("/:id", authModule.checkVerified, postController.postUpdate);
router.delete("/:id", authModule.checkVerified, postController.postDelete);

module.exports = router;
