var express = require("express");
var router = express.Router();

const authController = require("../../../controllers/vaccine/authController");
const authModule = require("../../../modules/authModule");
const upload = require("../../../modules/awsUpload");

router.post("/signup", authController.signup); // 회원가입
router.post("/signin", authController.signin); // 로그인

router.put("/profile", authModule.loggedIn, authController.updateUser); // 회원정보 수정
router.delete("/profile", authModule.loggedIn, authController.deleteUser); // 회원 탈퇴

router.get("/", authController.readAllUser); // 회원 전체 조회
router.get("/profile", authModule.loggedIn, authController.readUser); // 회원(본인) 조회

module.exports = router;
