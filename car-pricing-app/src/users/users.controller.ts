import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Session } from '@nestjs/common';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';


@serialize(UserDto)
@Controller('auth')
export class UsersController {

    constructor(
        private readonly userService:UsersService,
        private readonly authService:AuthService
        ){}

    @Post("signup")
    async signup(@Body() body:CreateUserDto,@Session() session){
        const user= await this.authService.signup(body.email,body.password);
        session.userId=user.id;
        return user;
    }

    @Post("signin")
    async sigin(@Body() body:CreateUserDto,@Session() session){
        const user= await this.authService.signin(body.email,body.password);
        session.userId=user.id;
        return user;
    }

    @Get("me")
    async me(@CurrentUser() user:User){
        return user;
    }

    @Get("signout")
    async signout(@Session() session){
        session.userId=null;
    }
    
    @Get("users")
    async findAll(){
        return await this.userService.findAll();
    }

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
