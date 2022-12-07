import { Controller, Get } from '@nestjs/common';
import { Message } from '@zondagschoolapp/api-interfaces';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  defaultRoute() {
    return 'Welcome to the zondagschool api';
  }

}
