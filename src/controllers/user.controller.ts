import { UserLogin } from '@/types/account'
import { Controller, Get, Post, Query, Param, Body, Session, UsePipes } from '@nestjs/common'
import { UserDao } from '@/daos/user'

@Controller('user')
export class UserController {
  constructor(private userDao: UserDao) {}

  @Get()
  findAll() {
    return this.userDao.findAll()
  }
}
