import { useQuery } from "@apollo/client";
import { Carousel } from "antd";
import React, { useMemo } from "react";

import { AiFillHome, AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { BsPinMapFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import schema from "./schema";

type Props = {};

function ListRestaurant({}: Props) {
    const ref = React.useRef<any>(null);
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
        arr.sort((a, b) => b.id - a.id);
        return arr;
    }, [resultRestaurants]);

    function next(){
        if(ref && ref.current){
            ref.current.next();
        }
    }
    function prev(){
        if(ref && ref.current){
            ref.current.prev();
        }
    }

    return (
        <div className="ListRestaurant">
            <div className="header">Địa điểm mới</div>
            <div className="listContent">
                <div className="btnSpace">
                    <button onClick={prev} className="myBtn btn1">
                        <AiFillLeftCircle/>
                    </button>
                    <button onClick={next} className="myBtn btn2">
                        <AiFillRightCircle/>
                    </button>
                </div>
                <Carousel ref={ref} slidesToShow={2} arrows={true} autoplay={true} autoplaySpeed={1000}>
                    {restaurants.map((restaurant, index) => (
                        <Restaurant
                            restaurant={restaurant}
                            key={restaurant.id}
                        />
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

function Restaurant({ restaurant }: { restaurant: Restaurant }) {

    return (
        <Link
            to={`/visit/restaurant/${restaurant.id}`}
            className="restaurantItem"
        >
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
