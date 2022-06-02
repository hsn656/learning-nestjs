import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
    create(@Body() body:any): string{
        return body;
    }
}
