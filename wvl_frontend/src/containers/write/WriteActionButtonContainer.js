import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import PostContext from "../../context/PostContext";
import client from "../../libs/api/_client";
import AuthContext from "../../context/AuthContext";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";

const WriteActionButtonsContainer = ({ history }) => {
  const { postInfo, setPostInfo } = useContext(PostContext);
  const [authInfo, setAuthInfo] = useState(AuthContext);
  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    const { originalPostId } = postInfo;
    if (originalPostId) {
      setIsEdit(true);
      async function getData() {
        try {
          const response = await client.get(
            `/vaccine/posts/${postInfo.originalPostId}`
          );
          const result = response.data.data;
          const { title, content, tags, category } = result;
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

  const dispatch = useDispatch();

  const onPublish = async () => {
    const { originalPostId } = postInfo;
    if (isEdit) {
      try {
        const response = await client.put(`/vaccine/posts/${originalPostId}`, {
          title: postInfo.title,
          content: postInfo.body,
          category: postInfo.category,
          tags: postInfo.tags,
          publishedDate: new Date(),
          writer: authInfo.nickName,
        });
        console.log(response);
        if (response.status === 200) {
          ToastsStore.success("게시글 수정 완료");
          history.push("/");
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
          console.log("에러");
        }
      }
    } else {
      try {
        const response = await client.post("/vaccine/posts", {
          title: postInfo.title,
          content: postInfo.body,
          category: postInfo.category,
          tags: postInfo.tags,
          publishedDate: new Date(),
          writer: authInfo.nickName,
        });
        console.log(response);
        if (response.status === 200) {
          ToastsStore.success("게시글 작성 완료");
          history.push("/");
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
          console.log("에러");
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
