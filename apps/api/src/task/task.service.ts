import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { User } from 'src/auth/user.entity';
import { UpdateTaskDto } from './dto/request/update-task.dto';
import { GetTasksFilterDto } from './dto/request/Get-Tasks-Filter.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private _taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this._taskRepository.create({
      ...createTaskDto,
      user,
    });

    return await this._taskRepository.save(task);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this._taskRepository.findOne({ where: { id, user } });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this._taskRepository.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });
    if (status) {
      query.andWhere('task.staus = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    query.orderBy('task.created_at', 'DESC');
    const tasks = await query.getMany();
    return tasks;
  }

  async updateTask(updateTaskDto: UpdateTaskDto, user: User, id: string) {
    const updatedTask = await this._taskRepository.update(id, {
      ...updateTaskDto,
    });
    if (updatedTask.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return this.getTaskById(id, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const task = await this._taskRepository.findOne({ where: { id, user } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    const result = await this._taskRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
