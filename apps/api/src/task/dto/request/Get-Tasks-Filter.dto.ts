import { TaskStatus } from 'src/task/enums/task-status.enum';

export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
