import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.entity";
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { Project } from "./projects/projects.entity";
import { StatusesModule } from './statuses/statuses.module';
import { Status } from "./statuses/statuses.entity";
import { TasksModule } from './tasks/tasks.module';
import { Task } from "./tasks/tasks.entity";


@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Project, Status, Task],
      synchronize: true
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    StatusesModule,
    TasksModule,
  ],
})

export class AppModule {}
