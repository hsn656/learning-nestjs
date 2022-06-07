import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    price:number;

    @Column()
    madeBy:string;

    @Column()
    model:string;

    @Column()
    year:number;

    @Column()
    lat:number;

    @Column()
    lng:number;

    @Column()
    mileage:number;

    @ManyToOne(()=>User, user=>user.reports)
    user:User;

}