import { ReactNode } from "react";
import Navbar from "@/components/ui/Navbar";
import "@/app/globals.css";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
}
