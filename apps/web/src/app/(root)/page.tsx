"use client";
import { signOut } from "next-auth/react";
import React from "react";

const Page = () => {
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() =>
          signOut({
            redirect: true, // Optional: set to false if you want to handle redirect manually
            callbackUrl: "/sign-in", // Optional: where to go after logout
          })
        }
      >
        Logout
      </button>{" "}
    </div>
  );
};

export default Page;
