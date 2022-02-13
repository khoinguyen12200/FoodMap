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
import requireLogin from "../functions/requireLogin";

// Mutation Login
@InputType()
class RegisterInput implements Partial<User> {
    @Field()
    public account!: string;

    @Field()
    public password!: string;

    @Field()
    public name!: string;

    @Field({nullable:true})
    public avatar?: string;

}

@InputType()
class UpdateUserInfoInput implements Partial<User> {
    @Field()
    public name!: string;
}


@InputType()
class UpdatePassword{
    @Field()
    public old!: string;

    @Field()
    public new!: string;

}



@InputType()
class LoginInput implements Partial<User> {
    @Field()
    public account!: string;

    @Field()
    public password!: string;
}
@ObjectType()
class ReturnLoginValue {
    @Field()
    public token!: string;

    @Field()
    public user!: User;
}

@Resolver(of=>User)
export default class UserResolver implements ResolverInterface<User>  {
    
    @FieldResolver()
    public password(){
        return "";
    }

    @Query(() => ReturnLoginValue)
    public async login(
        @Arg("data") inputData: LoginInput
    ): Promise<ReturnLoginValue> {
        const { account, password } = inputData;

        const user = await User.findOne({ account, password });

        if (!user) {
            throw new Error("Thông tin không chính xác");
        }

        const token = sign(user.id+"");
        const result = {token,user}
        return result;
    }

    @Mutation(() => User)
    public async register(
        @Arg("data") inputData: RegisterInput
    ): Promise<User> {
        const user = await User.create(inputData).save();

        await user.save();

        return user;
    }

    @Mutation(() => User)
    public async updateUserInfo(
        @Arg("data") inputData: UpdateUserInfoInput,
        @Ctx() context: ContextProps
    ): Promise<User> {
        const user = await requireLogin(context);

        if (!user) {
            throw new Error("Bạn chưa đăng nhập");
        }

        user.name = inputData.name;
        await user.save();

        return user;
    }

    @Mutation(() => User)
    public async updatePassword(
        @Arg("data") inputData: UpdatePassword,
        @Ctx() context: ContextProps
    ): Promise<User> {
        const user = await requireLogin(context);

        if (!user) {
            throw new Error("Bạn chưa đăng nhập");
        }

        if(inputData.old !== user.password){
            throw new Error("Mật khẩu cũ không chính xác");
        }

        user.password = inputData.new;
        await user.save();

        return user;
    }

}
