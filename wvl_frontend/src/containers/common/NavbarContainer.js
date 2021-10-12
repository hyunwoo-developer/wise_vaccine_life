import React from "react";
import { useContext } from "react";
import NavbarComponent from "../../components/common/NavbarComponent";
import AuthContext from "../../context/AuthContext";

function NavbarContainer() {
  const { authInfo } = useContext(AuthContext);
  console.log(authInfo);
  return <NavbarComponent authInfo={authInfo} />;
}

export default NavbarContainer;
