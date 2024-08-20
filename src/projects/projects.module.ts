import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.entity';
import { Status } from '../statuses/statuses.entity';
import { Task } from '../tasks/tasks.entity';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [
    TypeOrmModule.forFeature([User, Project, Status, Task]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    ProjectsService
  ]
})
export class ProjectsModule {}
