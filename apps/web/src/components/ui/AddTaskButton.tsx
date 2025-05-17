import { Plus } from "lucide-react";
import React from "react";

const openTaskModal = () => {
  //   const modal = document.getElementById("task-modal");
  //   if (modal) {
  //     modal.classList.remove("hidden");
  //   }
};

const AddTaskButton = () => {
  return (
    <div>
      <button className="bg-black border rounded-md p-2 text-white flex gap-2 hover:bg-gray-800" onClick={openTaskModal}>
        <Plus />
        Add Task
      </button>
    </div>
  );
};

export default AddTaskButton;
