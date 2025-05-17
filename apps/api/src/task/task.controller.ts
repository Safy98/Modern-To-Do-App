import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ResponseDto } from 'src/response.dto';
import { plainToInstance } from 'class-transformer';
import { TaskDto } from './dto/response/task.dto';
import { UpdateTaskDto } from './dto/request/update-task.dto';
import { GetTasksFilterDto } from './dto/request/Get-Tasks-Filter.dto';

@UseGuards(AuthGuard())
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<ResponseDto<TaskDto>> {
    const task: Task = await this.taskService.createTask(createTaskDto, user);
    const data = plainToInstance(TaskDto, task, {
      excludeExtraneousValues: true,
    });
    return new ResponseDto<TaskDto>({
      data,
      message: 'Task created successfully',
      success: true,
    });
  }

  @Get()
  async getTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User) {
    const tasks = await this.taskService.getTasks(filterDto, user);
    const data = plainToInstance(TaskDto, tasks, {
      excludeExtraneousValues: true,
    });
    return new ResponseDto<TaskDto[]>({
      data,
      message: 'Tasks retrieved successfully',
      success: true,
    });
  }

  @Get(':id')
  async getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<ResponseDto<TaskDto>> {
    const task = await this.taskService.getTaskById(id, user);
    const data = plainToInstance(TaskDto, task, {
      excludeExtraneousValues: true,
    });
    return new ResponseDto<TaskDto>({
      data,
      message: 'Task retrieved successfully',
      success: true,
    });
  }
  @Patch(':id')
  async editTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<ResponseDto<TaskDto>> {
    const task = await this.taskService.updateTask(updateTaskDto, user, id);
    const data = plainToInstance(TaskDto, task, {
      excludeExtraneousValues: true,
    });
    return new ResponseDto<TaskDto>({
      data,
      message: 'Task updated successfully',
      success: true,
    });
  }

  @Patch(':id')
  updateTaskStatus() {}

  @Delete(':id')
  async deleteTask(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<ResponseDto<null>> {
    await this.taskService.deleteTask(id, user);
    return new ResponseDto<null>({
      data: null,
      message: 'Task deleted successfully',
      success: true,
    });
  }
}
