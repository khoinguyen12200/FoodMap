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
import fs from 'fs'
import { createWriteStream } from "fs";
import {getFileExtension,uploadAvatar,unlinkAvatar } from "../functions/uploadAvatar";



const VICTUAL_PATH = "static_folder/victuals/avatars/";
async function uploadAvatarVictual(id: number, file: FileUpload) {
    const fileName = id + "." + await getFileExtension(file);
    const userAvatarPath = await uploadAvatar(VICTUAL_PATH + fileName, file);
    return userAvatarPath;
}



@InputType()
class CreateVictualInput {
    @Field()
    public name!: string;

    @Field()
    public describe!: string;

    @Field(() => GraphQLUpload)
    public avatar!: FileUpload;

    @Field()
    public price!: number;

    @Field()
    public restaurantId!: number;
}

@InputType()
class UpdateVictualInput{
    @Field()
    public id!: number;

    @Field({nullable:true})
    public name?: string;

    @Field({nullable:true})
    public describe?: string;

    @Field({nullable:true})
    public price?: number;

    @Field(() => GraphQLUpload,{nullable:true})
    public avatar?: FileUpload;
}

@Resolver((of) => Victual)
export default class VictualResolver implements ResolverInterface<Victual> {
    @FieldResolver()
    public async restaurant(@Root() victual: Victual): Promise<Restaurant> {
        return await Restaurant.findOneOrFail({ id: victual.restaurantId });
    }

    @Query(() => [Victual])
    public async findVictuals(@Arg("restaurantId") restaurantId: number) {
        return await Victual.find({
            restaurantId: restaurantId,
        });
    }

    @Mutation(() => Victual)
    public async createVictual(
        @Arg("data") inputData: CreateVictualInput,
        @Ctx() context: ContextProps
    ): Promise<Victual> {
        const user = await requireLogin(context);
        await Restaurant.findOneOrFail({
            id: inputData.restaurantId,
            ownerId: user.id,
        });

        const {avatar,...textData} = inputData;
        const victual = await Victual.create({ ...textData }).save();

        const userAvatarPath = await uploadAvatarVictual(victual.id, avatar);
        victual.avatar = userAvatarPath
        await victual.save();

        return victual;
    }

    @Mutation(() => Victual)
    public async updateVictual(
        @Arg("data") inputData: UpdateVictualInput,
        @Ctx() context: ContextProps
    ): Promise<Victual> {
        const user = await requireLogin(context);
        const victual = await Victual.findOneOrFail({
            id: inputData.id,
        });
        if (!victual) {
            throw new Error("Không tìm thấy món ăn");
        }

        await Restaurant.findOneOrFail({
            id: victual.restaurantId,
            ownerId: user.id,
        });

        const {avatar,id,...textData} = inputData;
        await Victual.update({id:id}, {...textData});
        await victual.reload();
        victual.save()

        if(avatar){
            await unlinkAvatar(victual.avatar || "")
            const userAvatarPath = await uploadAvatarVictual(victual.id, avatar);
            victual.avatar = userAvatarPath
            await victual.save();
        }
        return victual;
    }

    @Mutation(() => Boolean)
    public async deleteVictual(
        @Arg("id") id: number,
        @Ctx() context: ContextProps
    ): Promise<Boolean> {
        const user = await requireLogin(context);
        const victual = await Victual.findOneOrFail({
            id: id,
        });
        if (!victual) {
            throw new Error("Không tìm thấy món ăn");
        }

        const restaurant = await Restaurant.findOneOrFail({
            id: victual.restaurantId,
            ownerId: user.id,
        });
        if(victual.avatar)
            await unlinkAvatar(victual.avatar)
        await victual.remove();

        return true;
    }
}
