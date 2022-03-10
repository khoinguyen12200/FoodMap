import { buildSchema } from "type-graphql";
import { NonEmptyArray } from "type-graphql";
import CommentResolver from "./CommentResolver";
import RatingResolver from "./RatingResolver";
import RestaurantResolver from "./RestaurantResolver";
import ReviewResolver from "./ReviewResolver";

import UserResolver from "./UserResolver";
import VictualResolver from "./VictualResolver";
import VoteResolver from "./VoteResolver";

const resolvers: NonEmptyArray<Function> = [
    UserResolver,
    RestaurantResolver,
    VictualResolver,
    RatingResolver,
    CommentResolver,
    VoteResolver,
    ReviewResolver,
];
export default resolvers;
