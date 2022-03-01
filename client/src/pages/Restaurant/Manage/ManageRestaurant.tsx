import { useMutation, useQuery } from "@apollo/client";
import React, { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ManageRestaurant.scss";
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
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ReactGoogleMap from "../../../components/ReactGoogleMap";
import MainInformation from "./MainInformation";
import Victuals from "./Victuals";

type Props = {};

function ManageRestaurant({}: Props) {
    const navigate = useNavigate();
    let { id } = useParams<"id">();
    const restaurantId = React.useMemo(() => {
        try {
            return parseInt(id || "");
        } catch (e: any) {
            return -1;
        }
    }, [id]);



    return (
        <div className="ManageRestaurant">
            <MainInformation restaurantId={restaurantId}/>
            <Victuals restaurantId={restaurantId}/>
        </div>
    );
}





export default ManageRestaurant;
