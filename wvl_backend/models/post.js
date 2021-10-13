const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true, default: null },
    tags: [{ type: String, default: null }],
    publishedDate: { type: Date, default: new Date(), required: true },
    updatedDate: { type: Date, default: null },
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    comments: [
        {
            commentWriter: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
            commentContent: { type: String, default: null },
            commentDate: { type: Date, default: new Date(), required: true },
        },
    ],
});

postSchema.statics.checkAuth = async function (params) {
    const { postId, writerId } = params;
    try {
        const ownResult = await this.findOne({ _id: postId });
        const ownId = ownResult.writer;
        if (!ownId.equals(writerId)) {
            return -1;
        }
        return 1;
    } catch (error) {
        return -2;
    }
};

postSchema.statics.checkCommentAuth = async function (params) {
    const { postId, commentId, writerId } = params;
    try {
        const result = await this.findOne({ _id: postId });
        const idx = result.comments.findIndex(
            // 댓글중 찾고자 하는 댓글의 인덱스를 리턴
            (item) => item._id.toString() === commentId
        );

        // 댓글 작성자가 파라미터로 받은 작성자와 같을 경우 1을 리턴
        if (writerId === result.comments[idx].commentWriter.toString()) {
            return 1;
        }

        return -1;
    } catch (error) {
        return -2;
    }
};

module.exports = mongoose.model("post", postSchema);
