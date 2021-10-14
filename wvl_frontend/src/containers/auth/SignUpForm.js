import React, { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import AuthForm from "../../components/auth/AuthForm";
import client from "../../libs/api/_client";
import { ToastsStore } from "react-toasts";

function SignUpForm() {
    const history = useHistory();

    const [error, setError] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        nickName: "",
    });

    const onChangeInput = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });

        if (name === "email") {
            const reg_email =
                /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
            if (!reg_email.test(value)) {
                setError("이메일 형식이 잘못되었습니다.");
            } else {
                setError("");
            }
        }

        if (name === "passwordConfirm") {
            if (form.password === value && form.password.length > 0) {
                setError("");
            } else {
                setError("비밀번호가 서로 다릅니다, 다시 입력해주세요.");
            }
        }

        if (name === "password") {
            const reg = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

            if (
                form.passwordConfirm === value &&
                form.passwordConfirm.length > 0
            ) {
                setError("");
            } else {
                if (!reg.test(value)) {
                    setError(
                        "비밀번호는 8자 이상이어야 하며, 숫자/소문자/특수문자를 모두 포함해야 합니다."
                    );
                    return;
                }
                setError("비밀번호가 서로 다릅니다, 다시 입력해주세요.");
            }
        }
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
                    ToastsStore.success("회원가입 성공");
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
            onChangeInput={onChangeInput}
            type="register"
            error={error}
            form={form}
        />
    );
}

export default SignUpForm;
