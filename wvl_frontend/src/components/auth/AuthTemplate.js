import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../libs/styles/palette";

const AuthTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    /* background: ${palette.gray[2]}; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WhiteBox = styled.div`
    .logo-area {
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    }
    padding: 2rem;
    width: 360px;
    background: white;
    border-radius: 3px;
    border: 1px solid #ced4da;
`;

const AuthTemplate = ({ children, ...rest }) => {
    return (
        <AuthTemplateBlock>
            <WhiteBox>{children}</WhiteBox>
        </AuthTemplateBlock>
    );
};

export default AuthTemplate;
