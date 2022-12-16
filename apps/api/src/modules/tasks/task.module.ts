import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from '@mini-bots/types';
import { TaskService } from './task.service';

@Module({
    imports: [TypeOrmModule.forFeature([Entities.Task])],
    providers: [TaskService],
    controllers: [],
    exports: [TaskService],
})
export class TaskModule { }
