import { useQuery } from "@apollo/client";
import React, { useMemo } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsPinMapFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import schema from "./schema";

type Props = {};

function ListRestaurant({}: Props) {
    const resultRestaurants = useQuery(schema.findRestaurants, {
        variables: {
            data: {},
        },
        fetchPolicy: "no-cache",
    });
    const restaurants: Restaurant[] = useMemo(() => {
        let arr: Array<Restaurant> = [];
        if (resultRestaurants.data) {
            arr = arr.concat(resultRestaurants.data.findRestaurants);
        }
        arr = arr.slice(0, 10);
        arr.sort((a, b) =>(b.id-a.id))
        return arr;
    }, [resultRestaurants]);

    return (
        <div className="ListRestaurant">
            <div className="header">Địa điểm mới</div>
            <div className="listContent">
                {restaurants.map((restaurant, index) => (
                    <Restaurant restaurant={restaurant} key={restaurant.id} />
                ))}
            </div>
        </div>
    );
}

function Restaurant({ restaurant }: { restaurant: Restaurant }) {
    return (
        <Link to={`/visit/restaurant/${restaurant.id}`} className="restaurantItem">
            <div className="avatar">
                <img
                    src={
                        process.env.REACT_APP_SERVER_ENDPOINT +
                        restaurant.avatar
                    }
                    alt="avatar"
                />
            </div>
            <div className="info">
                <div className="name">
                    <AiFillHome />
                    {restaurant.name}
                </div>
                <div className="address">
                    <BsPinMapFill />
                    {restaurant.address}
                </div>
            </div>
        </Link>
    );
}

export default ListRestaurant;
