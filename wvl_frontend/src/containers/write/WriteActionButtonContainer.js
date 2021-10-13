import axios from "axios";
import React, { useContext, useEffect } from "react";
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

    const onPublish = async () => {
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
                setPostInfo({ tags: [], title: "", body: "" });
                history.goBack();
            }
        } catch (error) {
            const errorStatus = error.response.status;
            if (errorStatus === 500) {
                ToastsStore.error("게시물 업로드 실패!");
            }
        }
    };

    const onCancel = () => {
        history.goBack();
    };

    return (
        <WriteActionButtons
            isEdit={false}
            onPublish={onPublish}
            onCancel={onCancel}
        />
    );
};

export default withRouter(WriteActionButtonsContainer);
