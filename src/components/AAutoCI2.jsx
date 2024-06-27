import "../css/AutoCompleteInput.scss";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";
// import getPlaces from "../API/getPlaces";

AAutoCI2.propTypes = {
    handleManualInputChange: PropTypes.func.isRequired,
    setAddress: PropTypes.func.isRequired,
    streetAndNumber: PropTypes.string.isRequired,
};

async function getPlaces(query) {
    try {
        const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
            {
                params: {
                    access_token: import.meta.env.VITE_APP_MAPBOX_API_KEY,
                },
            }
        );

        return response.data.features;
    } catch (error) {
        console.error("There was an error while fetching places:", error);
    }
}

export default function AAutoCI2({
    // handleManualInputChange,
    address,
    setAddress
    // streetAndNumber,
}) {
    const [suggestions, setSuggestions] = useState([]);
    const [inValue, setInValue] = useState("");

    useEffect(() => {
        if (inValue) {
            setTimeout(async () => {
                handleInputChange(inValue);
            }, 1000)
        }
        else {
            setSuggestions([]);
        }
    }, [inValue]);

    const handleChange = (event) => {
        // handleManualInputChange(event, "streetAndNumber");
        setInValue(inValue => event.target.value);

        // const newAddress = { ...address };
        // newAddress["streetAndNumber"] = event.target.value;
        // // window.alert(newAddress)
        // setAddress(newAddress);
    };

    const handleManualInputChange = (event, stateProperty) => {

    };

    const handleInputChange = async (query) => {
        // window.alert(query);

        const suggesions = await getPlaces(query);
        setSuggestions(suggesions);


        // console.log(suggesions);

    };

    const handleSuggestionClick = (suggestion) => {
        const streetAndNumber = suggestion.place_name.split(",")[0];
        const latitude = suggestion.center[1];
        const longitude = suggestion.center[0];
        const place_name = suggestion.place_name;

        const dumaddress = {
            latitude,
            longitude,
            place_name
        };

        // console.log(suggestion);
        setInValue(inValue => "");
        setAddress({ ...dumaddress });
        // window.alert(address.longitude, address.latitude);
        setSuggestions([]);
    };

    return (
        <div>
            <div className="autoCompleteInputContainer">
                <input
                    id="address"
                    type="text"
                    placeholder="Address"
                    value={inValue}
                    onChange={handleChange}
                    className="rounded p-2 "
                />
                {suggestions && suggestions.length ?
                    <ul className="addressSuggestions bg-white w-full">
                        {suggestions?.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion.place_name}
                            </li>
                        ))}
                    </ul> : <></>}
            </div>
        </div>
    );
}
