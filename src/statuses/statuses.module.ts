import { forwardRef, Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Project } from '../projects/projects.entity';
import { Status } from './statuses.entity';
import { Task } from '../tasks/tasks.entity';

@Module({
  providers: [StatusesService],
  controllers: [StatusesController],
  imports: [
    TypeOrmModule.forFeature([Project, Status, Task]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    StatusesService
  ]
})
export class StatusesModule {}
