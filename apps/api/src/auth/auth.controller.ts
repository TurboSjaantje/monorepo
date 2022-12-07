import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { Credentials } from './auth.schema';
import { AuthService } from './auth.service';
import { Token } from './token.decorator';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) { }

  @Post('login')
  async login(@Body() credentials: Credentials) {
    try {
      let user = await this.userService.getById(credentials.emailaddress);
      return {
        emailaddress: user.emailaddress,
        roles: user.roles,
        token: await this.authService.generateToken(credentials.emailaddress, credentials.password)
      };
    } catch (e) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
