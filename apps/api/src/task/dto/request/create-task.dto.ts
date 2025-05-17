import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatus } from '../../enums/task-status.enum';
import { TaskType } from '../../enums/task-type.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsEnum(TaskStatus)
  @IsNotEmpty()
  @IsOptional()
  status?: TaskStatus;

  @IsEnum(TaskType)
  @IsNotEmpty()
  @IsOptional()
  type?: TaskType;

  @IsDate()
  @IsOptional()
  due_date: Date;

  @IsDate()
  @IsOptional()
  reminder_date?: Date;
}
