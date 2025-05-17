// import { FC } from "react";
import { ListTodo } from "lucide-react";

import Link from "next/link";
import LogoutButton from "./LogoutButton";

// interface ComponentNameProps {
//   //   prop: type;
// }

const ComponentName = () => {
  return (
    <nav className="   border-b-2 ">
      <div className="  flex h-16 items-center justify-between px-4 mx-4 ">
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

export default ComponentName;
