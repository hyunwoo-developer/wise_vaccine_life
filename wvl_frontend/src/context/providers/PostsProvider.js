import { useState } from "react";
import PostsContext from "../PostsContext";

const PostsProvider = ({ children }) => {
  const [postsInfo, setPostsInfo] = useState({
    posts: [],
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
