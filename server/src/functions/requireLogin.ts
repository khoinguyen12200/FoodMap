import { MiddlewareFn } from "type-graphql";
import { Request, Response } from "express";
import User from "../models/User";


const requireLogin = async (context:ContextProps) => {
    if (context.userId === undefined) {
        throw new Error("Phiên đăng nhập đã hết hạn")
    }    
    return await User.findOneOrFail(context.userId);
};


export default requireLogin;