import { Injectable } from '@nestjs/common';
import { Message } from '@zondagschoolapp/api-interfaces';
import { User } from '../models/user.model';

@Injectable()

export class UserService {
 
    users: User[] = [
        {
            id: "0",
            username: "daanvdm",
            email: "daanvdm@hotmail.com"
        },
        {
            id: "1",
            username: "petervdm",
            email: "petervdm@hotmail.com"
        }
    ]

    getAllUsers(): User[] {
        return this.users;
    }

}