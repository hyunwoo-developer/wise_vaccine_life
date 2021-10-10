const post = require("../../models/post");
const statusCode = require("../../modules/statusCode");

const commentController = {
    createComment: async (req, res, next) => {
        const userInfo = req.userInfo;

        const { comment } = req.body;
        const { id } = req.params;

        try {
            const result = await post.findByIdAndUpdate(
                id,
                {
                    comments: {
                        commentWriter: userInfo.id,
                        commentContent: comment,
                    },
                },
                { new: true }
            );
            res.status(statusCode.OK).json({
                message: "댓글 생성 성공",
                data: result,
            });
        } catch {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "댓글 생성 실패",
                error: error,
            });
        }
    },
    updateComment: (req, res, next) => {},
    deleteComment: (req, res, next) => {},
};

module.exports = commentController;
