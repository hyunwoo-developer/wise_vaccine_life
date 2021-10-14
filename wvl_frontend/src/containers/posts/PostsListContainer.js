import React, { useContext } from "react";
import PostsList from "../../components/posts/PostsList";
import PostsContext from "../../context/PostsContext";

function PostsListContainer() {
    const { postsInfo, setPostsInfo } = useContext(PostsContext);

    return <PostsList posts={postsInfo.posts} />;
}

export default PostsListContainer;
