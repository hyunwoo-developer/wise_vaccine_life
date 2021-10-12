import React, { useState } from "react";
import { useContext } from "react";
import NavbarComponent from "../../components/common/NavbarComponent";
import AuthContext from "../../context/AuthContext";

function NavbarContainer() {
    const { authInfo } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);

    const onClickProfileImg = () => {
        setVisible(!visible);
    };
    console.log(authInfo);
    return (
        <NavbarComponent
            onClickProfileImg={onClickProfileImg}
            visible={visible}
            authInfo={authInfo}
        />
    );
}

export default NavbarContainer;
