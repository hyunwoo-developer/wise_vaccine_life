import React from "react";
import WriteButton from "../components/write/WriteButton";
import PostsListContainer from "../containers/posts/PostsListContainer";

function HomePage() {
  return (
    <div>
      <WriteButton />
      <PostsListContainer />
    </div>
  );
}

export default HomePage;
