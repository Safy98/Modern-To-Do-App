import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/task.entity';

@Module({
  imports: [
    AuthModule,
    TaskModule,
    TypeOrmModule.forRoot({
      database: 'todoapp',
      password: 'safee51',
      username: 'postgres',
      port: 5438,
      type: 'postgres',
      entities: [Task],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
