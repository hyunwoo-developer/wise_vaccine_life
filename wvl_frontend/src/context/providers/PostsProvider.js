import { useState } from "react";
import PostsContext from "../PostsContext";

const PostsProvider = ({ children }) => {
    const [postsInfo, setPostsInfo] = useState({
        posts: [
            { _id: "111", title: "제목", content: "컨텐츠" },
            { _id: "111", title: "제목", content: "컨텐츠" },
            { _id: "111", title: "제목", content: "컨텐츠" },
            { _id: "111", title: "제목", content: "컨텐츠" },
            { _id: "111", title: "제목", content: "컨텐츠" },
            { _id: "111", title: "제목", content: "컨텐츠" },
        ],
    });

    return (
        <PostsContext.Provider
            value={{
                postsInfo,
                setPostsInfo,
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;
