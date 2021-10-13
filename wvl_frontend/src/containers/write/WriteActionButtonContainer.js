import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import AuthContext from "../../context/AuthContext";
import PostContext from "../../context/PostContext";
import client from "../../libs/api/_client";
import { ToastsStore } from "react-toasts";

const WriteActionButtonsContainer = ({ history }) => {
    const dispatch = useDispatch();

    const { authInfo, setAuthInfo } = useContext(AuthContext);
    const { postInfo, setPostInfo } = useContext(PostContext);
    const [isEdit, setIsEdit] = useState(true);

    useEffect(() => {
        const { originalPostId } = postInfo;
        if (originalPostId) {
            setIsEdit(true);
            async function getData() {
                try {
                    const response = await client.get(
                        `/vaccine/posts/${originalPostId}`
                    );
                    const result = response.data.data;
                    const { category, title, content, tags } = result;
                    setPostInfo({
                        ...postInfo,
                        category: category,
                        title: title,
                        body: content,
                        tags: tags,
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            getData();
        } else {
            setIsEdit(false);
        }
    }, []);

    const onPublish = async () => {
        if (isEdit) {
            const { originalPostId } = postInfo;
            try {
                const response = await client.put(
                    `/vaccine/posts/${originalPostId}`,
                    {
                        category: postInfo.category,
                        title: postInfo.title,
                        content: postInfo.body,
                        tags: postInfo.tags,
                        writer: authInfo._id,
                    }
                );
                if (response.status === 200) {
                    ToastsStore.success("게시물 수정 성공!");
                    setPostInfo({
                        tags: [],
                        title: "",
                        body: "",
                        category: "",
                    });
                    history.goBack();
                }
            } catch (error) {
                const errorStatus = error.response.status;
                if (errorStatus === 500) {
                    ToastsStore.error("모든 입력칸을 채워주세요");
                }
            }
        } else {
            try {
                const response = await client.post("/vaccine/posts", {
                    category: postInfo.category,
                    title: postInfo.title,
                    content: postInfo.body,
                    tags: postInfo.tags,
                    writer: authInfo._id,
                });
                if (response.status === 200) {
                    ToastsStore.success("게시물 업로드 성공!");
                    setPostInfo({
                        tags: [],
                        title: "",
                        body: "",
                        category: "",
                    });
                    history.goBack();
                }
            } catch (error) {
                const errorStatus = error.response.status;
                if (errorStatus === 500) {
                    ToastsStore.error("모든 입력칸을 채워주세요");
                }
            }
        }
    };

    const onCancel = () => {
        history.goBack();
    };

    return (
        <WriteActionButtons
            isEdit={isEdit}
            onPublish={onPublish}
            onCancel={onCancel}
        />
    );
};

export default withRouter(WriteActionButtonsContainer);
