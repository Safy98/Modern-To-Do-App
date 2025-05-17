import React from "react";
import type { NextPage } from "next";
import AuthForm from "@/components/AuthForm";

const SignUp: NextPage = () => {
  return (
    <div className="auth-card">
      <div className="mb-5 text-center">
        <h2 className="font-bold text-2xl mb-2">Create an account </h2>
        <p>Enter your email below to create your account</p>
      </div>
      <AuthForm type="sign-up" />
    </div>
  );
};

export default SignUp;
