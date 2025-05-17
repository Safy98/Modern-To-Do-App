import React from "react";
import "@/app/globals.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-center items-center w-full h-full flex-col gap-2">{children}</div>;
}
