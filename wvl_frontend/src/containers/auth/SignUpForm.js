import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import AuthForm from "../../components/auth/AuthForm";
import client from "../../libs/api/_client";

function SignUpForm() {
    const history = useHistory();

    const [error, setError] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        nickName: "",
    });

    const onChagenInput = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const onClickSubmit = async (e) => {
        e.preventDefault();

        try {
            if (form.password !== form.passwordConfirm) {
                setError("비밀번호가 서로 다릅니다, 다시 입력해주세요.");
            } else {
                const response = await client.post("/vaccine/auth/signup", {
                    email: form.email,
                    nickName: form.nickName,
                    password: form.passwordConfirm,
                });

                if (response.status === 200) {
                    console.log("회원가입 성공");
                    history.goBack();
                }
            }
        } catch (error) {
            const errorStatus = error.response.status;
            if (errorStatus === 400) {
                setError("중복된 이메일 혹은 닉네임 존재합니다.");
            } else {
                setError("올바르게 입력해주세요.");
            }
        }
    };

    return (
        <AuthForm
            onClickSubmit={onClickSubmit}
            onChagenInput={onChagenInput}
            type="register"
            error={error}
            form={form}
        />
    );
}

export default SignUpForm;
