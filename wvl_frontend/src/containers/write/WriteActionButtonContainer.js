import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import WriteActionButtons from "../../components/write/WriteActionButtons";

const WriteActionButtonsContainer = ({ history }) => {
    const dispatch = useDispatch();

    const onPublish = () => {};

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
