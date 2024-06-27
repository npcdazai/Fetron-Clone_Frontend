import { useState } from "react";
import ALocationInputBox from "./ALocationInputBox";

export default function ACreateTrip() {
    const [data, setData] = useState();
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();

    return (
        <div className="w-full flex justify-center items-center flex-col ">
            <div className="flex justify-start items-center gap-4 w-full p-4 flex-col">
                <div className="w-full  flex justify-center items-center flex-wrap gap-4">
                    <ALocationInputBox statusUpdate={"Origin"} />
                    <ALocationInputBox statusUpdate={"Destination"} />
                </div>
            </div>
            <button
                className="rounded-lg border-2 border-cyan-500 bg-cyan-200 p-2"
                style={{ width: 'calc(100% - 40px)' }}
            >
                Create Trip
            </button>
        </div>
    )
}