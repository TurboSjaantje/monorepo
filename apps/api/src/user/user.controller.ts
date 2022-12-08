import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { InjectToken, Token } from '../auth/token.decorator';
import { verify } from 'jsonwebtoken';
import { Headers } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { TeacherGuard } from '../auth/teacher.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':email')
  getUserById(@Param('email') email: string): Promise<User> {
    return this.userService.getById(email);
  }

  @Post('/admin')
  @UseGuards(AdminGuard)
  sayHi2() {
    return 'hi2';
  }

  @Post('/teacher')
  @UseGuards(TeacherGuard)
  sayHi() {
    return 'hi';
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() user: User) {
    return this.userService.addUser(user);
  }

  @Put(':email')
  updateUser(@Param('email') email: string, @Body() user: User): Promise<User> {
    return this.userService.updateUser(email, user);
  }

  @Delete(':email')
  deleteUser(@Param('email') email: string): Promise<User> {
    return this.userService.deleteUser(email);
  }
}
