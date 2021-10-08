const post = require("../../models/post");
const user = require("../../models/user");
const jwtModule = require("../../modules/jwtModule");

const postController = {
    uploadPost: async (req, res, next) => {
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
            res.status(200).json({
                message: "게시물 저장 성공",
                data: result,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "게시물 저장 실패",
            });
        }
    },
};

module.exports = postController;
