import { UserLogin } from '@/types/account';
import { Controller, Get, Post, Query, Param, Body, Session } from '@nestjs/common';

@Controller('account')
export class AccountController {

  @Get('test')
  test() {
    return 'this is test account....';
  }

  @Post('test/:id')
  logout(@Body('remember') data: boolean, @Param('id') param: any) {
    console.log(data, '>>>logout', param)
    return 'logout success'
  }

  @Post('login')
  login(@Body() data: UserLogin, @Query() param: any) {
    console.log(data, '>>>login', param)
    return 123
  }
}