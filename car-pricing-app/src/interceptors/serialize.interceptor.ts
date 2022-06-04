import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import {plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

export function serialize(dto:any){
    return UseInterceptors(new SerializerInterceptor(dto))
}

export class SerializerInterceptor implements NestInterceptor{

    constructor(private readonly dto:any){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
                
        return next.handle().pipe(
            map((data)=>{
                return plainToInstance(this.dto,data,{
                    excludeExtraneousValues:true
                })
            })
        )
    }
}
