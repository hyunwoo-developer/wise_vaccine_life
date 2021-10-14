import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import DefaultAvatar from "../../assets/global/profile.png";
import palette from "../../libs/styles/palette";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import LoadingComponent from "../common/loading/LoadingComponent";
import dayjs from "dayjs";
const PostsListBlock = styled(Responsive)`
    margin-top: 3rem;
    margin-bottom: 4rem;
`;

const PostsListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PostItemBlock = styled.div`
    padding: 1rem 1rem;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;

    max-width: 40rem;
    box-sizing: border-box;

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
    overflow: hidden;
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
        margin-left: 0.5rem;
    }
`;

function PostItem({ post, gender }) {
    console.log(post);
    console.log(post.writer);
    return (
        <PostItemBlock>
            <ProfileWrap>
                <ProfileImageWrap>
                    <ProfileImage src={post.writer.profileImage} />
                </ProfileImageWrap>
                <PostItemInfoWrap>
                    <ProfileInfoWrap>
                        <span className="nickName">
                            {post.writer.nickName}
                            {post.writer.gender === "male" ? (
                                <StyledMaleIcon />
                            ) : (
                                <StyledFemaleIcon />
                            )}
                        </span>
                        <span className="profile">{post.writer.type}</span>
                        <span className="dot">·</span>
                        <span className="profile">1차</span>
                        <span className="dot">·</span>
                        <span className="profile">
                            {parseInt(post.writer.age / 10) * 10}대
                        </span>
                    </ProfileInfoWrap>
                    {/* 시간 남으면 1분전, 2시간전... 등 같이 만들어보기 */}
                    <PostItemDate>
                        {post.updatedDate
                            ? dayjs(post.updatedDate).format("YYYY년 MM월 DD일")
                            : dayjs(post.publishedDate).format(
                                  "YYYY년 MM월 DD일"
                              )}
                    </PostItemDate>
                </PostItemInfoWrap>
            </ProfileWrap>
            <PostContentWrap>
                <PostCategory>{post.category}</PostCategory>
                <PostTitle>{post.title}</PostTitle>
                <PostContent
                    dangerouslySetInnerHTML={{ __html: post.content }}
                ></PostContent>
                <PostTags>
                    {post.tags.map((item) => (
                        <PostTagsItem>#{item}</PostTagsItem>
                    ))}
                </PostTags>
            </PostContentWrap>
        </PostItemBlock>
    );
}

function PostsList({ posts, loading }) {
    return (
        <>
            {loading && <LoadingComponent />}
            <PostsListBlock>
                <PostsListContainer>
                    {posts &&
                        posts.map((post, index) => {
                            return <PostItem post={post} />; // key={index} 선생님께 물어보기
                        })}
                </PostsListContainer>
            </PostsListBlock>
        </>
    );
}

export default PostsList;
