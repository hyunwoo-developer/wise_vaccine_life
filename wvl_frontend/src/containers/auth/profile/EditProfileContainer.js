import React, { useContext, useEffect } from "react";
import { useState } from "react";
import EditProfile from "../../../components/auth/profile/EditProfile";
import AuthContext from "../../../context/AuthContext";
import ProfileContext from "../../../context/ProfileContext";

function EditProfileContainer() {
    const { authInfo, setAuthInfo } = useContext(AuthContext);
    const { profileInfo, setProfileInfo } = useContext(ProfileContext);
    console.log(profileInfo);
    const defaultOption = profileInfo;

    useEffect(() => {
        setProfileInfo({
            age: authInfo.userInfo.age,
            gender: authInfo.userInfo.gender,
            type: authInfo.userInfo.type,
            degree: authInfo.userInfo.degree,
            imgURL: authInfo.userInfo.profileImg,
            inoDate: authInfo.userInfo.inoDate,
        });
        console.log(profileInfo);
    }, [authInfo]);

    const [profileImg, setProfileImg] = useState({
        imgBase64: "",
        imgFile: null,
        imgURL: "",
    });

    const onChangeInputAge = (event) => {
        const { name, value } = event.target;
        console.log(event.target);
        setProfileInfo({
            ...profileInfo,
            age: value,
        });
    };

    const onClickAvatar = (e) => {
        const imageFile = e.target.files[0];
        const imgBase64 = URL.createObjectURL(imageFile);
        setProfileImg({
            ...profileImg,
            imgBase64: imgBase64,
            imgFile: imageFile,
        });
    };

    const onChangeDropDown = (payload) => {
        const { key, value } = payload;
        setProfileInfo({
            ...profileInfo,
            [key]: value,
        });
    };

    const onChangeCalender = (date) => {
        setProfileInfo({
            ...profileInfo,
            inoDate: date,
        });
        console.log(profileInfo);
    };

    return (
        <EditProfile
            onChangeDropDown={onChangeDropDown}
            profileImg={profileImg}
            onClickAvatar={onClickAvatar}
            onChangeCalender={onChangeCalender}
            onChangeInputAge={onChangeInputAge}
            defaultOption={profileInfo}
        />
    );
}

export default EditProfileContainer;
