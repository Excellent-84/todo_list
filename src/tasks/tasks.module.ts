import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Status } from '../statuses/statuses.entity';
import { Task } from './tasks.entity';
import { Project } from '../projects/projects.entity';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    TypeOrmModule.forFeature([Project, Status, Task]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    TasksService
  ]
})
export class TasksModule {}
