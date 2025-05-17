import { Exclude, Expose } from 'class-transformer';

export class TaskDto {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  status: string;
  @Expose()
  type: string;
  @Expose()
  created_at: Date;
  @Expose()
  due_date: Date;
  @Expose()
  reminder_date?: Date;

  constructor(partial: Partial<TaskDto>) {
    Object.assign(this, partial);
  }
}
