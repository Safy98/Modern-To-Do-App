import React from "react";
import type { NextPage } from "next";
import AuthForm from "@/components/AuthForm";
const SignIn: NextPage = () => {
  return (
    <div className="auth-card">
      <div className="mb-5 text-center">
        <h2 className="font-bold text-2xl mb-2">Welcome back</h2>
        <p>Enter your email to sign in to your account</p>
      </div>
      <AuthForm type="sign-in" />
    </div>
  );
};

export default SignIn;
