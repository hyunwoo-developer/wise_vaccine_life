import React from "react";
import { useState } from "react";
import EditProfile from "../../../components/auth/profile/EditProfile";

function EditProfileContainer() {
    const [profile, setProfile] = useState({
        imgBase64: "",
        imgFile: null,
        imgUrl: "",
    });

    const onClickAvatar = () => {
        console.log("??");
    };
    return <EditProfile onClickAvatar={onClickAvatar} />;
}

export default EditProfileContainer;
