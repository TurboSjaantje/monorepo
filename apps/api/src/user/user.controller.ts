import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';

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

  @Post()
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