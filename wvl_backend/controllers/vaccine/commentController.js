const post = require("../../models/post");
const statusCode = require("../../modules/statusCode");

const commentController = {
    // 댓글 생성
    createComment: async (req, res, next) => {
        const userInfo = req.userInfo;

        const { content } = req.body;
        const { id } = req.params;

        try {
            const result = await post.findByIdAndUpdate(
                id,
                {
                    $push: {
                        comments: {
                            commentContent: content,
                            commentWriter: userInfo.id,
                            commentDate: new Date(),
                        },
                    },
                },
                { new: true }
            );

            return res.status(statusCode.OK).json({
                message: "댓글 생성 성공",
                data: result,
            });
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "댓글 생성 실패",
                error: error,
            });
        }
    },
    deleteComment: async (req, res, next) => {
        const userInfo = req.userInfo;

        const id = req.params.id; // 게시물 id을 파라미터로 받음
        const commentId = req.params.commentid; // 삭제할 댓글의 id를 파라미터로 받음

        try {
            // 댓글의 작성자인지 아닌지 확인
            const ownResult = await post.checkCommentAuth({
                postId: id,
                commentId: commentId,
                writerId: userInfo.id,
            });

            // 댓글의 작성자가 아닐경우
            if (ownResult === -1) {
                return res.status(statusCode.CONFLICT).json({
                    message: "접근 권한이 없습니다.",
                });
            } else if (ownResult === -2) {
                return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                    message: "DB 서버 에러",
                });
            }
        } catch (error) {
            console.log(error);
        }

        // 댓글의 작성자일 경우
        try {
            const result = await post.findByIdAndUpdate(
                id,
                {
                    $pull: { comments: { _id: commentId } },
                },
                { new: true }
            );
            return res.status(statusCode.OK).json({
                message: "댓글 삭제 성공",
                data: result,
            });
        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
                message: "댓글 삭제 실패",
                error: error,
            });
        }
    },
};

module.exports = commentController;
