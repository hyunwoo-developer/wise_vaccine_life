import React, { useContext } from "react";
import styled from "styled-components";
import ButtonComponent from "../common/ButtonComponent";
import palette from "../../libs/styles/palette";
import { BsPlusLg } from "react-icons/bs";
import { useHistory } from "react-router-dom";
//=============
import PostContext from "../../context/PostContext";
//================
const StyledButton = styled(ButtonComponent)`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #44a2f8;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    &:hover {
        background-color: ${palette.cyan[4]};
    }
`;

const StyledIcon = styled(BsPlusLg)`
    font-size: 2rem;
    vertical-align: bottom;
`;

function WriteButton() {
    //=======================================
    const { postInfo, setPostInfo } = useContext(PostContext);
    //=======================================

    const history = useHistory();
    console.log(history);
    return (
        <StyledButton
            onClick={() => {
                setPostInfo({
                    ...postInfo,
                    originalPostId: "616672fbc68dcdfc11ec2f66",
                });
                history.push("/write");
            }}
        >
            <StyledIcon />
        </StyledButton>
    );
}

export default WriteButton;
