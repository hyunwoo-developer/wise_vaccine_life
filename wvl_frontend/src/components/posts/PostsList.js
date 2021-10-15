import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import DefaultAvatar from "../../assets/global/profile.png";
import palette from "../../libs/styles/palette";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import LoadingComponent from "../common/loading/LoadingComponent";
import dayjs from "dayjs";
import PostsContext from "../../context/PostsContext";
import { AiFillEdit } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import Comment from "../common/comment/Comment";
const PostsListBlock = styled(Responsive)`
    padding-top: 4rem;
    margin-bottom: 4rem;
`;

const PostsListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PostItemBlock = styled.div`
    padding: 1rem 1rem;
    border: 1px solid #ced4da;
    border-radius: 2px;
    background-color: white;
    cursor: pointer;

    max-width: 40rem;
    width: 40rem;
    box-sizing: border-box;

    @media (max-width: 768px) {
        width: 100%;
    }

    & + & {
        margin-top: 3rem;
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
    border-radius: 50%;
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
    margin-top: 1rem;
`;

const PostTagsItem = styled.div`
    font-size: 1.2rem;
    color: grey;
    & + & {
        margin-left: 0.5rem;
    }
`;

// const PostAiFillEdit = styled(AiFillEdit)`
//     font-size: 26px;
//     /* margin-left: 10rem; */
//     color: #10345f;
// `;

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

function PostItem({ post, onClickPost }) {
    const degree = degreeMap[post.writer.degree];
    const type = typeMap[post.writer.type];
    // console.log(post);
    // console.log(post.writer);
    return (
        <>
            {post && (
                <PostItemBlock onClick={onClickPost}>
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
                                <span className="profile">{type}</span>
                                <span className="dot">·</span>
                                <span className="profile">{degree}</span>
                                <span className="dot">·</span>
                                <span className="profile">
                                    {parseInt(post.writer.age / 10) * 10}대
                                </span>
                            </ProfileInfoWrap>
                            <PostItemDate>
                                {post.updatedDate
                                    ? dayjs(post.updatedDate).format(
                                          "YYYY년 MM월 DD일 hh시 mm분"
                                      )
                                    : dayjs(post.publishedDate).format(
                                          "YYYY년 MM월 DD일 hh시 mm분"
                                      )}
                            </PostItemDate>
                        </PostItemInfoWrap>
                    </ProfileWrap>
                    <PostContentWrap>
                        <PostCategory>@{post.category}</PostCategory>
                        <PostTitle>&#91;{post.title}&#93;</PostTitle>
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
            )}
        </>
    );
}

function PostsList({ posts, loading }) {
    const history = useHistory();
    return (
        <>
            {loading && <LoadingComponent />}
            <PostsListBlock>
                <PostsListContainer>
                    {posts &&
                        posts.map((post, index) => {
                            return (
                                <PostItem
                                    key={index}
                                    onClickPost={() =>
                                        history.push(`/post/${post._id}`)
                                    }
                                    post={post}
                                />
                            );
                        })}
                </PostsListContainer>
            </PostsListBlock>
        </>
    );
}

export default PostsList;
