const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Number, required: true, default: 0 },
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
            commentDate: { type: Date, default: new Date() },
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

module.exports = mongoose.model("post", postSchema);
