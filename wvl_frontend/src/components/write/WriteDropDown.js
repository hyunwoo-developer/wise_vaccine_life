import React from "react";
import styled from "styled-components";
import DropDown from "../common/dropdown/DropDown";

const DropDownWrap = styled.div`
    margin-top: 3rem;
    width: 20rem;
`;

const StyledDropDown = styled(DropDown)`
    .DropDown_Control {
        font-size: 1.3rem !important;
    }

    .DropDown_Menu {
        font-size: 1.3rem !important;
    }

    .DropDown_Arrow {
        top: 11px !important;
    }
`;

function WriteDropDown({ options, defaultOption, onChangeDropDown }) {
    return (
        <DropDownWrap>
            <StyledDropDown
                options={options}
                defaultOption={defaultOption}
                onChangeDropDown={onChangeDropDown}
            />
        </DropDownWrap>
    );
}

export default WriteDropDown;
