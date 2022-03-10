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
import Review from "./Review";



@ObjectType()
@Entity()
export default class Comment extends BaseEntity {
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


    @ManyToOne(() => Review, (review: Review) => review.id,{ onDelete: "CASCADE" })
    @JoinColumn({ name: "reviewId" })
    @Field((_type) => User)
    public review!: Review;

    @Field()
    @Column()
    public reviewId!: number;

    @Field()
    @Column()
    public text!: string;

}