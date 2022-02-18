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
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getCustomRepository } from "typeorm";
import { createWriteStream } from "fs";

import User from "../models/User";
import { sign } from "../functions/jsonwebtoken";
import requireLogin from "../functions/requireLogin";

const USER_AVATAR_PATH = "static_folder/users/avatars/";
const RELATIVE_AVATAR_PATH = "./"+USER_AVATAR_PATH;

// Mutation Login
@InputType()
class RegisterInput {
    @Field()
    public account!: string;

    @Field()
    public password!: string;

    @Field()
    public name!: string;

    @Field(() => GraphQLUpload)
    public file!: FileUpload;
}

@InputType()
class UpdateUserInfoInput implements Partial<User> {
    @Field()
    public name!: string;
}

@InputType()
class UpdatePassword {
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

@Resolver((of) => User)
export default class UserResolver implements ResolverInterface<User> {
    @FieldResolver()
    public password() {
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

        const token = sign(user.id + "");
        const result = { token, user };
        return result;
    }

    @Mutation(() => User)
    public async register(
        @Arg("data") inputData: RegisterInput
    ): Promise<User> {
        const { file, ...userProps } = inputData;

        const user = await User.create({ ...userProps }).save();

        const fileData = await file;
        const fileType = fileData.filename.split(".")[1];
        const fileName = user.id + "." + fileType;

        const userAvatarPath = `${USER_AVATAR_PATH}${fileName}`;
        const relativeAvatarPath = `${RELATIVE_AVATAR_PATH}${fileName}`;

        await new Promise<void>((resolve, reject) => {
            fileData
                .createReadStream()
                .pipe(createWriteStream(relativeAvatarPath))
                .on("finish", () => resolve())
                .on("error", () => reject());
        });

        user.avatar = userAvatarPath;

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

        if (inputData.old !== user.password) {
            throw new Error("Mật khẩu cũ không chính xác");
        }

        user.password = inputData.new;
        await user.save();

        return user;
    }
}
