import React from "react";
import DetailPost from "../../components/posts/DetailPost";
import { useEffect, useState } from "react";
import { useContext } from "react";
import PostContext from "../../context/PostContext";
import client from "../../libs/api/_client";
import { useParams } from "react-router";

function DetailPostContainer() {
    const { postInfo, setPostInfo } = useContext(PostContext);
    const [commentForm, setCommentForm] = useState("");
    const DetailPostPageUrl = useParams();

    useEffect(() => {
        async function getData() {
            try {
                const response = await client.get(
                    `vaccine/posts/${DetailPostPageUrl.postid}`
                );
                if (response.status === 200) {
                    const result = response.data.data;
                    setPostInfo({
                        post: result,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setCommentForm({
            comment: value,
        });
    };

    const onClickComment = async () => {
        const { comment } = commentForm;
        try {
            const response = await client.post(
                `vaccine/comments/${DetailPostPageUrl.postid}`,
                {
                    content: comment,
                }
            );
            if (response.status === 200) {
                const result = response.data.data;
                const targetComments = result.comments;
                setPostInfo({
                    ...postInfo,
                    post: {
                        ...postInfo.post,
                        comments: targetComments,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DetailPost
            postInfo={postInfo}
            onChangeInput={onChangeInput}
            onClickComment={onClickComment}
        />
    );
}

export default DetailPostContainer;
