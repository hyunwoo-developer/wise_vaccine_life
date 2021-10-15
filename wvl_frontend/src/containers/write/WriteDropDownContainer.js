import React from "react";
import { useContext } from "react";
import WriteDropDown from "../../components/write/WriteDropDown";
import PostContext from "../../context/PostContext";

function WriteDropDownContainer() {
  const { postInfo, setPostInfo } = useContext(PostContext);
  const defaultOption = postInfo.category;

  const options = ["후기", "꿀팁", "기타"];

  const onChangeDropDown = (payload) => {
    //console.log(payload);
    setPostInfo({
      ...postInfo,
      category: payload.value,
    });
  };

  return (
    <WriteDropDown
      options={options}
      defaultOption={defaultOption}
      postInfo={postInfo}
      onChangeDropDown={onChangeDropDown}
    />
  );
}

export default WriteDropDownContainer;
