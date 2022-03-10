import { Autocomplete } from "@react-google-maps/api";
import React from "react";
import { GrClose } from "react-icons/gr";
import { RiCloseCircleLine } from "react-icons/ri";


declare global{
    interface SimpleLocation{
        lat: number ,
        lng: number 
    }
}
type Props = {
    onChange:(location:SimpleLocation) => void
};

function AutoComplete({onChange}: Props) {
    const [location, setLocation] = React.useState<SimpleLocation | null>(null);
    
    const [value, setValue] = React.useState("");
    const [auto, setAuto] =
        React.useState<google.maps.places.Autocomplete | null>(null);

    function onLoad(autocomplete: google.maps.places.Autocomplete) {
        setAuto(autocomplete);
    }
    function onPlaceChanged() {
        const location = auto?.getPlace()?.geometry?.location;
        const lat = location?.lat;
        const lng = location?.lng;
        console.log("onPlaceChanged", auto?.getFields());
        if (lat && lng) {
            setLocation({ lat:lat(), lng:lng() });
        } else {
            setLocation(null);
        }
    }

    React.useEffect(() => {
        console.log(" location change", location);
        if(location)
            onChange(location)
    },[location])

    return (
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className="autoCompleteSpace">
                <div className="inputSpace">
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="inputAutocomplete"
                        type="text"
                        placeholder="Tìm kiếm địa điểm"
                    />
                    {value.trim() !== "" && (
                        <span onClick={() => setValue("")} className="closeBtn">
                            <RiCloseCircleLine />
                        </span>
                    )}
                </div>
            </div>
        </Autocomplete>
    );
}

export default AutoComplete;
