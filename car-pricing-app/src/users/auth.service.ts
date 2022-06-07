import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { generateSalt,hashPassword,comparePassword } from './lib/securePassword';

import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';


const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private readonly usersService:UsersService) {}

    async signup(email:string,password:string){
        const users = await this.usersService.findByEmail(email);
        if(users.length){
            throw new BadRequestException('User already exists');
        }

        const salt = generateSalt();
        const hashedPassword = await hashPassword(password,salt);

        const user = await this.usersService.create(email,hashedPassword);

        return user;
    }

    async signin(email:string,password:string){
        const [user] = await this.usersService.findByEmail(email);
        if(!user){
            throw new BadRequestException('User does not exist');
        }

        const isValid = await comparePassword(password,user.password);

        if(!isValid){
            throw new BadRequestException('Invalid password');
        }

        return user;
    }
}
