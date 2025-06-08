"use client";
import AddTaskModal from "@/components/AddTaskModal";
import { zodResolver } from "@hookform/resolvers/zod";
// import AddTaskButton from "@/components/ui/AddTaskButton";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const taskFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.enum(["work", "study", "personal"]),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["pending", "inprogress", "done"]),
  dueDate: z.date(),
  reminderDate: z.date(),
});

const Page = () => {
  // here you fetch the tasks from the server
  const { control, handleSubmit } = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "work",
      priority: "low",
      status: "pending",
      dueDate: new Date(),
      reminderDate: new Date(),
    },
  });

  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-3xl">Tasks</p>
          <p className="text-gray-500">Manage your tasks and stay organized</p>
        </div>
        <div>
          <AddTaskModal control={control} handleSubmit={handleSubmit} />
        </div>
      </div>
    </main>
  );
};

export default Page;
