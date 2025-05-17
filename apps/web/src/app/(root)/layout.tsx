import { ReactNode } from "react";
import Navbar from "@/components/ui/Navbar";
import "@/app/globals.css";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="w-[90%] m-auto mt-8">{children}</div>
    </>
  );
}
