import { useState } from "react";
import PostContext from "../PostContext";

const PostProvider = ({ children }) => {
    const [postInfo, setPostInfo] = useState({
        tags: [],
        title: "",
        body: "",
        category: "",
        originalPostId: "",
    });

    const resetPost = () => {
        setPostInfo({
            tags: [],
            title: "",
            body: "",
            category: "",
            originalPostId: "",
        });
    };

    return (
        <PostContext.Provider
            value={{
                postInfo,
                setPostInfo,
                resetPost,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export default PostProvider;
