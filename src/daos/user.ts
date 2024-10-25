import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user';

@Injectable()
export class UserDao {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
  }

  findAll() {
    return this.usersRepository.findAndCount();
  }

  // findOne(id: string) {
  //   return this.usersRepository.findOneBy({ id });
  // }

  // async remove(id: number) {
  //   await this.usersRepository.delete(id);
  // }
}