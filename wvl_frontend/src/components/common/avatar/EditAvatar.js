import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import DefaultProfileImg from "../../../assets/global/profile.png";

const RoundedProfileWrap = styled.div`
    width: ${(props) => (props.size ? `${props.size}px` : "8rem")};
    height: ${(props) => (props.size ? `${props.size}px` : "8rem")};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    pointer-events: ${(props) => (props.disabled ? "none" : "default")};
`;

const RoundedProfile = styled.div`
    width: ${(props) => (props.size ? `${props.size}px` : "8rem")};
    height: ${(props) => (props.size ? `${props.size}px` : "8rem")};
    border-radius: ${(props) => (props.radius ? `${props.radius}px` : "50%")};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #9e9e9e;
`;

function EditAvatar({ size, imgURL, onClickAvatar }) {
    const inputFileRef = useRef(null);

    const onClickImg = () => {
        inputFileRef.current.click();
    };

    return (
        <RoundedProfileWrap size={size} onClick={onClickAvatar && onClickImg}>
            <RoundedProfile
                size={size}
                style={{
                    backgroundImage: imgURL
                        ? `url(${imgURL})`
                        : `url(${DefaultProfileImg})`,
                }}
            />
            <input
                ref={inputFileRef}
                style={{ display: "invisible" }}
                type="file"
                name="profile"
                onChange={onClickAvatar}
                hidden={true}
            />
        </RoundedProfileWrap>
    );
}

export default EditAvatar;
