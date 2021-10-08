var express = require("express");
var router = express.Router();

const authRouter = require("./auth/index");
const postRouter = require("./posts/index");

router.use("/auth", authRouter);
router.use("/posts", postRouter);

module.exports = router;
