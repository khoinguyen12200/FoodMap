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
import User from "./User";
import Comment from './Comment'
import Vote from "./Vote";


@ObjectType()
@Entity()
export default class Review extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    public readonly id!: number;

    @ManyToOne(() => User, (user: User) => user.id)
    @JoinColumn({ name: "userId" })
    @Field((_type) => User)
    public user!: User;

    @Field()
    @Column()
    public userId!: number;

    
    @Field()
    @Column()
    public title!: string;

    @Field()
    @Column({type:"longtext"})
    public text!: string;

    @Field((_type) =>[Comment])
    @OneToMany(()=>Comment,(comment:Comment)=> comment.id)
    public comments?:Comment[];

    @Field((_type) =>[Vote])
    @OneToMany(()=>Vote,(vote:Vote)=> vote.id)
    public votes?:Vote[];
}