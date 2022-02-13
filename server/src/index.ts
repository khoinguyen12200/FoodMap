import "reflect-metadata";
import { Container } from 'typeorm-typedi-extensions';
import * as TypeORM from "typeorm";
import { ApolloServer } from "apollo-server-express";
import express, { Request, Response } from "express";
import cors from "cors";
import CookieParser from "cookie-parser";
import { verify } from "./functions/jsonwebtoken";
import { buildSchema } from "type-graphql";
import resolvers from './resolvers'
import User from "./models/User";

require('dotenv').config()
const port = process.env.PORT || 4000;

declare global {
    interface ContextProps {
        userId?: number;
        user?:User;
        req: Request;
        res: Response;
    }
}

TypeORM.useContainer(Container);

async function appRun() {
    try {
        await TypeORM.createConnection();
        const schema = await buildSchema({
            container: Container,
            resolvers: resolvers,
        });

        const app = express();
        const corsConfig = {
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            credentials: true,
            // origin: ["localhost","studio.apollographql.com"],
        };

        app.use(cors(corsConfig));
        app.use(CookieParser());

        function contextMiddleware({
            req,
            res,
        }: {
            req: Request;
            res: Response;
        }): ContextProps {
            var userId = undefined;
            const auth = req.headers.authorization;
            if (auth) {
                const id = verify(auth);
                if (id) {
                    userId = id;
                }
            }
            return { userId, req, res };
        }

        // Create GraphQL server
        const server = new ApolloServer({
            schema,
            context: contextMiddleware,
            debug: true,
        });
        await server.start();
        server.applyMiddleware({ app });
        server.applyMiddleware({ app, cors: corsConfig });
        app.listen({ port }, () => {
            console.log(
                `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
            );
        });
    } catch (e: any) {
        console.log(e);
    }
}

appRun();
