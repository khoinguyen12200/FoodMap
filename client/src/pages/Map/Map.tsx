import React from "react";
import "./Map.scss";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import ReactGoogleMap from "../../components/ReactGoogleMap";
import locationCanTho from "../../constant/defaultCenterCity";
import { useQuery } from "@apollo/client";
import schema from "./schema";
import { actions, useAppDispatch, useAppSelector } from "../../redux";
import getPathAvatar from "../../constant/getPathAvatar";
import StarSelector from "../../components/StarSelector";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import MapView from "./MapView";
import { AiOutlineDoubleLeft } from "react-icons/ai";
type Props = {};

function MapPage({}: Props) {
    const dispatch = useAppDispatch();
    const { data: dataRestaurants, loading } = useQuery(
        schema.findRestaurants,
        {
            variables: {
                data: {},
            },
            fetchPolicy: "no-cache",
        }
    );

    const restaurants: Restaurant[] = React.useMemo(() => {
        return dataRestaurants?.findRestaurants || ([] as Restaurant[]);
    }, [dataRestaurants]);

    React.useEffect(() => {
        dispatch(actions.mapPage.setRestaurants(restaurants));
    }, [restaurants]);

    return (
        <div className="MapPage">
            <LeftNavigation />
            <MapView />
        </div>
    );
}

function LeftNavigation() {
    const navigate = useNavigate();
    function back() {
        navigate(-1);
    }
    const [open,setOpen] = React.useState(true);
    function toggle(){
        setOpen(!open);
    }
    return (
        <div className={`LeftNavigation ${!open && "close"}`}>
            <button onClick={toggle} className="toggleBtn">
                <AiOutlineDoubleLeft />
            </button>
            <div onClick={back} className="backSpace">
                <span className="icon">
                    <BsArrowLeft />
                </span>
                <span className="text">Trở về</span>
            </div>
            <ListRestaurant />
        </div>
    );
}

function ListRestaurant() {
    const { restaurants } = useAppSelector((state) => state.mapPage);
    return (
        <div className="listRestaurants">
            {restaurants.map((restaurant) => (
                <RestaurantItem restaurant={restaurant} />
            ))}
        </div>
    );
}

function RestaurantItem({ restaurant }: { restaurant: Restaurant }) {
    const dispatch = useAppDispatch();
    const star = React.useMemo(() => {
        if (restaurant.ratings) {
            return (
                restaurant.ratings.reduce((prev, rating) => {
                    return prev + rating.star;
                }, 0) / restaurant.ratings.length
            );
        }
        return 0;
    }, [restaurant]);

    function onItemClick(){
        dispatch(actions.mapPage.setSelected(restaurant));
    }
    return (
        <div onClick={onItemClick} className="restaurantItem">
            <div className="headSpace">
                <div className="avatarSpace">
                    <img
                        src={getPathAvatar(restaurant.avatar)}
                        alt="avatar"
                        className="avatar"
                    />
                </div>
                <div className="infoSpace">
                    <div className="nameSpace">{restaurant.name}</div>
                    <StarSelector star={star} />
                </div>
            </div>
        </div>
    );
}

export default MapPage;
