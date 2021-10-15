import React, { useContext, useEffect, useState } from "react";
import PostsList from "../../components/posts/PostsList";
import PostsContext from "../../context/PostsContext";
import { useHistory } from "react-router";
import client from "../../libs/api/_client";
import AuthContext from "../../context/AuthContext";

function PostsListContainer() {
    const history = useHistory();
    const { postsInfo, setPostsInfo } = useContext(PostsContext);
    const { authInfo, setAuthInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            try {
                const response = await client.get("vaccine/posts");
                if (response.status === 200) {
                    setLoading(false);
                    const result = response.data.data;
                    setPostsInfo({
                        posts: result,
                    });
                    console.log("ㅁㅁㄴㅇㅁㅇ", postsInfo.posts);
                    console.log("(전체 게시물 조회) 홈페이지 업로드 완료");
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        getData();
    }, []);

    return (
        <PostsList
            posts={postsInfo.posts}
            loading={loading}
            authInfo={authInfo}
        />
    );
}

export default PostsListContainer;
