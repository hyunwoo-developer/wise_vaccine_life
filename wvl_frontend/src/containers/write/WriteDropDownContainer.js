import React, { useContext, useEffect, useState } from "react";
import WriteDropDown from "../../components/write/WriteDropDown";
import PostContext from "../../context/PostContext";

function WriteDropDownContainer() {
    const options = ["후기", "꿀팁", "기타"];
    const { postInfo, setPostInfo } = useContext(PostContext);

    const onChangeDropDown = (payload) => {
        setPostInfo({
            ...postInfo,
            category: payload.value,
        });
    };

    return (
        <WriteDropDown onChangeDropDown={onChangeDropDown} options={options} />
    );
}

export default WriteDropDownContainer;
