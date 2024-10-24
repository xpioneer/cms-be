import { UserLogin } from '@/types/account';
import { Controller, Get, Post, Query, Param, Body, Session } from '@nestjs/common';
import { UserDao } from '@/daos/user'
// import { UsersModule } from '@/daos/users.module'


@Controller('user')
export class UserController {
  constructor(private userDao: UserDao) {}

  @Get()
  findAll() {
    console.log('find all>>>>')
    return this.userDao.findAll()
  }
}