import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    ObjectIdColumn,
    OneToMany,
    BaseEntity,
} from "typeorm";

import { Field, ObjectType } from "type-graphql";
import Restaurant from "./Restaurant";



@ObjectType()
@Entity()
@Unique(["account"])
export default class User extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    public readonly id!: number;

    
    @Field()
    @Column({ type: "varchar" })
    public account!: string;


    @Field()
    @Column({ type: "varchar" })
    public password!: string;

    @Field()
    @Column({ type: "varchar" })
    public name!: string;


    @Field({nullable:true})
    @Column({ type: "varchar",nullable:true })
    public avatar?:string;

    @Field((_type) =>[Restaurant])
    @OneToMany(()=>Restaurant,(restaurant:Restaurant)=> restaurant.owner)
    public restaurants?:Restaurant[];

    @Field({nullable:true})
    @Column({ type: "varchar",nullable:true })
    public email?:string;

    @Field({nullable:true})
    @Column({ type: "varchar",nullable:true })
    public address?:string;

    @Field({nullable:true})
    @Column({ type: "varchar",nullable:true })
    public phone?:string;

}
