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
import { FileUpload, GraphQLUpload } from "graphql-upload";
import fs from "fs";
import { createWriteStream } from "fs";
import Victual from "../models/Victual";

import {
    getFileExtension,
    uploadAvatar,
    unlinkAvatar,
} from "../functions/uploadAvatar";
import Rating from "../models/Rating";

const RESTAURANT_PATH = "static_folder/restaurants/avatars/";

async function uploadAvatarRestaurant(id: number, file: FileUpload) {
    const fileName = id + "." + await getFileExtension(file);
    const userAvatarPath = await uploadAvatar(RESTAURANT_PATH + fileName, file);
    return userAvatarPath;
}

async function unlinkRestaurantAvatar(userAvatarPath: string) {
    await unlinkAvatar(userAvatarPath);
}

@InputType()
class CreateRestaurantInput {
    @Field()
    public name!: string;

    @Field()
    public describe!: string;

    @Field(() => GraphQLUpload)
    public avatar!: FileUpload;

    @Field()
    public address!: string;

    @Field()
    public phone!: string;

    @Field({ nullable: true })
    public email?: string;

    @Field()
    public longitude?: number;

    @Field()
    public latitude?: number;
}

@InputType()
class UpdateInfoInput {
    @Field()
    public id!: number;

    @Field({ nullable: true })
    public name?: string;

    @Field({ nullable: true })
    public describe?: string;

    @Field(() => GraphQLUpload, { nullable: true })
    public avatar?: FileUpload;

    @Field({ nullable: true })
    public address?: string;

    @Field({ nullable: true })
    public phone?: string;

    @Field({ nullable: true })
    public email?: string;

    @Field({ nullable: true })
    public longitude?: number;

    @Field({ nullable: true })
    public latitude?: number;
}

@InputType()
class UpdateAvatarRestaurantInput implements Partial<Restaurant> {}

@InputType()
class FindRestaurantsInput implements Partial<Restaurant> {
    @Field({ nullable: true })
    public id?: number;

    @Field({ nullable: true })
    public name?: string;

    @Field({ nullable: true })
    public ownerId?: number;
}

@Resolver((of) => Restaurant)
export default class RestaurantResolver
    implements ResolverInterface<Restaurant>
{
    @FieldResolver(() => User)
    public async owner(@Root() restaurant: Restaurant): Promise<User> {
        return await User.findOneOrFail({ id: restaurant.ownerId });
    }

    @FieldResolver(() => [Victual])
    public async victuals(@Root() restaurant: Restaurant): Promise<Victual[]> {
        return await Victual.find({ restaurantId: restaurant.id });
    }

    @FieldResolver(() => [Rating])
    public async ratings(@Root() restaurant: Restaurant): Promise<Rating[]> {
        return await Rating.find({ restaurantId: restaurant.id });
    }

    @Query(() => [Restaurant])
    public async findRestaurants(
        @Arg("data") inputData: FindRestaurantsInput
    ): Promise<Restaurant[]> {
        const res = await Restaurant.find({ ...inputData });
        return res;
    }



    @Mutation(() => Restaurant)
    public async createRestaurant(
        @Arg("data") inputData: CreateRestaurantInput,
        @Ctx() context: ContextProps
    ): Promise<Restaurant> {
        const user = await requireLogin(context);

        const { avatar, ...infoData } = inputData;

        const newRestaurant = await Restaurant.create({
            ...infoData,
            owner: user,
        }).save();

        const path = await uploadAvatarRestaurant(newRestaurant.id, avatar);
        newRestaurant.avatar = path;
        await newRestaurant.save();

        return newRestaurant;
    }

    @Mutation(() => Restaurant)
    public async updateInfoRestaurant(
        @Arg("data") inputData: UpdateInfoInput,
        @Ctx() context: ContextProps
    ): Promise<Restaurant> {
        const user = await requireLogin(context);
        const { avatar, id, ...textInput } = inputData;
        const restaurant = await Restaurant.findOneOrFail({
            id: id,
            ownerId: user.id,
        });

        if (avatar && restaurant.avatar) {
            await unlinkRestaurantAvatar(restaurant.avatar);
            const path = await uploadAvatarRestaurant(restaurant.id, avatar);
            restaurant.avatar = path;
            restaurant.save();
        }

        await Restaurant.update({ id: id, ownerId: user.id }, { ...textInput });
        await restaurant.reload();

        return restaurant;
    }

    @Mutation(() => Boolean)
    public async deleteRestaurant(
        @Arg("id") id: number,
        @Ctx() context: ContextProps
    ): Promise<Boolean> {
        const user = await requireLogin(context);
        const restaurant = await Restaurant.findOneOrFail({
            id,
            ownerId: user.id,
        });
        await restaurant.remove();
        return true;
    }
}
