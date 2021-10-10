const post = require("../../models/post");
const statusCode = require("../../modules/statusCode");

const postController = {
    // 게시물 전체 조회
    readAllPost: async (req, res, next) => {
        try {
            // 게시물 작성자의 프로필 이미지와 닉네임도 가져온다.
            const result = await post
                .find()
                .populate("writer", "nickName profileImage");
            if (!result) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: "데이터가 없습니다.",
                });
            }
            res.status(statusCode.OK).json({
                message: "게시물 전체 조회 성공",
                data: result,
            });
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "게시물 전체 조회 실패",
                error: error,
            });
        }
    },

    // 해당 게시물 조회
    readPost: async (req, res, next) => {
        const { id } = req.params;

        try {
            // 게시물 작성자의 프로필 이미지와 닉네임도 가져온다.
            const result = await post
                .findById(id)
                .populate("writer", "nickName profileImage");
            if (!result) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: "데이터가 없습니다.",
                });
            }
            res.status(statusCode.OK).json({
                message: "게시물 조회 성공",
                data: result,
            });
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "게시물 조회 실패",
                error: error,
            });
        }
    },

    // 게시물 생성
    createPost: async (req, res, next) => {
        const userInfo = req.userInfo;

        const { title, content, tags, category } = req.body;
        const postModel = post();

        postModel.title = title; // 게시물 제목
        postModel.content = content; // 게시물 내용
        postModel.tags = tags; // 태그 : ["화이자", "백신후기", "아프다"]
        postModel.category = category; // 카테고리 : 2
        postModel.publishedDate = new Date(); // 2021-09-03
        postModel.writer = userInfo._id; // 작성자의 ObjectId

        try {
            const result = await postModel.save();
            res.status(statusCode.OK).json({
                message: "게시물 생성 성공",
                data: result,
            });
        } catch (error) {
            console.log(error);
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "게시물 생성 실패",
            });
        }
    },

    // 게시물 수정 : 제목, 내용, 태그, 카테고리, 업데이트 날짜;(자동)
    updatePost: async (req, res, next) => {
        const userInfo = req.userInfo;

        const { id } = req.params; // 수정할 게시물의 id를 파라미터로 받음
        const { title, content, tags, category } = req.body;

        try {
            // 게시물의 작성자인지 아닌지 확인
            const ownResult = await post.checkAuth({
                postId: id,
                writerId: userInfo.id,
            });

            // 게시물의 작성자가 아닐 경우
            if (ownResult === -1) {
                return res.status(statusCode.CONFLICT).json({
                    message: "접근 권한이 없습니다.",
                });
            } else if (ownResult === -2) {
                res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                    message: "DB 서버 에러",
                });
            }

            // 게시물의 작성자일 경우
            const result = await post.findByIdAndUpdate(
                id,
                { title, content, tags, category, updatedDate: new Date() },
                { new: true }
            );

            res.status(statusCode.OK).json({
                message: "게시물 수정 성공",
                data: result,
            });
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "게시물 수정 실패",
                error: error,
            });
        }
    },

    // 게시물 삭제
    deletePost: async (req, res, next) => {
        const userInfo = req.userInfo;

        const { id } = req.params; // 삭제할 게시물 id을 파라미터로 받음

        try {
            // 게시물의 작성자인지 아닌지 확인
            const ownResult = await post.checkAuth({
                postId: id,
                writerId: userInfo.id,
            });

            // 게시물의 작성자가 아닐경우
            if (ownResult === -1) {
                return res.status(statusCode.CONFLICT).json({
                    message: "접근 권한이 없습니다.",
                });
            } else if (ownResult === -2) {
                res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                    message: "DB 서버 에러",
                });
            }
        } catch (error) {
            console.log(error);
        }

        // 게시물의 작성자일 경우
        try {
            const result = await post.findByIdAndDelete(id);
            res.status(statusCode.OK).json({
                message: "게시물 삭제 성공",
                data: result,
            });
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "게시물 삭제 실패",
                error: error,
            });
        }
    },
};

module.exports = postController;
