import React from "react";
import Responsive from "../components/common/Responsive";
import EditorContainer from "../containers/write/EditorContainer";
import TagBoxContainer from "../containers/write/TagBoxContainer";
import WriteActionButtonContainer from "../containers/write/WriteActionButtonContainer";
import WriteDropDownContainer from "../containers/write/WriteDropDownContainer";
import BlockBox from "../components/common/block/BlockBox";

function WritePage() {
  return (
    <Responsive>
      <BlockBox height={"3rem"} />
      <WriteDropDownContainer />
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonContainer />
    </Responsive>
  );
}

export default WritePage;
