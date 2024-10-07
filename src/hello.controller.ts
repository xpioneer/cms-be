import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  
  @Get()
  getHello() {
    return 'Hello World!';
  }
}