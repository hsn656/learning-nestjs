import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@serialize(UserDto)
@Controller('auth')
export class UsersController {

    constructor(private readonly userService:UsersService){}

    @Post("signup")
    async createUser(@Body() body:CreateUserDto){
        return await this.userService.create(body.email,body.password);
    }
    
    @Get("users")
    async findAll(){
        return await this.userService.findAll();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get("users/:id")
    async findOne(id:number){
        return await this.userService.findOne(id);
    }

    @Patch("users/:id")
    async update(@Param("id") id:number,@Body() partialUser:UpdateUserDto){
        return await this.userService.update(id,partialUser);
    }

    @Delete("users/:id")
    async remove(@Param("id") id:number){
        return await this.userService.remove(id);
    }
}
