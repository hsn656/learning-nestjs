import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController
{
    constructor(private readonly messagesService: MessagesService){}

    @Get()
    async listAll()
    {
        return await this.messagesService.findAll();
    }

    @Get('/:id')
    async getOne(@Param("id") id:string): Promise<any>  
    {
        const message= await this.messagesService.findOne(id);
        if(!message)
            throw new NotFoundException("message not found");
        return message;
    }

    @Post()
    async create(@Body() body:CreateMessageDto){
        return await this.messagesService.create(body.content);
    }

}
