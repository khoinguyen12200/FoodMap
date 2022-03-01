import { useQuery } from "@apollo/client";
import React from "react";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Toast, { toast } from "react-toastify";
import { useAppSelector } from "../../redux";
import CreatePage from "./CreatePage";
import "./Restaurant.scss";
import * as schema from "./schema";

type Props = {};

declare global {
    interface Restaurant {
        id: number;
        name: string;
        address: string;
        phone: string;
        avatar: string;
        describe: string;
        email: string;
        longitude: number;
        latitude: number;
        victuals: Victual[];
        ratings?: Rating[];
    }

    interface Victual {
        id: number;
        name: string;
        describe: string;
        avatar: string;
        price: number;
        restaurantId: number;
        restaurant: Restaurant
    }

    interface Rating{
        id:number;
        comment: string;
        star: number;
        restaurantId: number;
        restaurant?:Restaurant;
        userId: number;
        user?:User;
    }
}



function Restaurant({}: Props) {
    const user = useAppSelector((state) => state.myAccount.user);
    const { loading, error, data } = useQuery(schema.findRestaurants, {
        variables: {
            data: {
                ownerId: user?.id || -1,
            },
        },
        fetchPolicy: "no-cache",
    });
    React.useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    const restaurants = React.useMemo<Restaurant[]>(
        () => data?.findRestaurants || [],
        [data]
    );

    return (
        <div className="Restaurant">
            <h1 className="PageTitle">Doanh nghiệp của bạn</h1>
            <div className="list">
                {restaurants.map((resta) => (
                    <ListItem restaurant={resta} key={resta.id} />
                ))}
                <div className="noItems">
                    <span>
                        {restaurants.length === 0 &&
                            "Bạn chưa có doanh nghiệp nào ?  "}
                        <Link to="/my-restaurant/create">
                            TẠO DOANH NGHIỆP MỚI
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

function ListItem({ restaurant }: { restaurant: Restaurant }) {
    return (
        <Link
            to={`/my-restaurant/manage/${restaurant.id}`}
            className="listItem"
        >
            <div className="image">
                <img
                    src={
                        process.env.REACT_APP_SERVER_ENDPOINT +
                        restaurant.avatar
                    }
                    alt=""
                    className="img"
                />
            </div>
            <div className="textSpace">
                <h3 className="name">{restaurant.name}</h3>
                <h5 className="address">{restaurant.address}</h5>
                <p className="phone">sdt: {restaurant.phone}</p>
            </div>
        </Link>
    );
}

export default Restaurant;
