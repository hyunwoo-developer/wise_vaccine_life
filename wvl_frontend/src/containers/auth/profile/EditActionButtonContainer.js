import React, { useContext } from "react";
import EditActionButtons from "../../../components/auth/profile/EditActionButtons";
import AuthContext from "../../../context/AuthContext";
import client from "../../../libs/api/_client";

function EditActionButtonContainer() {
    const { authInfo, setAuthInfo } = useContext(AuthContext);

    const onEdit = async () => {
        try {
            const response = await client.put("vaccine/auth/profile");
            console.log("response: ", response);
            const result = response.data.data;
            console.log("result: ", result);
            const { age, gender, type, degree, inoDate } = result;
            setAuthInfo({
                ...authInfo,
                age,
                gender,
                type,
                degree,
                inoDate,
            });
        } catch (error) {
            console.log("회원 정보 변경 에러: ", error);
        }
    };
    return <EditActionButtons />;
}

export default EditActionButtonContainer;
