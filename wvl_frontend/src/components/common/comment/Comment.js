import React from "react";
import styled from "styled-components";
import CommentInput from "./CommentInput";
import CommentItemList from "./CommentItemList";

const CommentWrap = styled.div`
    width: 100%;
`;

const StyledHR = styled.hr`
    margin: 1rem 0 0 0;
    border: 0px;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.2);
`;

const CommentContainer = styled.div`
    margin-top: 2rem;
`;

function Comment({ postInfo, onChangeInput, onClickComment }) {
    return (
        <CommentWrap>
            <CommentContainer>
                <CommentInput
                    onChangeInput={onChangeInput}
                    onClickComment={onClickComment}
                />
            </CommentContainer>
            <StyledHR />
            <CommentItemList postInfo={postInfo.post.comments} />
        </CommentWrap>
    );
}

export default Comment;
