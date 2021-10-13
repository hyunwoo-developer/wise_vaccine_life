import React from "react";
import styled from "styled-components";
import Responsive from "../../common/Responsive";
import BoldLabel from "../../common/text/BoldLabel";
import EditAvatar from "../../common/avatar/EditAvatar";
import DropDown from "../../common/dropdown/DropDown";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const EditProfileWrap = styled(Responsive)`
    margin-top: 2rem;
`;

const EditLabelWrap = styled.div`
    margin-bottom: 2rem;
`;

const EditItemBlock = styled.div`
    & + & {
        margin-top: 2rem;
    }
`;

const StyledDropDown = styled(DropDown)`
    width: 20rem;

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

const EditInput = styled.input`
    width: 20rem;
    box-sizing: border-box;
    font-size: 1.3rem;
    border: 1px solid #ccc;
    padding: 0.8rem 1rem;
    &:focus {
        outline: none;
    }
`;

function EditProfile({ onClickAvatar }) {
    return (
        <EditProfileWrap>
            <EditItemBlock>
                <EditLabelWrap>
                    <BoldLabel>프로필 이미지 선택</BoldLabel>
                </EditLabelWrap>
                <EditAvatar onClickAvatar={onClickAvatar} />
            </EditItemBlock>
            <EditItemBlock>
                <EditLabelWrap>
                    <BoldLabel>나이 입력</BoldLabel>
                </EditLabelWrap>
                <EditInput type="number" />
            </EditItemBlock>
            <EditItemBlock>
                <EditLabelWrap>
                    <BoldLabel>성별 선택</BoldLabel>
                </EditLabelWrap>
                <StyledDropDown
                    options={["남자", "여자"]}
                    myPlaceholder={"성별을 선택 해주세요."}
                />
            </EditItemBlock>
            <EditItemBlock>
                <EditLabelWrap>
                    <BoldLabel>백신 선택</BoldLabel>
                </EditLabelWrap>
                <StyledDropDown
                    options={["화이자", "모더나", "아스트라제네카", "얀센"]}
                    myPlaceholder={"백신을 선택 해주세요."}
                />
            </EditItemBlock>
            <EditItemBlock>
                <EditLabelWrap>
                    <BoldLabel>차수 선택</BoldLabel>
                </EditLabelWrap>
                <StyledDropDown
                    options={["1차 접종", "2차 접종"]}
                    myPlaceholder={"차수를 선택 해주세요."}
                />
            </EditItemBlock>
            <EditItemBlock>
                <EditLabelWrap>
                    <BoldLabel>백신 접종 날짜 선택</BoldLabel>
                </EditLabelWrap>
                <Calendar onChange={null} value={new Date()} />
            </EditItemBlock>
        </EditProfileWrap>
    );
}

export default EditProfile;
