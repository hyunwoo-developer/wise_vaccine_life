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

const WhtieBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;

const AuthTemplate = ({ children, ...rest }) => {
  return (
    <AuthTemplateBlock>
      <WhtieBox>{children}</WhtieBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
