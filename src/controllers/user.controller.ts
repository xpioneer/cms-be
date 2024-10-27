import { UserLogin } from '@/types/account'
import { Controller, Get, Post, Query, Param, Body, Session, UsePipes } from '@nestjs/common'
import { UserDao } from '@/daos/user'

@Controller('user')
export class UserController {
  constructor(private userDao: UserDao) {}

  @Post('login')
  login(@Body() {username, password}: UserLogin) {
    this.userDao.login(username, password)
  }

  @Get()
  findAll() {
    return this.userDao.findAll()
  }
}
