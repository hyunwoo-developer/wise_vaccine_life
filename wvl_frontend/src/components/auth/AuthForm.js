import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../libs/styles/palette";
import ButtonComponent from "../common/ButtonComponent";

const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 2rem;
        font-size: 1.5rem;
        font-weight: bolder;
    }
`;

const StyledInput = styled.input`
    font-size: 1.2rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }

    & + & {
        margin-top: 1rem;
    }
`;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a {
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover {
            color: ${palette.gray[9]};
        }
    }
`;

const ButtonWithMarginTop = styled(ButtonComponent)`
    margin-top: 2rem;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const textMap = {
    login: "로그인",
    register: "회원가입",
};

const AuthForm = ({ type, form, onChangeInput, onClickSubmit, error }) => {
    const text = textMap[type];
    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={onClickSubmit}>
                <StyledInput
                    autoComplete="email"
                    name="email"
                    placeholder="이메일"
                    onChange={onChangeInput}
                    value={form.email}
                />
                {type === "register" && (
                    <StyledInput
                        autoComplete="nickName"
                        name="nickName"
                        placeholder="닉네임"
                        value={form.nickName}
                        onChange={onChangeInput}
                    />
                )}
                <StyledInput
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                    value={form.password}
                    onChange={onChangeInput}
                />
                {type === "register" && (
                    <StyledInput
                        autoComplete="new-password"
                        name="passwordConfirm"
                        placeholder="비밀번호 확인"
                        type="password"
                        value={form.passwordConfirm}
                        onChange={onChangeInput}
                    />
                )}
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <ButtonWithMarginTop cyan fullWidth>
                    {text}
                </ButtonWithMarginTop>
            </form>
        </AuthFormBlock>
    );
};

export default AuthForm;
