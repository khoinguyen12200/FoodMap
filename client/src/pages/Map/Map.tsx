import React from "react";
import "./Map.scss";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import ReactGoogleMap from "../../components/ReactGoogleMap";
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

type Props = {};

function Map({}: Props) {
    return (
        <div>
            <ReactGoogleMap>
                
            </ReactGoogleMap>
        </div>
    );
}

export default Map;