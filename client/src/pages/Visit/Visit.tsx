import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiHomeAlt, BiMoney } from "react-icons/bi";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { GrMailOption } from "react-icons/gr";

import schema from "./schema";
import "./Visit.scss";
import { BsTextarea } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaMapMarkerAlt, FaRegMoneyBillAlt } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useAppSelector } from "../../redux";
import getPathAvatar from "../../constant/getPathAvatar";
import { RiSendPlane2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import StarSelector from "../../components/StarSelector";
import ReactGoogleMap from "../../components/ReactGoogleMap";
import { OverlayView } from "@react-google-maps/api";
type Props = {};

function Visit({}: Props) {
    let { restaurantId } = useParams<"restaurantId">();
    const restaurantIdNumber = React.useMemo(() => {
        try {
            return parseInt(restaurantId || "");
        } catch (err) {
            return -1;
        }
    }, [restaurantId]);

    const { data } = useQuery(schema.findRestaurants, {
        variables: {
            data: {
                id: restaurantIdNumber,
            },
        },
    });
    const restaurant: Restaurant | null = React.useMemo(() => {
        if (data) {
            return data.findRestaurants[0];
        } else {
            return null;
        }
    }, [data]);

    if (!restaurant) {
        return <div>Loading...</div>;
    }
    return (
        <div className="Visit">
            <RestaurantProfile restaurant={restaurant} />
            <MapView restaurant={restaurant} />
            <Victuals restaurant={restaurant} />
            <Rating restaurant={restaurant} />
        </div>
    );
}

function Rating({ restaurant }: { restaurant: Restaurant }) {
    const [callGetRating, { data, error }] = useLazyQuery(schema.getRatings,{
        variables: {
            restaurantId: restaurant.id,
        },
    });
    useEffect(() => {
        callGetRating({
            variables: {
                restaurantId: restaurant.id,
            },
        });
    }, []);
    const [current, setCurrent] = React.useState(5);
    function more() {
        setCurrent(current + 5);
    }
    const ratings: Rating[] = React.useMemo(() => {
        if (data) {
            return data.getRatings;
        }
        return [];
    }, [restaurant, data]);
    return (
        <div className="RatingSpace">
            <RateSpace onChange={callGetRating} restaurant={restaurant} />
            <div className="contentList">
                {ratings.map(
                    (rating, index) =>
                        index < current && (
                            <RatingItem rating={rating} key={index} />
                        )
                )}
                {ratings.length > current && (
                    <div className="more" onClick={more}>
                        Xem th??m
                    </div>
                )}
            </div>
        </div>
    );
}
function RateSpace({
    restaurant,
    onChange,
}: {
    restaurant: Restaurant;
    onChange: () => void;
}) {
    const [star, setStar] = React.useState(0);
    const [comment, setComment] = React.useState("");
    const userInfo = useAppSelector((state) => state.myAccount.user);

    const [callRate, resCallRate] = useMutation(schema.rateRestaurant);

    async function btnCallRate() {
        toast.promise(handleCallRate(), {
            pending: "??ang th???c hi???n",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "????nh gi?? th??nh c??ng",
        });
    }
    async function handleCallRate() {
        if (star === 0) throw new Error("H??y ch???n s??? sao !");
        await callRate({
            variables: {
                data: {
                    restaurantId: restaurant.id,
                    star: star,
                    comment: comment,
                },
            },
        });
        setStar(0);
        setComment("");
        onChange();
    }

    if (!userInfo) {
        return (
            <div className="RateSpace">
                <Link className="linkToLogin" to="/login">
                    ????ng nh???p ????? ????nh gi??
                </Link>
            </div>
        );
    }

    return (
        <div className="RateSpace">
            <div className="headSpace">
                <div className="space1">
                    <div className="avatar">
                        <img
                            src={getPathAvatar(userInfo.avatar)}
                            alt="avatar"
                        />
                    </div>
                    <StarSelector star={star} onChange={setStar} />
                </div>
                <div onClick={btnCallRate} className="sendBtn">
                    <span>G???i</span>
                    <span className="icon">
                        <RiSendPlane2Fill />
                    </span>
                </div>
            </div>
            <div className="inputSpace">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <hr />
        </div>
    );
}


function RatingItem({ rating }: { rating: Rating }) {
    return (
        <div className="RatingItem">
            <div className="head">
                <img
                    className="avatar"
                    src={getPathAvatar(rating.user?.avatar)}
                    alt="avatar"
                />
                <div className="name">{rating.user?.name}</div>
                <StarSelector star={rating.star} />
            </div>
            <hr />
            <div className="main">
                <div className="rating">
                    <div className="ratingText">{rating.comment}</div>
                </div>
            </div>
        </div>
    );
}

function Victuals({ restaurant }: { restaurant: Restaurant }) {
    const [search, setSearch] = React.useState("");
    const [current, setCurrent] = React.useState(5);
    function more() {
        setCurrent(current + 5);
    }
    const victuals = React.useMemo(() => {
        let arr = restaurant.victuals;
        if (search) {
            arr = arr.filter((victual) => {
                return victual.name.includes(search);
            });
        }
        return arr;
    }, [search, restaurant]);
    return (
        <div className="victuals">
            <div className="searchBar">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="searchInput"
                    placeholder="T??m m??n"
                />
            </div>
            <div className="listContent">
                {victuals.map(
                    (victual, index) =>
                        index < current && (
                            <VictualItem victual={victual} key={index} />
                        )
                )}
                {restaurant.victuals.length >= current && (
                    <div className="more" onClick={more}>
                        <span>Xem th??m</span>
                    </div>
                )}
            </div>
        </div>
    );
}

function VictualItem({ victual }: { victual: Victual }) {
    return (
        <div className="VictualItem">
            <div className="avatar">
                <img
                    src={process.env.REACT_APP_SERVER_ENDPOINT + victual.avatar}
                    alt="avatar"
                />
            </div>
            <div className="info">
                <div className="space1">
                    <div className="name">{victual.name}</div>
                    <div className="describe">{victual.describe}</div>
                </div>
                <div className="price">
                    <span>
                        <FaRegMoneyBillAlt />
                    </span>
                    {victual.price}
                </div>
            </div>
        </div>
    );
}

function RestaurantProfile({ restaurant }: { restaurant: Restaurant }) {
    const averageStar = React.useMemo(()=>{
        const ratings = restaurant.ratings;
        if(!ratings){
            return null;
        }
        return ratings.reduce((acc, cur) => acc + cur.star, 0) / ratings.length;
    },[restaurant])

    return (
        <div className="profileSpace">
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
                <div className="name">{restaurant.name}</div>
                <hr />

                <div className="starRating">
                    <AiOutlineStar/>
                    {averageStar} *
                </div>
                <div className="describe">
                    <BsTextarea />
                    {restaurant.describe}
                </div>
                <div className="address">
                    <FiMapPin />
                    {restaurant.address}
                </div>
                <div className="phone">
                    <FiPhone />
                    <a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a>
                </div>
                <div className="email">
                    <GrMailOption />
                    <a href={`mailto:${restaurant.email}`}>
                        {restaurant.email}
                    </a>
                </div>
            </div>
        </div>
    );
}

function MapView({ restaurant }: { restaurant: Restaurant }) {
    const { latitude, longitude, name } = restaurant;
    const value = {
        lat: latitude,
        lng: longitude,
    };
    return (
        <div className="mapContainer">
            <ReactGoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={value}
                zoom={15}
            >
                <OverlayView mapPaneName="floatPane" position={value}>
                    <div className="myMarker">
                        <div className="content">
                            <div className="text">{name}</div>
                            <div className="icon">
                                <FaMapMarkerAlt />
                            </div>
                        </div>
                    </div>
                </OverlayView>
            </ReactGoogleMap>
        </div>
    );
}

export default Visit;
