import { Expose, Transform } from "class-transformer";

export class ReportDto{
    @Expose()
    id:number;

    @Expose()
    price:number;

    @Expose()
    year:number;

    @Expose()
    madeBy:string;

    @Expose()
    lng:number;

    @Expose()
    lat:number;

    @Expose()
    model:string;

    @Expose()
    mileage:number;

    @Expose()
    @Transform(({obj})=>obj.user.id)
    userId:number;

    @Expose()
    @Transform(({obj})=>obj.user.email)
    userEmail:string;
}