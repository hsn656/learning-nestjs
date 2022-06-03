import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
    
@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly repo:Repository<User>){}
    async create(email:string,password:string){
        const user=this.repo.create({email,password})
        return await this.repo.save(user);
    }

    async findAll(){
        return await this.repo.find();
    }

    async findOne(id:number){
        const user = await this.repo.findOneBy({id});
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update (id:number,partialUser:Partial<User>){
        const user = await this.findOne(id);
        Object.assign(user,partialUser);
        return await this.repo.save(user);
    }

    async remove(id:number){
        const user = await this.findOne(id);
        return await this.repo.remove(user);
    }
}
