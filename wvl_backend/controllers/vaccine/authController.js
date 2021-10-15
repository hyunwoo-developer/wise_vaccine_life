const user = require("../../models/user");
const jwtModule = require("../../modules/jwtModule");
const statusCode = require("../../modules/statusCode");
const bcrypt = require("bcrypt");
const authController = {
    // 회원가입
    signup: async (req, res, next) => {
        const { email, nickName, password } = req.body;
        try {
            // 이메일 또는 닉네임이 이미 존재하는지 확인
            const result = await user.findOne({
                $or: [{ email: email }, { nickName: nickName }],
            });
            if (result) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: "중복된 이메일 혹은 닉네임 존재합니다.",
                });
            } else {
                const signUpModel = new user();

                signUpModel.email = email;
                signUpModel.nickName = nickName;
                signUpModel.password = password;
                await signUpModel.save();
                return res.status(statusCode.OK).json({
                    message: "회원가입 성공",
                });
            }
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "회원가입 실패",
                error: error,
            });
        }
    },

    // 로그인
    signin: async (req, res, next) => {
        const { email, password } = req.body;

        try {
            const result = await user.findOne({ email });
            if (!result) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: "Email이 존재하지 않습니다.",
                });
            } else {
                result.comparePassword(password, (err, isMatch) => {
                    if (isMatch) {
                        // 회원이 맞으면 페이로드에 닉네임과 verified를 넣음
                        const payload = {
                            nickName: result.nickName,
                            verified: result.verified,
                            profileImage: result.profileImage,
                        };
                        const token = jwtModule.create(payload); // 페이로드를 담아 토큰 생성
                        return res.status(statusCode.OK).json({
                            message: "로그인 성공",
                            accessToken: token,
                        });
                    } else {
                        return res.status(statusCode.BAD_REQUEST).json({
                            message: "비밀번호가 틀렸습니다.",
                        });
                    }
                });
            }
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "DB 서버 에러",
            });
        }
    },

    // 회원 전체 조회 (통계용)
    readAllUser: async (req, res, next) => {
        try {
            const result = await user.find({}, { password: 0 });
            return res.status(statusCode.OK).json({
                message: "회원 전체 조회 성공",
                data: result,
            });
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "회원 전체 조회 실패",
            });
        }
    },

    // 회원(자신) 정보 조회
    readUser: (req, res, next) => {
        const userInfo = req.userInfo;
        if (userInfo) {
            return res.status(statusCode.OK).json({
                message: "회원 조회 성공",
                data: userInfo,
            });
        } else {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "회원 조회 실패",
            });
        }
    },

    // 회원 정보 업데이트
    updateUser: async (req, res, next) => {
        const userInfo = req.userInfo;

        const { type, age, gender, degree, inoDate, imgUrl } = req.body;

        try {
            const result = await user.findByIdAndUpdate(
                userInfo.id,
                {
                    type, // 백신 타입 : "화이자"
                    age, // 나이: 24
                    gender, // gender: "남자"
                    degree, // 접종 차수: 1
                    inoDate: new Date(Date.parse(inoDate)), // 접종 날짜: DATE(2021-09-03)타입
                    profileImage: imgUrl, // 프로파일 이미지: "https://wise-vaccine-life.s3.ap-northeast-2.amazonaws.com/1633851872207.PNG"
                    verified: true, // 회원 정보를 업데이트하면 verified를 true로 바꿔준다.
                },
                { new: true }
            );

            const payload = {
                nickName: result.nickName,
                verified: result.verified,
                profileImage: result.profileImage,
            };

            // 토큰을 새로 발급
            const token = jwtModule.create(payload);

            return res.status(statusCode.OK).json({
                message: "회원정보 수정 완료",
                data: { result, token },
            });
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "회원정보 수정 실패",
                error: error,
            });
        }
    },

    // 회원 탈퇴
    deleteUser: async (req, res, next) => {
        const userInfo = req.userInfo;

        try {
            const result = await user.findByIdAndDelete(userInfo.id);
            return res.status(statusCode.OK).json({
                message: "회원 탈퇴 완료",
                data: result,
            });
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "회원 탈퇴 실패",
                error: error,
            });
        }
    },

    // 이미지 업데이트
    updateImage: (req, res, next) => {
        const img = req.file;

        if (img) {
            return res.status(statusCode.OK).json({
                message: "이미지 업로드 완료",
                imgUrl: img.location,
            });
        } else {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "이미지 업로드 실패",
            });
        }
    },
};

module.exports = authController;
