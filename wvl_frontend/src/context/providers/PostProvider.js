import { useState } from "react";
import PostContext from "../PostContext";

const PostProvider = ({ children }) => {
  const [postInfo, setPostInfo] = useState({
    category: "",
    tags: [],
    title: "",
    body: "",
    originalPostId: "",
  });

  return (
    <PostContext.Provider
      value={{
        postInfo,
        setPostInfo,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
