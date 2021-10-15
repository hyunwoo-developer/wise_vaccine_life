import React from "react";
import BlockBox from "../components/common/block/BlockBox";
import Responsive from "../components/common/Responsive";
import EditProfileContainer from "../containers/auth/profile/EditProfileContainer";
import EditActionButtonContainer from "../containers/auth/profile/EditActionButtonContainer";

function EditProfilePage() {
  return (
    <Responsive>
      <BlockBox height={"3rem"} />
      <EditProfileContainer />
      <EditActionButtonContainer />
    </Responsive>
  );
}

export default EditProfilePage;
