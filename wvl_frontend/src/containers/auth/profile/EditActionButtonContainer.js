import React, { useContext } from "react";
import EditActionButtons from "../../../components/auth/profile/EditActionButtons";
import AuthContext from "../../../context/AuthContext";
import ProfileContext from "../../../context/ProfileContext";
import client from "../../../libs/api/_client";

import { ToastsStore } from "react-toasts";
import { useHistory } from "react-router";
function EditActionButtonContainer() {
    const history = useHistory();
    const { authInfo, setAuthInfo } = useContext(AuthContext);
    const { profileInfo, setProfileInfo } = useContext(ProfileContext);
    const onEdit = async () => {
        try {
            const response = await client.put("vaccine/auth/profile", {
                age: profileInfo.age,
                gender: profileInfo.gender,
                type: profileInfo.type,
                degree: profileInfo.degree,
                inoDate: profileInfo.inoDate,
                imgUrl: profileInfo.imgURL,
            });

            if (response.status === 200) {
                setAuthInfo({
                    ...authInfo,
                    userInfo: {
                        ...authInfo.userInfo,
                        age: profileInfo.age,
                        gender: profileInfo.gender,
                        type: profileInfo.type,
                        degree: profileInfo.degree,
                        imgURL: profileInfo.imgURL,
                        inoDate: profileInfo.inoDate,
                    },
                });
                ToastsStore.success("회원정보 수정 성공!");
                history.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onCancel = () => {
        history.goBack();
    };

    return <EditActionButtons onEdit={onEdit} onCancel={onCancel} />;
}

export default EditActionButtonContainer;
