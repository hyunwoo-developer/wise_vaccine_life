var express = require("express");
var router = express.Router();

const authRouter = require("./auth/index");
const postRouter = require("./posts/index");
const commentRouter = require("./comments/index");

router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);

module.exports = router;
