import { createParamDecorator, ExecutionContext } from "@nestjs/common";

//a decorator can't use dependency injection
//so we need to add interceptor to handle insert user in request

export const CurrentUser=createParamDecorator(
    (data:never,req:ExecutionContext )=>{
        return req.switchToHttp().getRequest().user;
    }
);