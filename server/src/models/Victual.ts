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
export default class Victual extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    public readonly id!: number;

    @Field()
    @Column({ type: "varchar" })
    public name!: string;

    @Field()
    @Column({ type: "varchar" })
    public describe!: string;

    @Field({ nullable: true })
    @Column({ type: "varchar", nullable: true })
    public avatar?: string;

    @Field()
    @Column({ type: "int" })
    public price!:number;

    @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.id)
    @JoinColumn({ name: "ownerId" })
    @Field((_type) => Restaurant)
    public restaurant!: Restaurant;

    @Field()
    @Column()
    public restaurantId!: number;

}