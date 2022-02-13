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
import User from "./User";
import Victual from "./Victual";



@ObjectType()
@Entity()
export default class Restaurant extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    public readonly id!: number;

    
    @Field()
    @Column({ type: "varchar" })
    public name!: string;


    @Field()
    @Column({ type: "varchar" })
    public describe!: string;


    @Field({nullable: true})
    @Column({ type: "varchar",nullable: true })
    public avatar?:string;

    @Field()
    @Column({ type: "varchar" })
    public address!: string;

    @Field()
    @Column({ type: "varchar" })
    public phone!: string;

    @Field({nullable: true})
    @Column({ type: "varchar",nullable:true })
    public email?: string;

    @Field({nullable: true})
    @Column({ type: "timestamp",nullable:true  })
    public openTime?: Date;

    @Field({nullable: true})
    @Column({ type: "timestamp",nullable:true  })
    public closeTime?: Date;

    @Field()
    @Column({ type: "varchar",default:"1111111" })
    public openDays!:string;

    @Field()
    @Column({ type: "boolean",default:true })
    public isOpen!: boolean;

    @Field({})
    @Column({ type: "float" })
    public longitude?: number;

    @Field()
    @Column({ type: "float" })
    public latitude?: number;

    @ManyToOne(() => User, (user: User) => user.id)
    @JoinColumn({ name: "ownerId" })
    @Field((_type) => User)
    public owner!: User;

    @Field()
    @Column()
    public ownerId!: number;

    @Field((_type) =>[Victual])
    @OneToMany(()=>Victual,(victual:Victual)=> victual.restaurant)
    public victuals?:Victual[];




}
