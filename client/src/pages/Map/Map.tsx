import React from "react";
import "./Map.scss";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

type Props = {};

function Map({}: Props) {
    return (
        <div>
            <MyComponent />
        </div>
    );
}

export default Map;

const containerStyle = {
    width: "100vw",
    height: "90vh",
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

function MyComponent() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_TOKEN || "",
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <></>
        </GoogleMap>
    ) : (
        <></>
    );
}
