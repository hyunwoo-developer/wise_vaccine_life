var express = require("express");
var router = express.Router();

const authController = require("../../../controllers/vaccine/authController");
const authModule = require("../../../modules/authModule");
const upload = require("../../../modules/awsUpload");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

router.put(
    "/profile",
    authModule.loggedIn,
    upload.single("img"),
    authController.userUpdate
);
router.delete("/profile", authModule.loggedIn, authController.userDelete);

router.get("/", authController.userReadAll);
router.get("/profile", authModule.loggedIn, authController.userRead);

module.exports = router;
