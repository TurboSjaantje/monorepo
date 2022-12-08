import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';

import { compare } from 'bcrypt';
import { JwtPayload, verify, sign } from "jsonwebtoken";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async generateToken(email: string, password: string): Promise<string> {
        const filter = { emailaddress: email }
        const identity = await this.userModel.findOne(filter);

        // let userRole;
        // for (let role of identity.roles) {
        //     if (role == 'admin') userRole = role;
        //     else if (role == 'teacher' && userRole != 'admin') userRole = 'teacher';
        // }

        if (!identity || !(await compare(password, identity.password))) throw new Error("user not authorized");

        return new Promise((resolve, reject) => {
            sign({ identity }, "Secret", (err: Error, token: string) => {
                if (err) {
                    console.log(err)
                    reject(err);
                }
                else resolve(token);
            })
        });
    }
}
