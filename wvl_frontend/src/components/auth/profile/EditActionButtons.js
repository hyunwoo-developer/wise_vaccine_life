import React from "react";
import ButtonComponent from "../../common/ButtonComponent";
import styled from "styled-components";
import Responsive from "../../common/Responsive";

const EditActionButtonWrapper = styled(Responsive)`
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

function EditActionButtons({ onEdit, onCancel }) {
    return (
        <EditActionButtonWrapper>
            <StyledButton
                style={{ backgroundColor: "#44a2f8" }}
                onClick={onEdit}
            >
                정보 수정
            </StyledButton>
            <StyledButton onClick={onCancel}>취소</StyledButton>
        </EditActionButtonWrapper>
    );
}

export default EditActionButtons;
