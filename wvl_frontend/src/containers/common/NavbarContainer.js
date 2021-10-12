import React, { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import NavbarComponent from "../../components/common/NavbarComponent";
import AuthContext from "../../context/AuthContext";

function NavbarContainer() {
    const history = useHistory();
    const { authInfo, setAuthInfo } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);

    const onClickProfileImg = () => {
        setVisible(!visible);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthInfo({ isLoggedIn: true });
        history.go();
    };

    console.log(authInfo);
    return (
        <NavbarComponent
            onClickProfileImg={onClickProfileImg}
            visible={visible}
            authInfo={authInfo}
            logout={logout}
        />
    );
}

export default NavbarContainer;
