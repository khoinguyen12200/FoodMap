import { buildSchema } from "type-graphql";
import {NonEmptyArray} from 'type-graphql'
import RatingResolver from "./RatingResolver";
import RestaurantResolver from "./RestaurantResolver";

import UserResolver from './UserResolver'
import VictualResolver from "./VictualResolver";



const resolvers : NonEmptyArray<Function> = [UserResolver,RestaurantResolver,VictualResolver,RatingResolver]
export default resolvers