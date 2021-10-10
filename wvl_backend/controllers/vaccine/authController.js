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
            console.log(error);
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "회원가입 실패",
                error: error,
            });
        }
    },

    // 로그인
    signin: async (req, res, next) => {
        let bcryptPassword = null;
        const saltRounds = 10;
        const { email, password } = req.body;
        // plain text 비밀번호를 bcrypt로 암호화
        try {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                try {
                    bcryptPassword = hash;
                } catch (error) {
                    console.log(error);
                }
            });
            // 회원 중 이메일과 암호화된 비밀번호가 맞는지 확인
            const result = await user.findOne({ email, bcryptPassword });
            if (result) {
                // 회원이 맞으면 페이로드에 닉네임과 verified를 넣음
                const payload = {
                    nickName: result.nickName,
                    verified: result.verified,
                };
                const token = jwtModule.create(payload); // 페이로드를 담아 토큰 생성
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
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "DB 서버 에러",
            });
        }
    },

    // 회원 전체 조회 (통계용)
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

    // 회원(자신) 정보 조회
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

    // 회원 정보 업데이트
    updateUser: async (req, res, next) => {
        const userInfo = req.userInfo;
        const { type, age, gender, degree, inoDate, profileImage } = req.body;

        try {
            const result = await user.findByIdAndUpdate(
                userInfo.id,
                {
                    type, // 백신 타입 : "화이자"
                    age, // 나이: 24
                    gender, // gender: "남자"
                    degree, // 접종 차수: 1
                    inoDate: new Date(Date.parse(inoDate)), // 접종 날짜: DATE(2021-09-03)타입
                    profileImage, // 프로파일 이미지: "http://hyunwoodev.com"
                    verified: true, // 회원 정보를 업데이트하면 verified를 true로 바꿔준다.
                },
                { new: true }
            );

            const payload = {
                nickName: result.nickName,
                verified: result.verified,
            };

            // 토큰을 새로 발급
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

    // 회원 탈퇴
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
