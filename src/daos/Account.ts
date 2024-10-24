import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { User } from '@/entities/user';
import { BlogInjectRepository } from '@/database/injectables'

@Injectable()
export class AccountDao {
  constructor(
    // @InjectRepository(User, 'blog')
    private usersRepository: Repository<User>,
  ) {}

  login(username: string, password: string) {
    return this.usersRepository.findOneBy({
      username: Equal(username),
      password: Equal(password),
    });
  }
}