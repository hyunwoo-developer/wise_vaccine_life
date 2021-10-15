import React from "react";
import { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import client from "../../libs/api/_client";
import { useHistory } from "react-router-dom";
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
        setError("비밀번호가 일치합니다.");
      } else {
        setError("비밀번호가 서로 다릅니다, 다시 입력해주세요.");
      }
    }

    if (name === "password") {
      const reg = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if (form.passwordConfirm === value && form.passwordConfirm.length > 0) {
        setError("보안 등급 : 강함");
      } else {
        if (!reg.test(value)) {
          setError(
            "비밀번호는 8자 이상이어야 하며, 숫자/특수문자를 모두 포함해야 합니다."
          );
        } else {
          setError("비밀번호가 서로 다릅니다, 다시 입력해주세요.");
        }
      }
    }
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();
    const reg = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const reg_email =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    try {
      if (!reg_email.test(form.email)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else if (form.password !== form.passwordConfirm) {
        setError("비밀번호가 서로 다릅니다, 확인해주세요.");
      } else if (!reg.test(form.password)) {
        setError(
          "비밀번호는 8자 이상이어야 하며, 숫자/특수문자를 모두 포함해야 합니다."
        );
      } else {
        const response = await client.post("/vaccine/auth/signup", {
          email: form.email,
          nickName: form.nickName,
          password: form.passwordConfirm,
        });

        if (response.status === 200) {
          console.log("회원가입 성공");
          ToastsStore.success("회원가입 완료");
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
      onChangeInput={onChangeInput}
      onClickSubmit={onClickSubmit}
      type="register"
      error={error}
      form={form}
    />
  );
}

export default SignUpForm;
