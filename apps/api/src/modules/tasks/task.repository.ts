import { Repository } from 'typeorm';
import { Entities } from '@mini-bots/types';

export class TaskRepository extends Repository<Entities.Task> { }
