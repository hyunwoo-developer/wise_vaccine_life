const post = require("../../models/post");
const user = require("../../models/user");
const jwtModule = require("../../modules/jwtModule");
const statusCode = require("../../modules/statusCode");

const postController = {
    postUpload: async (req, res, next) => {
        const userInfo = req.userInfo;

        const { title, content, tags, category } = req.body;
        const postModel = post();

        postModel.title = title;
        postModel.content = content;
        postModel.tags = tags;
        postModel.category = category;
        postModel.publishedDate = new Date();
        postModel.writer = userInfo._id;

        try {
            const result = await postModel.save();
            res.status(statusCode.OK).json({
                message: "게시글 저장 성공",
                data: result,
            });
        } catch (error) {
            console.log(error);
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "게시글 저장 실패",
            });
        }
    },

    postUpdate: async (req, res, next) => {
        const userInfo = req.userInfo;

        const { id } = req.params;
        const { title, content, tags, category } = req.body;

        try {
            const ownResult = await post.checkAuth({
                postId: id,
                writerId: userInfo.id,
            });

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

        try {
            const result = await post.findByIdAndUpdate(
                id,
                { title, content, tags, category, updatedDate: new Date() },
                { new: true }
            );
            res.status(statusCode.OK).json({
                message: "게시글 수정 성공",
                data: result,
            });
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "게시글 수정 실패",
                error: error,
            });
        }
    },

    postDelete: async (req, res, next) => {
        const userInfo = req.userInfo;

        const { id } = req.params;

        try {
            const ownResult = await post.checkAuth({
                postId: id,
                writerId: userInfo.id,
            });

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

        try {
            const result = await post.findByIdAndDelete(id);
            res.status(statusCode.OK).json({
                message: "게시글 삭제 성공",
                data: result,
            });
        } catch (error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "게시글 삭제 실패",
                error: error,
            });
        }
    },
};

module.exports = postController;
