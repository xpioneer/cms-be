import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { User } from '@/entities/user';

@Injectable()
export class UserDao {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  login(username: string, password: string) {
    return this.usersRepository.findOne({
      select: ['id', 'username', 'nickName', 'userType', 'sex'],
      where: {
        username: Equal(username),
        password: Equal(password),
      },
    })
  }

  findAll() {
    return this.usersRepository.findAndCount()
  }

  // findOne(id: string) {
  //   return this.usersRepository.findOneBy({ id });
  // }

  // async remove(id: number) {
  //   await this.usersRepository.delete(id);
  // }
}