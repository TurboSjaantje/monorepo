import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async ensureExists(user: User) {
    try {
      await this.userModel.create(user);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUsers() {
    return this.userModel.find();
  }

  async getById(email: string) {
    const filter = { emailaddress: email }
    return this.userModel.findOne(filter);
  }

  async addUser(user: User) {
    user.password = await this.hashPassword(user.password);
    await this.ensureExists(user);
  }

  async updateUser(email: string, user: User) {
    user.password = await this.hashPassword(user.password);
    const filter = { emailaddress: email };
    let oldUser = await this.userModel.findOneAndUpdate(filter, user, { returnOriginal: true });
    return oldUser;
  }

  async deleteUser(email: string) {
    const filter = { emailaddress: email };
    let deletedUser = await this.userModel.findOneAndDelete(filter);
    return deletedUser;
  }

  async hashPassword(password: string): Promise<string> {
    Logger.log('[UsersController] hashPassword(' + password + ') called');

    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
