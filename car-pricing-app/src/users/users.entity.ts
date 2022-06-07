import { Report } from "src/reports/reports.entity";
import { AfterInsert, AfterUpdate, BeforeRemove, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToMany(()=>Report, report=>report.user)
    reports:Report[];

    @AfterInsert()
    logInsert(){
        console.log("inserted user with id",this.id);
    }

    @AfterUpdate()
    logUpdate(){
        console.log("updated user with id",this.id);
    }

    @BeforeRemove()
    logRemove(){
        console.log("Removed user with id",this.id);
    }
}