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

@InputType()
class CreateVictualInput implements Partial<Victual> {
    @Field()
    public name!: string;

    @Field()
    public describe!: string;

    @Field({ nullable: true })
    public avatar?: string;

    @Field()
    public price!: number;

    @Field()
    public restaurantId!: number;
}

@InputType()
class UpdateVictualInput implements Partial<Victual> {
    @Field()
    public id!: number;

    @Field()
    public name!: string;

    @Field()
    public describe!: string;

    @Field()
    public price!: number;

}

@Resolver((of) => Victual)
export default class VictualResolver implements ResolverInterface<Victual> {
    @FieldResolver()
    public async restaurant(@Root() victual: Victual): Promise<Restaurant> {
        return await Restaurant.findOneOrFail({ id: victual.restaurantId });
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
        const victual = await Victual.create({ ...inputData }).save();

        return victual;
    }

    @Mutation(() => Victual)
    public async updateVictual(
        @Arg("data") inputData: UpdateVictualInput,
        @Ctx() context: ContextProps
    ): Promise<Victual> {
        const user = await requireLogin(context);
        const victual = await Victual.findOneOrFail({
            id: inputData.id
        });
        if (!victual) {
            throw new Error("Không tìm thấy món ăn");
        }

        const restaurant = await Restaurant.findOneOrFail({
            id: victual.restaurantId,
            ownerId: user.id,
        });

        await Restaurant.update(inputData.id,inputData);

        victual.reload();
        return victual;
    }

    @Mutation(() => Victual)
    public async deleteVictual(
        @Arg("id") id: number,
        @Ctx() context: ContextProps
    ): Promise<Victual> {
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

        await victual.remove();

        return victual;
    }
}
