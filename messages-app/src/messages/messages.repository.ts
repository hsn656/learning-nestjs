import { Injectable } from "@nestjs/common";
import {readFile,writeFile} from "fs/promises";

@Injectable()
export class MessagesRepository {
    async findOne(id:string){
        const messages=await this.#readMessages();
        return messages[id];
    }

    async findAll(){
        const messages=await this.#readMessages();
        return messages;
    }

    async create(content:string){
        const messages=await this.#readMessages();
        const id=Math.floor(Math.random()*9999);
        const message={id,content};
        messages[id]=message;
        await this.#writeMessages(messages);
        return message;
    }

    async #readMessages(){
        const content=await readFile("./messages.json","utf8");
        const messages=JSON.parse(content);
        return messages;
    }

    async #writeMessages(messages:any){
        const content=JSON.stringify(messages);
        await writeFile("./messages.json",content,"utf8");
    }

}