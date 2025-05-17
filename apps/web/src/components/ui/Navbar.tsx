// import { FC } from "react";
import { ListTodo } from "lucide-react";

import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <nav className="   border-b-2 ">
      <div className="  flex h-16 w-[90%] items-center justify-between  m-auto ">
        <div className="  ">
          <Link href={"/"} className="font-semibold flex gap-2 items-center text-2xl ">
            <ListTodo className=" " />
            <h1>Task Hunter</h1>
          </Link>
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
