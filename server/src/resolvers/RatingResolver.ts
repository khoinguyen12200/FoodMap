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
import Victual from "../models/Victual";
import Rating from "../models/Rating";

@InputType()
class RateInput implements Partial<Victual> {
    @Field()
    public star!: number;

    @Field()
    public comment!: string;

    @Field()
    public restaurantId!: number;
}

@InputType()
class UpdateRatingInput implements Partial<Victual> {
    @Field()
    public star!: number;

    @Field()
    public comment!: string;

    @Field()
    public id!: number;
}

@Resolver((of) => Rating)
export default class VictualResolver implements ResolverInterface<Rating> {
    @FieldResolver()
    public async restaurant(@Root() rating: Rating): Promise<Restaurant> {
        return await Restaurant.findOneOrFail({ id: rating.restaurantId });
    }

    @FieldResolver()
    public async user(@Root() rating: Rating): Promise<User> {
        return await User.findOneOrFail({ id: rating.userId });
    }

    @Query(()=>[Rating])
    public async getRatings(
        @Arg("restaurantId") restaurantId: number
    ):Promise<Rating[]> {
        return await Rating.find({restaurantId});
    }


    @Mutation(() => Rating)
    public async rateRestaurant(
        @Arg("data") inputData: RateInput,
        @Ctx() context: ContextProps
    ): Promise<Rating> {
        const user = await requireLogin(context);
        if (!user) {
            throw new Error("Bạn chưa đăng nhập");
        }
        const available = await Rating.find({
            restaurantId: inputData.restaurantId,
            userId: user.id,
        })
        if (available.length > 0) {
            throw new Error("Bạn đã đánh giá rồi");
        }
        const rating = await Rating.create({ ...inputData, user }).save();

        return rating;
    }

    @Mutation(() => Rating)
    public async updateRating(
        @Arg("data") inputData: UpdateRatingInput,
        @Ctx() context: ContextProps
    ): Promise<Rating> {
        const user = await requireLogin(context);
        if (!user) {
            throw new Error("Bạn chưa đăng nhập");
        }
        const rating = await Rating.findOneOrFail({
            id: inputData.id,
            userId: user.id,
        });
        if (!rating) {
            throw new Error("Bạn không có quyền sửa đánh giá này");
        }
        rating.star = inputData.star;
        rating.comment = inputData.comment;
        await rating.save();
        return rating;
    }

    @Mutation(() => Rating)
    public async deleteRating(
        @Arg("id") id: number,
        @Ctx() context: ContextProps
    ): Promise<void> {
        const user = await requireLogin(context);
        if (!user) {
            throw new Error("Bạn chưa đăng nhập");
        }
        const rating = await Rating.findOneOrFail({ id, userId: user.id });
        if (!rating) {
            throw new Error("Bạn không có quyền xóa đánh giá này");
        }
        await rating.remove();
    }
}
