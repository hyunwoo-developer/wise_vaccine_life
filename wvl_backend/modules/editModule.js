const user = require("../models/user");
const jwtModule = require("./jwtModule");
const statusCode = require("./statusCode");

const authModule = {
    loggedIn: async (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(statusCode.CONFLICT).json({
                message: "토큰 없음",
            });
        }

        const decoded = jwtModule.verify(token);
        if (decoded === -1) {
            return res.status(statusCode.CONFLICT).json({
                message: "만료된 토큰입니다.",
            });
        } else if (decoded === -2) {
            return res.status(statusCode.CONFLICT).json({
                message: "유효하지 않은 토큰입니다.",
            });
        } else if (decoded === -3) {
            return res.status(statusCode.CONFLICT).json({
                message: "토큰 에러 입니다.",
            });
        }

        let userInfo;
        try {
            userInfo = await user.findOne({ nickName: decoded.nickName });
        } catch (error) {
            console.log(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "유효하지 않은 유저입니다.",
            });
        }

        req.userInfo = userInfo;
        next();
    },
};

module.exports = authModule;
