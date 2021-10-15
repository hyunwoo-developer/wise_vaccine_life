import React, { useContext, useEffect } from "react";
import { useState } from "react";
import EditProfile from "../../../components/auth/profile/EditProfile";
import AuthContext from "../../../context/AuthContext";
import ProfileContext from "../../../context/ProfileContext";
import client from "../../../libs/api/_client";

function EditProfileContainer() {
    const { authInfo, setAuthInfo } = useContext(AuthContext);
    const { profileInfo, setProfileInfo } = useContext(ProfileContext);
    console.log(profileInfo);
    const defaultOption = profileInfo;

    useEffect(() => {
        console.log(authInfo);
        setProfileInfo({
            age: authInfo.userInfo.age,
            gender: authInfo.userInfo.gender,
            type: authInfo.userInfo.type,
            degree: authInfo.userInfo.degree,
            imgURL: authInfo.userInfo.imgURL,
            inoDate: authInfo.userInfo.inoDate,
        });
    }, [authInfo]);

    const [profileImg, setProfileImg] = useState({
        imgBase64: "",
        imgFile: null,
        imgURL: "",
    });

    const onChangeInputAge = (event) => {
        const { name, value } = event.target;
        setProfileInfo({
            ...profileInfo,
            age: value,
        });
    };

    const onClickAvatar = async (e) => {
        const imageFile = e.target.files[0];
        const imgBase64 = URL.createObjectURL(imageFile);
        setProfileImg({
            ...profileImg,
            imgBase64: imgBase64,
            imgFile: imageFile,
        });

        const formData = new FormData();
        formData.append("img", imageFile);

        try {
            const response = await client.put(
                "vaccine/auth/profileimg",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                setProfileInfo({
                    ...profileInfo,
                    imgURL: response.data.imgUrl,
                });
            }
        } catch (error) {
            console.log(error);
        }
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
