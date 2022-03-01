import { useMutation, useQuery } from "@apollo/client";
import React, { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as schema from "./schema";
import {
    GoogleMap,
    InfoWindow,
    Marker,
    Rectangle,
    useJsApiLoader,
    LoadScript,
    InfoBox,
    OverlayView,
} from "@react-google-maps/api";
import { MdModeEditOutline } from "react-icons/md";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ReactGoogleMap from "../../../components/ReactGoogleMap";
import { FaMapMarkerAlt } from "react-icons/fa";

function MainInformation({ restaurantId }: { restaurantId: number }) {
    const navigate = useNavigate();

    const { loading, data, error } = useQuery(schema.findRestaurants, {
        variables: {
            data: {
                id: restaurantId,
            },
        },
        fetchPolicy: "no-cache",
    });

    const [callDelete] = useMutation(schema.deleteRestaurant);

    async function handelDelete() {
        const confirm = window.confirm(
            "Bạn có chắc muốn xóa doanh nghiệp này không ?"
        );
        if (!confirm) return;
        await toast.promise(deleteRestaurant(), {
            pending: "Đang thực hiện",
            error: {
                render: (res: any) => res?.data?.message,
            },
            success: "Xóa thành công",
        });
    }
    async function deleteRestaurant() {
        await callDelete({
            variables: {
                deleteRestaurantId: restaurantId,
            },
        });
        navigate("/my-restaurant");
    }

    const restaurant: Restaurant | null = data?.findRestaurants[0] || null;

    return (
        <div className="MainInformation">
            <h1 className="title">Quản lý doanh nghiệp</h1>

            {restaurant && (
                <div className="restaurant">
                    <Link
                        to={`/my-restaurant/edit/${restaurant.id}`}
                        className="editBtn"
                    >
                        <MdModeEditOutline />
                    </Link>
                    <div className="space1">
                        <div className="avatar">
                            <img
                                src={
                                    process.env.REACT_APP_SERVER_ENDPOINT +
                                    restaurant?.avatar
                                }
                                alt="avatar"
                            />
                        </div>
                        <div className="info">
                            <div className="infoRow">
                                <span className="label">Tên doanh nghiệp</span>
                                <span className="value">{restaurant.name}</span>
                            </div>
                            <div className="infoRow">
                                <span className="label">Mô tả</span>
                                <span className="value">
                                    {restaurant.describe}
                                </span>
                            </div>
                            <div className="infoRow">
                                <span className="label">Địa chỉ</span>
                                <span className="value">
                                    {restaurant.address}
                                </span>
                            </div>

                            <div className="infoRow">
                                <span className="label">Email</span>
                                <span className="value">
                                    {restaurant.email}
                                </span>
                            </div>

                            <div className="infoRow">
                                <span className="label">Số điện thoại</span>
                                <span className="value">
                                    {restaurant.phone}
                                </span>
                            </div>
                        </div>
                    </div>
                    <MapView restaurant={restaurant} />
                    <div className="btnSpace">
                        <Button
                            type="button"
                            variant="danger"
                            className="deleteBtn"
                            onClick={handelDelete}
                        >
                            Xóa doanh nghiệp
                        </Button>
                    </div>
                </div>
            )}
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

export default MainInformation;
