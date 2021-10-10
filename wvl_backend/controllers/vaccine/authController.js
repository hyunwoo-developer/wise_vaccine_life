const user = require("../../models/user");
const jwtModule = require("../../modules/jwtModule");
const statusCode = require("../../modules/statusCode");

const authController = {
    signup: async (req, res, next) => {
        const { email, nickName, password } = req.body;
        try {
            const result = await user.findOne({
                $or: [{ email: email }, { nickName: nickName }],
            });
            if (result) {
                res.status(statusCode.BAD_REQUEST).json({
                    message: "중복된 이메일 혹은 닉네임 존재합니다.",
                });
            } else {
                const signUpModel = new user();

                signUpModel.email = email;
                signUpModel.nickName = nickName;
                signUpModel.password = password;
                await signUpModel.save();
                res.status(statusCode.OK).json({
                    message: "회원가입 성공",
                });
            }
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "회원가입 실패",
                error: error,
            });
        }
    },

    signin: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const result = await user.findOne({ email, password });
            if (result) {
                const payload = {
                    nickName: result.nickName,
                    verified: result.verified,
                };
                const token = jwtModule.create(payload);
                console.log(token);
                res.status(statusCode.OK).json({
                    message: "로그인 성공",
                    accessToken: token,
                });
            } else {
                res.status(statusCode.BAD_REQUEST).json({
                    message: "로그인 실패",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "DB 서버 에러",
            });
        }
    },

    readAllUser: async (req, res, next) => {
        try {
            const result = await user.find({}, { password: 0 });
            res.status(statusCode.OK).json({
                message: "회원 전체 조회 성공",
                data: result,
            });
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "회원 전체 조회 실패",
            });
        }
    },

    readUser: (req, res, next) => {
        const userInfo = req.userInfo;
        if (userInfo) {
            res.status(statusCode.OK).json({
                message: "회원 조회 성공",
                data: userInfo,
            });
        } else {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "회원 조회 실패",
            });
        }
    },

    updateUser: async (req, res, next) => {
        const userInfo = req.userInfo;
        const { age, gender, degree, inoDate, profileImage } = req.body;

        try {
            const result = await user.findByIdAndUpdate(
                userInfo.id,
                {
                    age,
                    gender,
                    degree,
                    inoDate: new Date(Date.parse(inoDate)), // 날짜 데이터 타입 문제
                    profileImage,
                    verified: true,
                },
                { new: true }
            );

            const payload = {
                nickName: result.nickName,
                verified: result.verified,
            };
            const token = jwtModule.create(payload);

            res.status(statusCode.OK).json({
                message: "회원정보 수정 완료",
                data: { result, token },
            });
        } catch (error) {
            console.log(error);
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "회원정보 수정 실패",
                error: error,
            });
        }
    },

    deleteUser: async (req, res, next) => {
        const userInfo = req.userInfo;

        try {
            const result = await user.findByIdAndDelete(userInfo.id);
            res.status(statusCode.OK).json({
                message: "회원 탈퇴 완료",
                data: result,
            });
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "회원 탈퇴 실패",
                error: error,
            });
        }
    },
};

module.exports = authController;
