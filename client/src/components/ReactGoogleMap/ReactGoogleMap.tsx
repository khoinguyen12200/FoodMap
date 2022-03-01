import React from "react";
import {
    GoogleMap,
    InfoWindow,
    Marker,
    Rectangle,
    useJsApiLoader,
    LoadScript,
    InfoBox,
    OverlayView,
    GoogleMapProps,
} from "@react-google-maps/api";

function GoogleMapReact(props: GoogleMapProps) {
    // if (!isLoaded) return null;
    return (
        <GoogleMap
            mapContainerStyle={{
                width: "100%",
                height: "100%",
            }}
            {...props}
        >
            {props.children}
        </GoogleMap>
    );
}

export default GoogleMapReact;
