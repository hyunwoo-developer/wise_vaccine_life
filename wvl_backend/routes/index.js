var express = require("express");
var router = express.Router();

const vaccineRouter = require("./vaccine/index");

router.use("/vaccine", vaccineRouter);

module.exports = router;
