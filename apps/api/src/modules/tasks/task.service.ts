import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entities } from '@mini-bots/types';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Entities.Task)
    private readonly taskRepository: TaskRepository,
  ) { }

  async findAll(): Promise<Entities.Task[]> {
    return await this.taskRepository.find();
  }

  async findByName(taskName: string) {
    return await this.taskRepository.findOne({ where: { name: taskName } })
  }

  async createTask(taskName: string, description: string) {
    return await this.taskRepository.save({ name: taskName, description: description })
  }
}
