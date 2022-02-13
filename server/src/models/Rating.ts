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



@ObjectType()
@Entity()
export default class Rating extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    public readonly id!: number;

    @Field()
    @Column({ type: "varchar" })
    public comment!: string;

    @Field()
    @Column({ type: "int" })
    public star!: number;

    @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.id)
    @JoinColumn({ name: "ownerId" })
    @Field((_type) => Restaurant)
    public restaurant!: Restaurant;

    @Field()
    @Column()
    public restaurantId!: number;


    @ManyToOne(() => User, (user: User) => user.id)
    @JoinColumn({ name: "userId" })
    @Field((_type) => User)
    public user!: User;

    @Field()
    @Column()
    public userId!: number;


}