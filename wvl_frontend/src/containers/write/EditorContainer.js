import React, { useEffect } from "react";
import { useContext } from "react";
import Editor from "../../components/write/Editor";
import PostContext from "../../context/PostContext";

function EditorContainer() {
  const { postInfo, setPostInfo } = useContext(PostContext);
  const { title, body } = postInfo;

  const onChangeField = (payload) => {
    const { key, value } = payload;
    setPostInfo({
      ...postInfo,
      [key]: value,
    });
    //console.log(postInfo);
  };

  return <Editor title={title} body={body} onChangeField={onChangeField} />;
}

export default EditorContainer;
