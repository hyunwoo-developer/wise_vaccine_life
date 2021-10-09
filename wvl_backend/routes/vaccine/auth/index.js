var express = require("express");
var router = express.Router();

const authController = require("../../../controllers/vaccine/authController");
const authModule = require("../../../modules/authModule");
const editModule = require("../../../modules/editModule");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

router.put("/profile", authModule.loggedIn, authController.userUpdate);
router.delete("/profile/:id", authModule.loggedIn, authController.userDelete);

module.exports = router;
