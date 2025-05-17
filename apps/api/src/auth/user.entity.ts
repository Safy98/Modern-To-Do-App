import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Task } from 'src/task/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks: Task[];
}
