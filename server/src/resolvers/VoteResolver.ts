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
import Comment from "../models/Comment";
import Vote from "../models/Vote";

@InputType()
class CreateVoteInput {
    @Field()
    reviewId!: number;

    @Field()
    value!: number;
}

@Resolver((of) => Vote)
export default class VoteResolver implements ResolverInterface<Vote> {
    @FieldResolver((_type) => User)
    public async user(@Root() vote: Vote): Promise<User> {
        return await User.findOneOrFail(vote.userId);
    }

    @FieldResolver((_type) => Review)
    public async review(@Root() vote: Vote): Promise<Review> {
        return await Review.findOneOrFail(vote.reviewId);
    }

    @Mutation(() => Vote)
    public async createVote(
        @Arg("data") inputData: CreateVoteInput,
        @Ctx() context: ContextProps
    ): Promise<Vote> {
        const { reviewId, value } = inputData;
        const user = await requireLogin(context);

        const currentVote = await Vote.findOne({
            reviewId: reviewId,
            userId: user.id,
        });

        if (currentVote) {
            currentVote.value = value;
            await currentVote.save();
            return currentVote;
        } else {
            const vote = new Vote();
            vote.userId = user.id;
            vote.reviewId = reviewId;
            vote.value = value;
            await vote.save();
            return vote;
        }
    }

    @Mutation(() => Boolean)
    public async deleteVote(
        @Arg("reviewId") reviewId: number,
        @Ctx() context: ContextProps
    ): Promise<boolean> {
        const user = await requireLogin(context);
        const vote = await Vote.findOne({
            reviewId: reviewId,
            userId: user.id,
        });

        if (vote) {
            await vote.remove();
            return true;
        } else {
            return false;
        }
    }
}
