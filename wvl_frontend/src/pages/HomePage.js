import React from "react";
import WriteButton from "../components/write/WriteButton";

import PostsListContainer from "../containers/posts/PostsListContainer";
function HomePage() {
    return (
        <>
            <PostsListContainer />
            <WriteButton />
        </>
    );
}

export default HomePage;
