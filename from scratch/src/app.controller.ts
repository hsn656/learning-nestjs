import { Controller,Get } from "@nestjs/common";

@Controller()
export class AppController {
    constructor() {}

    @Get()
    getRootRoute(){
        return "hi there!";
    }
}