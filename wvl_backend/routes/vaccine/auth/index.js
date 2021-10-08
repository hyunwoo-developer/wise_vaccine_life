var express = require("express");
var router = express.Router();

const authController = require("../../../controllers/vaccine/authController");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

module.exports = router;
