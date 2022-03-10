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

import { FileUpload, GraphQLUpload } from "graphql-upload";
import fs from "fs";
import { createWriteStream } from "fs";
import {
    getFileExtension,
    uploadAvatar,
    unlinkAvatar,
} from "../functions/uploadAvatar";
import Review from "../models/Review";
import Comment from '../models/Comment'
import Vote from "../models/Vote";

@InputType()
class ReviewInput {
    @Field()
    public text!: string;

    @Field()
    public title!: string;
}

@InputType()
class ReviewUpdateInput{
    @Field()
    public text!: string;

    @Field()
    public id!: number;

}

@Resolver((of) => Review)
export default class ReviewResolver implements ResolverInterface<Review> {

    @FieldResolver((_type) => User)
    public async user(@Root() review: Review): Promise<User> {
        return await User.findOneOrFail(review.userId)
    }

    @FieldResolver((_type) =>[Comment])
    public async comments(@Root() review: Review): Promise<Comment[]> {
        return await Comment.find({ reviewId: review.id });
    }

    @FieldResolver((_type) => [Vote])
    public async votes(@Root() review: Review): Promise<Vote[]> {
        return await Vote.find({ reviewId: review.id });
    }

    @Query(()=>[Review])
    public async reviews(@Ctx() context: ContextProps): Promise<Review[]> {
        return await Review.find();
    }

    @Query(()=>Review)
    public async review(@Arg("id") id: number): Promise<Review> {
        return await Review.findOneOrFail(id);
    }

    @Mutation(() => Review)
    public async createReview(
        @Arg("data") inputData: ReviewInput,
        @Ctx() context: ContextProps
    ): Promise<Review> {
        const user = await requireLogin(context);
        const { text,title } = inputData;
        const review = new Review();
        review.text = text;
        review.user = user;
        review.title = title;
        await review.save();
        return review;
    }

    @Mutation(() => Review)
    public async updateReview(
        @Arg("data") inputData: ReviewUpdateInput,
        @Ctx() context: ContextProps
    ): Promise<Review> {
        const user = await requireLogin(context);
        const { text } = inputData;
        const review = await Review.findOneOrFail({id:inputData.id,userId:user.id});
        review.text = text;
        await review.save();
        return review;
    }
    
    @Mutation(() => Boolean)
    public async deleteReview(
        @Arg("id") id: number,
        @Ctx() context: ContextProps
    ): Promise<boolean> {
        const user = await requireLogin(context);
        const review = await Review.findOneOrFail({id:id,userId:user.id});
        await review.remove();
        return true;
    }
}
