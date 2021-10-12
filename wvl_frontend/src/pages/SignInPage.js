import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import SignInForm from "../containers/auth/SignInForm";

function SignInPage() {
  return (
    <AuthTemplate>
      <SignInForm />
    </AuthTemplate>
  );
}

export default SignInPage;
