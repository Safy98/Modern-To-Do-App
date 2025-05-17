"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <div className="flex gap-4 items-center hover:bg-gray-100 transition-all delay-150 p-1  rounded-xl ">
      <LogOut className="" />
      <button
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: "/sign-in",
          })
        }
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
