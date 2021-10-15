import React from "react";
import DefaultAvatar from "../../assets/global/profile.png";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import Comment from "../common/comment/Comment";
import dayjs from "dayjs";

const DetailWrap = styled(Responsive)`
    margin-top: 5rem;
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
    width: 50rem;
    box-sizing: border-box;
    position: static;
    border: 1px solid #ced4da;
    @media (max-width: 768px) {
        width: 100%;
    }
    & + & {
        margin-top: 2rem;
    }
`;

const ProfileWrap = styled.div`
    display: flex;
    padding-top: 5px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ced4da;
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
    cursor: default;
`;

const PostItemDate = styled.div`
    font-size: 1.1rem;
    color: grey;
    margin-top: 0.5rem;
`;

const ProfileInfoWrap = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    justify-content: space-between;
    .nickName {
        font-weight: bold;
        margin-right: 0.7rem;
        font-size: 1.4rem;
    }

    .profile {
        color: grey;
        font-size: 1.3rem;
    }

    .dot {
        margin: 0 0.3rem;
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
    margin-top: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`;

const PostCategory = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    color: grey;
    margin-bottom: 1.2rem;
`;

const PostTitle = styled.div`
    font-size: 1.3rem;
    font-weight: bolder;
`;

const PostContent = styled.div`
    font-size: 1.3rem;
    line-height: 2rem;
    margin-top: 0.7rem;
`;

const PostTags = styled.div`
    display: flex;
    margin-top: 2rem;
`;

const PostTagsItem = styled.div`
    font-size: 1.2rem;
    color: grey;
    & + & {
        margin-left: 0.5rem;
    }
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

function DetailPost({ postInfo, onChangeInput, onClickComment }) {
    const { gender } = postInfo;
    // console.log(postInfo);
    const PostInfoPost = postInfo.post;
    console.log("aaa", PostInfoPost);
    const degree = degreeMap[PostInfoPost && PostInfoPost.writer.degree];
    const type = typeMap[PostInfoPost && PostInfoPost.writer.type];
    return (
        <>
            {PostInfoPost && (
                <DetailWrap>
                    <DetailContainer>
                        <DetailPostBlock>
                            <ProfileWrap>
                                <ProfileImageWrap>
                                    <ProfileImage
                                        src={PostInfoPost.writer.profileImage}
                                    />
                                </ProfileImageWrap>
                                <PostItemInfoWrap>
                                    <ProfileInfoWrap>
                                        <span className="nickName">
                                            {PostInfoPost.writer.nickName}
                                            {PostInfoPost.writer.gender ===
                                            "male" ? (
                                                <StyledMaleIcon />
                                            ) : (
                                                <StyledFemaleIcon />
                                            )}
                                        </span>
                                        <span className="profile">{type}</span>
                                        <span className="dot">·</span>
                                        <span className="profile">
                                            {degree}
                                        </span>
                                        <span className="dot">·</span>
                                        <span className="profile">
                                            {parseInt(
                                                PostInfoPost.writer.age / 10
                                            ) * 10}
                                            대
                                        </span>
                                    </ProfileInfoWrap>
                                    {/* 시간 남으면 1분전, 2시간전... 등 같이 만들어보기 */}
                                    <PostItemDate>
                                        {PostInfoPost.updatedDate
                                            ? dayjs(
                                                  PostInfoPost.updatedDate
                                              ).format(
                                                  "YYYY년 MM월 DD일 hh시 mm분"
                                              )
                                            : dayjs(
                                                  PostInfoPost.publishedDate
                                              ).format(
                                                  "YYYY년 MM월 DD일 hh시 mm분"
                                              )}
                                    </PostItemDate>
                                </PostItemInfoWrap>
                            </ProfileWrap>
                            <PostContentWrap>
                                <PostCategory>
                                    {PostInfoPost.category}
                                </PostCategory>
                                <PostTitle>
                                    &#91;{PostInfoPost.title}&#93;
                                </PostTitle>
                                <PostContent
                                    dangerouslySetInnerHTML={{
                                        __html: PostInfoPost.content,
                                    }}
                                ></PostContent>
                                <PostTags>
                                    {PostInfoPost.tags.map((item, index) => (
                                        <PostTagsItem key={index}>
                                            #{item}
                                        </PostTagsItem>
                                    ))}
                                </PostTags>
                            </PostContentWrap>
                            <Comment
                                postInfo={postInfo}
                                onChangeInput={onChangeInput}
                                onClickComment={onClickComment}
                            />
                        </DetailPostBlock>
                    </DetailContainer>
                </DetailWrap>
            )}
        </>
    );
}

export default DetailPost;
