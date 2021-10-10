var express = require("express");
var router = express.Router();

const authController = require("../../../controllers/vaccine/authController");
const authModule = require("../../../modules/authModule");
const upload = require("../../../modules/awsUpload");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

router.put("/profile", authModule.loggedIn, authController.updateUser);
router.delete("/profile", authModule.loggedIn, authController.deleteUser);

router.get("/", authController.readAllUser);
router.get("/profile", authModule.loggedIn, authController.readUser);

module.exports = router;
