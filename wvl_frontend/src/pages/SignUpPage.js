import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import SignUpForm from "../containers/auth/SignUpForm";

function SignUpPage() {
  return (
    <AuthTemplate>
      <SignUpForm />
    </AuthTemplate>
  );
}

export default SignUpPage;
