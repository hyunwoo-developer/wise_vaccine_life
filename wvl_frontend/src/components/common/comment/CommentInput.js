import React from "react";
import styled from "styled-components";
import ButtonComponent from "../ButtonComponent";

const CommentInputWrap = styled.div`
    display: flex;
    width: 100%;
`;

const StyledInput = styled.input`
    border: none;
    background: rgba(0, 0, 0, 0.07);
    padding: 0.7rem;
    font-size: 1.2rem;
    line-height: 1.2rem;
    flex: 1;
    box-sizing: border-box;
    &:focus {
        outline: none;
    }
`;

const SubmitButton = styled(ButtonComponent)`
    border-radius: 0px;
    font-size: 1.2rem;
`;

function CommentInput() {
    return (
        <CommentInputWrap>
            <StyledInput placeholder="댓글을 입력해주세요." />
            <SubmitButton cyan>제출</SubmitButton>
        </CommentInputWrap>
    );
}

export default CommentInput;
