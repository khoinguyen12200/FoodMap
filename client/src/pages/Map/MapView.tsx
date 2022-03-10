import { OverlayView } from "@react-google-maps/api";
import React from "react";
import ReactGoogleMap from "../../components/ReactGoogleMap";
import locationCanTho from "../../constant/defaultCenterCity";
import { useAppSelector } from "../../redux";
import { FaStore } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import getPathAvatar from "../../constant/getPathAvatar";
import StarSelector from "../../components/StarSelector";
import { Link } from "react-router-dom";

type Props = {};

function MapView({}: Props) {
    const { restaurants, selected } = useAppSelector((state) => state.mapPage);

    const [center, setCenter] = React.useState(locationCanTho);

    React.useEffect(() => {
        if (selected) {
            const position = {
                lat: selected.latitude,
                lng: selected.longitude,
            };
            setCenter(position);
        }
    }, [selected]);

    return (
        <div className="MapView">
            <ReactGoogleMap center={center} zoom={15}>
                {restaurants.map((restaurant) => (
                    <RestaurantView restaurant={restaurant} />
                ))}
            </ReactGoogleMap>
        </div>
    );
}

function RestaurantView({ restaurant }: { restaurant: Restaurant }) {
    const position = React.useMemo(() => {
        return {
            lat: restaurant.latitude,
            lng: restaurant.longitude,
        };
    }, [restaurant]);

    const [isHover, setIsHover] = React.useState(false);
    function onMouseEnter() {
        setIsHover(true);
    }
    function onMouseLeave() {
        setIsHover(false);
    }

    const selected = useAppSelector((state) => state.mapPage.selected);
    const isSelected = React.useMemo(() => {
        return selected?.id === restaurant.id;
    }, [restaurant, selected]);

    return (
        <OverlayView mapPaneName="floatPane" position={position}>
            <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="restaurantView"
            >
                <div className="iconSpace">
                    <div className="topPosition">
                        <ViewSpace show={isHover || isSelected} restaurant={restaurant} />
                    </div>
                    <span className="mainIcon">
                        {isSelected && (
                            <div className="dots">
                                <span className="dot dot1"></span>
                                <span className="dot dot2"></span>
                            </div>
                        )}
                        <FaStore />
                    </span>

                    <span className="marker">
                        <GiPositionMarker />
                    </span>
                </div>
            </div>
        </OverlayView>
    );
}

function ViewSpace({
    restaurant,
    show,
}: {
    restaurant: Restaurant;
    show: boolean;
}) {
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

    return (
        <div className={`viewSpace ${!show && "close"}`}>
            <div className="headSpace">
                <div className="avatarSpace">
                    <img
                        src={getPathAvatar(restaurant.avatar)}
                        alt="avatar"
                        className="avatar"
                    />
                </div>
                <div className="infoSpace">
                    <div className="name">{restaurant.name}</div>
                    <div className="starViewSpace">
                        <StarSelector star={star} />
                    </div>
                </div>
            </div>
            <div className="desSpace">{restaurant.describe}</div>
            <div className="linkSpace">
                <Link to={`/visit/restaurant/${restaurant.id}`}>
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );
}

export default MapView;
