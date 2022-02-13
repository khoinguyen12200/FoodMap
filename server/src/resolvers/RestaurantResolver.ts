import {
    Arg,
    Mutation,
    Query,
    Resolver,
    Ctx,
    UseMiddleware,
    ResolverInterface,
    FieldResolver,
    Root,
    InputType,
    Field,
    ObjectType,
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getCustomRepository } from "typeorm";

import User from "../models/User";
import { sign } from "../functions/jsonwebtoken";
import Restaurant from "../models/Restaurant";

import requireLogin from "../functions/requireLogin";

@InputType()
class CreateRestaurantInput implements Partial<Restaurant> {
    @Field()
    public name!: string;

    @Field()
    public describe!: string;

    @Field({ nullable: true })
    public avatar?: string;

    @Field()
    public address!: string;

    @Field()
    public phone!: string;

    @Field({ nullable: true })
    public email?: string;

    @Field({ nullable: true })
    public openTime?: Date;

    @Field({ nullable: true })
    public closeTime?: Date;

    @Field({ nullable: true })
    public openDays!: string;

    @Field({ nullable: true })
    public isOpen!: boolean;

    @Field()
    public longitude?: number;

    @Field()
    public latitude?: number;
}

@InputType()
class UpdateInfoInput implements Partial<Restaurant> {
    @Field()
    public id!: number;

    @Field()
    public name!: string;

    @Field()
    public describe!: string;

    @Field()
    public address!: string;

    @Field()
    public phone!: string;

    @Field({ nullable: true })
    public email?: string;

    @Field({ nullable: true })
    public openTime?: Date;

    @Field({ nullable: true })
    public closeTime?: Date;

    @Field({ nullable: true })
    public openDays!: string;

    @Field({ nullable: true })
    public isOpen!: boolean;

    @Field()
    public longitude?: number;

    @Field()
    public latitude?: number;
}

@InputType()
class UpdateAvatarRestaurantInput implements Partial<Restaurant> {

}

@Resolver((of) => Restaurant)
export default class RestaurantResolver
    implements ResolverInterface<Restaurant>
{
    @FieldResolver(() => User)
    public async owner(@Root() restaurant: Restaurant): Promise<User> {
        return await User.findOneOrFail({ id: restaurant.ownerId });
    }

    @Query(() => [Restaurant])
    public async find(): Promise<Restaurant[]> {
        return await Restaurant.find();
    }

    @Mutation(() => Restaurant)
    public async createRestaurant(
        @Arg("data") inputData: CreateRestaurantInput,
        @Ctx() context: ContextProps
    ): Promise<Restaurant> {
        const user = await requireLogin(context);
        const newRestaurant = await Restaurant.create({
            ...inputData,
            owner: user,
        }).save();

        return newRestaurant;
    }

    @Mutation(() => Restaurant)
    public async updateInfoRestaurant(
        @Arg("data") inputData: UpdateInfoInput,
        @Ctx() context: ContextProps
    ): Promise<Restaurant> {
        const user = await requireLogin(context);
        const restaurant = await Restaurant.findOneOrFail({
            id: inputData.id,
            ownerId: user.id,
        });

        await Restaurant.update(inputData.id,{ ...inputData })
        await restaurant.reload();
        return restaurant;
    }

    @Mutation(() => Restaurant)
    public async deleteRestaurant(
        @Arg("id") id: number,
        @Ctx() context: ContextProps
    ): Promise<void>{
        const user = await requireLogin(context);
        const restaurant = await Restaurant.findOneOrFail({
            id,
            ownerId: user.id,
        });
        await restaurant.remove();
    }
}
