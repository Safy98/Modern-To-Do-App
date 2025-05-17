// "use client";
import AddTaskButton from "@/components/ui/AddTaskButton";
import React from "react";

const Page = () => {
  // here you fetch the tasks from the server

  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-3xl">Tasks</p>
          <p className="text-gray-500">Manage your tasks and stay organized</p>
        </div>
        <div>
          <AddTaskButton />
        </div>
      </div>
    </main>
  );
};

export default Page;
