"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
type AddTaskModalProps = {
  control: Control<{
    title: string;
    description: string;
    type: string;
    priority: string;
    status: string;
    dueDate: Date;
    reminderDate: Date;
  }>;
  handleSubmit: UseFormHandleSubmit<{
    title: string;
    description: string;
    type: string;
    priority: string;
    status: string;
    dueDate: Date;
    reminderDate: Date;
  }>;
};

const AddTaskModal: FC<AddTaskModalProps> = ({ control, handleSubmit }) => {
  const onValidate = (data) => {
    console.log(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit(onValidate)} className="flex flex-col gap-7">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>Fill in the details to create a new task.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Label>Task Name</Label>
            <Controller control={control} name="title" render={({ field }) => <Input type="" placeholder={"Enter task title"} {...field} ref={field.ref} />}></Controller>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Controller control={control} name="description" render={({ field }) => <Textarea placeholder={"Enter task description"} {...field} ref={field.ref} />}></Controller>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex flex-col w-full gap-2">
              <Label>Type</Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="study">Study</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              ></Controller>
            </div>
            <div className="flex flex-col w-full gap-2">
              <Label>Priority</Label>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              ></Controller>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex flex-col w-full gap-2">
              <Label>Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inprogress">In Progres</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              ></Controller>
            </div>
            <div className="flex flex-col w-full gap-2">
              <Label>Due Date</Label>
              <Controller
                control={control}
                name="dueDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date() || date < new Date("1900-01-01")} captionLayout="dropdown" />
                    </PopoverContent>
                  </Popover>
                )}
              ></Controller>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Reminder Date (optional)</Label>
            <Controller
              control={control}
              name="reminderDate"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date() || date < new Date("1900-01-01")} captionLayout="dropdown" />
                  </PopoverContent>
                </Popover>
              )}
            ></Controller>{" "}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
