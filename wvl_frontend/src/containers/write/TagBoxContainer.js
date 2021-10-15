import React from "react";
import { useContext } from "react";
import { useState } from "react";
import TagBox from "../../components/write/TagBox";
import PostContext from "../../context/PostContext";

const TagBoxContainer = () => {
  const { postInfo, setPostInfo } = useContext(PostContext);
  const tags = postInfo.tags;

  const onChangeTags = (nextTags) => {
    setPostInfo({
      ...postInfo,
      tags: nextTags,
    });
  };

  return <TagBox onChangeTags={onChangeTags} tags={tags} />;
};

export default TagBoxContainer;
