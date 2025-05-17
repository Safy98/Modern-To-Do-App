import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { TaskStatus } from './enums/task-status.enum';
import { TaskType } from './enums/task-type.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.OPEN })
  status: TaskStatus;
  @Column({ type: 'enum', enum: TaskType, default: TaskType.PERSONAL })
  type: TaskType;

  @Column({ type: 'timestamptz', nullable: true })
  due_date: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  reminder_date: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;
}
