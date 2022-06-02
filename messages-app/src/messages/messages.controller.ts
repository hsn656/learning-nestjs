import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController
{
    @Get()
    listAll(): string[]
    {
        return ["hello", "world"];
    }

    @Get('/:id')
    getOne(@Param("id") id:string): string  
    {
        return id;
    }

    @Post()
    create(@Body() body:CreateMessageDto): string{
        return "msg";
    }
}
