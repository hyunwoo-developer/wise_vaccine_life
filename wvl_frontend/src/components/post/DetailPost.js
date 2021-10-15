import React from "react";
import DefaultAvatar from "../../assets/global/profile.png";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import Comment from "../common/comment/Comment";

const DetailWrap = styled(Responsive)`
    margin-top: 3rem;
    margin-bottom: 4rem;
`;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DetailPostBlock = styled.div`
    padding: 1rem 1rem;
    max-width: 50rem;
    box-sizing: border-box;
    position: static;
    @media (max-width: 768px) {
        width: 100%;
    }
    & + & {
        margin-top: 2rem;
    }
`;

const ProfileWrap = styled.div`
    display: flex;
`;

const ProfileImageWrap = styled.div`
    width: 3rem;
    height: 3rem;
    cursor: pointer;
`;

const ProfileImage = styled.img`
    height: 100%;
    min-width: 100%;
    left: 50%;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.05);
    position: relative;
    border-radius: 50%;
    transform: translateX(-50%);
`;
const PostItemInfoWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 0.7rem;
`;

const PostItemDate = styled.div`
    font-size: 1.1rem;
    color: grey;
    margin-top: 0.3rem;
`;

const ProfileInfoWrap = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    .nickName {
        font-weight: bold;
        margin-right: 0.7rem;
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

const PostContentWrap = styled.div`
    margin-top: 2rem;
`;

const PostCategory = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    color: grey;
`;

const PostTitle = styled.div`
    font-size: 1.3rem;
    font-weight: bolder;
`;

const PostContent = styled.div`
    font-size: 1.3rem;
    margin-top: 2rem;
`;

const PostTags = styled.div`
    display: flex;
    margin-top: 2rem;
`;

const PostTagsItem = styled.div`
    font-size: 1.2rem;
    color: grey;
    & + & {
        margin-left: 0.1rem;
    }
`;

function DetailPost(postInfo) {
    const { gender } = postInfo;
    return (
        <DetailWrap>
            <DetailContainer>
                <DetailPostBlock>
                    <ProfileWrap>
                        <ProfileImageWrap>
                            <ProfileImage src={DefaultAvatar} />
                        </ProfileImageWrap>
                        <PostItemInfoWrap>
                            <ProfileInfoWrap>
                                <span className="nickName">
                                    이동훈
                                    {gender === "male" ? (
                                        <StyledMaleIcon />
                                    ) : (
                                        <StyledFemaleIcon />
                                    )}
                                </span>
                                <span className="profile">모더나</span>
                                <span className="dot">·</span>
                                <span className="profile">1차</span>
                                <span className="dot">·</span>
                                <span className="profile">20대</span>
                            </ProfileInfoWrap>
                            {/* 시간 남으면 1분전, 2시간전... 등 같이 만들어보기 */}
                            <PostItemDate>2021-10-14 / 13:33</PostItemDate>
                        </PostItemInfoWrap>
                    </ProfileWrap>
                    <PostContentWrap>
                        <PostCategory>후기</PostCategory>
                        <PostTitle>오늘 모더나 백신 맞고 왔습니다.</PostTitle>
                        <PostContent>
                            오늘 백신 맞고 왔습니다... 많이 아프네요.. 다들
                            힘내시길... <br /> 힘내시길 바래요 힘내시길 바래요
                            힘내시길 바래요 힘내시길 바래요 힘내시길 바래요
                        </PostContent>
                        <PostTags>
                            <PostTagsItem>#모더나</PostTagsItem>
                            <PostTagsItem>#부작용</PostTagsItem>
                            <PostTagsItem>#아픔</PostTagsItem>
                        </PostTags>
                    </PostContentWrap>
                    <Comment />
                </DetailPostBlock>
            </DetailContainer>
        </DetailWrap>
    );
}

export default DetailPost;
