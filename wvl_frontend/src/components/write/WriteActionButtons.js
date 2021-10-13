import React from "react";
import styled from "styled-components";
import ButtonComponent from "../common/ButtonComponent";
import LoadingComponent from "../../components/common/loading/LoadingComponent";
const WriteActionButtonWrapper = styled.div`
    margin-top: 2rem;
    margin-bottom: 3rem;

    button + button {
        margin-left: 0.5rem;
    }
`;

const StyledButton = styled(ButtonComponent)`
    background-color: #ed6652;
    border-radius: 2px;
    font-size: 1.3rem;
    padding: 0.7rem 1rem;
    & + & {
        margin-left: 0.5rem;
    }
`;

const WriteActionButtons = ({ isEdit, onCancel, onPublish, loading }) => {
    return (
        <WriteActionButtonWrapper>
            <StyledButton
                style={{ "background-color": "#44a2f8" }}
                onClick={onPublish}
            >
                게시물 {isEdit ? "수정" : "등록"}
            </StyledButton>
            <StyledButton onClick={onCancel}>취소</StyledButton>
        </WriteActionButtonWrapper>
    );
};

export default WriteActionButtons;
