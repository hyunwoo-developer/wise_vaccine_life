import React from "react";
import styled from "styled-components";
import ButtonComponent from "../common/ButtonComponent";
import palette from "../../libs/styles/palette";
import { BsPlusLg } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import PostContext from "../../context/PostContext";
import AuthContext from "../../context/AuthContext";

const StyledButton = styled(ButtonComponent)`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #ed6652;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    &:hover {
        background-color: ${palette.cyan[4]};
    }
    z-index: 3;
`;

const StyledIcon = styled(BsPlusLg)`
    font-size: 2rem;
    vertical-align: bottom;
`;

function WriteButton() {
    const history = useHistory();
    const { authInfo, setAuthInfo } = useContext(AuthContext);
    const { postInfo, setPostInfo } = useContext(PostContext);

    return (
        <>
            {authInfo.isLoggedIn && (
                <StyledButton
                    onClick={() => {
                        // setPostInfo({
                        //   ...postInfo,
                        //   originalPostId: "61668a7ff81a285a9c988b0a",
                        // });
                        history.push("/write");
                    }}
                >
                    <StyledIcon />
                </StyledButton>
            )}
        </>
    );
}

export default WriteButton;
