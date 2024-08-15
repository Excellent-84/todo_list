import { forwardRef, Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Project } from '../projects/projects.entity';
import { Status } from './statuses.entity';
import { Task } from '../tasks/tasks.entity';
import { User } from '../users/users.entity';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  providers: [StatusesService],
  controllers: [StatusesController],
  imports: [
    TypeOrmModule.forFeature([User, Project, Status, Task]),
    forwardRef(() => AuthModule),
    ProjectsModule
  ],
  exports: [
    StatusesService
  ]
})
export class StatusesModule {}
