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
class CreateCommentInput {
    @Field()
    reviewId!: number;

    @Field()
    text!: string;
}

@Resolver((of) => Comment)
export default class CommentResolver implements ResolverInterface<Comment> {

    @FieldResolver((_type) => User)
    public async user(@Root() comment: Comment): Promise<User> {
        return await User.findOneOrFail(comment.userId);
    }

    @FieldResolver((_type) => Review)
    public async review(@Root() comment: Comment): Promise<Review> {
        return await Review.findOneOrFail(comment.reviewId);
    }

    @Mutation(() => Comment)
    public async createComment(
        @Arg("data") inputData: CreateCommentInput,
        @Ctx() context: ContextProps
    ): Promise<Comment> {
        const { reviewId, text } = inputData;
        const user = await requireLogin(context);
        const comment = new Comment();
        comment.userId = user.id;
        comment.reviewId = reviewId;
        comment.text = text;
        await comment.save();
        return comment;
    }

    @Mutation(() => Boolean)
    public async deleteComment(
        @Arg("id") id: number,
        @Ctx() context: ContextProps
    ): Promise<boolean> {
        const user = await requireLogin(context);
        const comment = await Comment.findOneOrFail(id);
        if (comment.userId === user.id) {
            await comment.remove();
            return true;
        }
        return false;
    }

}