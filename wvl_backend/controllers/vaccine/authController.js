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

    userUpdate: async (req, res, next) => {
        const userInfo = req.userInfo;
        const { id } = req.params;
        const { age, gender, degree, inodate, profileImage } = req.body;

        try {
            if (userInfo.id === id) {
                const result = await user.findByIdAndUpdate(
                    id,
                    {
                        age,
                        gender,
                        degree,
                        inodate, // 날짜 데이터 타입 문제
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
            } else {
                res.status(statusCode.CONFLICT).json({
                    message: "수정할 권한이 없습니다.",
                });
            }
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "회원정보 수정 실패",
                error: error,
            });
        }
    },

    userDelete: async (req, res, next) => {
        const userInfo = req.userInfo;
        const { id } = req.params;

        try {
            if (userInfo.id === id) {
                const result = await user.findByIdAndDelete(id);
                res.status(statusCode.OK).json({
                    message: "회원 탈퇴 완료",
                    data: result,
                });
            } else {
                res.status(statusCode.CONFLICT).json({
                    message: "삭제할 권한이 없습니다.",
                });
            }
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "회원 탈퇴 실패",
                error: error,
            });
        }
    },
};

module.exports = authController;
