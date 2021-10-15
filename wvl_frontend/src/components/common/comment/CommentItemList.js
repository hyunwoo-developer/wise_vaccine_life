import React from "react";
import styled from "styled-components";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import DefaultAvatar from "../../../assets/global/profile.png";
import dayjs from "dayjs";
const CommentItemWrap = styled.div``;

const CommentItemBlock = styled.div`
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ProfileWrap = styled.div`
    display: flex;
`;

const ProfileImageWrap = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
`;

const ProfileImage = styled.img`
    height: 100%;
    min-width: 100%;
    width: 2rem;
    height: 2rem;
    left: 50%;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.05);

    position: relative;
    border-radius: 50%;
    transform: translateX(-50%);
`;
const CommentItemInfoWrap = styled.div`
    display: flex;
    align-items: center;
    margin-left: 0.7rem;
`;

const CommentItemDate = styled.div`
    font-size: 1.1rem;
    color: grey;
    margin-top: 0.3rem;
`;

const ProfileInfoWrap = styled.div`
    display: flex;
    padding-top: 0.3rem;
    align-items: center;
    font-size: 1.3rem;

    .nickName {
        font-weight: bold;
        margin-right: 0.6rem;
    }

    .profile {
        color: grey;
    }

    .dot {
        margin: 0 0.2rem;
    }
`;

const StyledMaleIcon = styled(BsGenderMale)`
    font-weight: bolder;
    vertical-align: bottom;
    color: blue;
    stroke: blue;
    stroke-width: 0.7px;
`;
const StyledFemaleIcon = styled(BsGenderFemale)`
    font-weight: bolder;
    vertical-align: bottom;
    color: red;
    stroke: red;
    stroke-width: 0.7px;
`;

const CommentContent = styled.div`
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    line-height: 2rem;
`;

const degreeMap = {
    0: "접종 안함",
    1: "1차 접종",
    2: "2차 접종",
};

const typeMap = {
    PZ: "화이자",
    MD: "모더나",
    AZ: "아스트라제네카",
    JS: "얀센",
};

function CommentItem({ commentInfo }) {
    // console.log(commentInfo);
    const degree = degreeMap[commentInfo && commentInfo.commentWriter.degree];
    const type = typeMap[commentInfo && commentInfo.commentWriter.type];
    console.log(commentInfo);
    return (
        <>
            {commentInfo && (
                <CommentItemBlock>
                    <ProfileWrap>
                        <ProfileImageWrap>
                            <ProfileImage
                                src={commentInfo.commentWriter.profileImage}
                            />
                        </ProfileImageWrap>
                        <CommentItemInfoWrap>
                            <ProfileInfoWrap>
                                <span className="nickName">
                                    {commentInfo.commentWriter.nickName}
                                    {commentInfo.commentWriter.gender ===
                                    "male" ? (
                                        <StyledMaleIcon />
                                    ) : (
                                        <StyledFemaleIcon />
                                    )}
                                </span>
                                <span className="profile">{type}</span>
                                <span className="dot">·</span>
                                <span className="profile">{degree}</span>
                                <span className="dot">·</span>
                                <span className="profile">
                                    {parseInt(
                                        commentInfo.commentWriter.age / 10
                                    ) * 10}
                                    대
                                </span>
                            </ProfileInfoWrap>
                        </CommentItemInfoWrap>
                    </ProfileWrap>
                    <CommentContent>
                        {commentInfo.commentContent}
                    </CommentContent>
                    <CommentItemDate>
                        {commentInfo.updatedDate
                            ? dayjs(commentInfo.updatedDate).format(
                                  "YYYY년 MM월 DD일 HH시 mm분"
                              )
                            : dayjs(commentInfo.commentDate).format(
                                  "YYYY년 MM월 DD일 HH시 mm분"
                              )}
                    </CommentItemDate>
                </CommentItemBlock>
            )}
        </>
    );
}

function CommentItemList({ postInfo }) {
    // console.log("postInfo: ", postInfo);
    return (
        <CommentItemWrap>
            {postInfo.map((commentInfo, index) => {
                return <CommentItem commentInfo={commentInfo} key={index} />;
            })}
        </CommentItemWrap>
    );
}

export default CommentItemList;
