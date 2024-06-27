import { faBell, faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Box, CircularProgress, Modal, Snackbar } from "@mui/material";
import Tabs from "../../../components/Tabs"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import ModalMap from "src/components/Modal/Map";
import NotificationsPopover from "src/layouts/dashboard/common/notifications-popover";
import AtabHeader from "src/components/AtabHeader";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100vw - 3rem)',
    height: 'calc(100vh - 3rem)',
    bgcolor: 'rgba(255,255,255,0.95)',
    boxShadow: 1,
    borderRadius: 1.5,
    transition: 'all 0.2s ease-in',
    // overflowY:"scroll"
};

const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');
const todayStartOfTheDay = today.startOf('day');

export default function EnroutePickupFleetModal({ vehicleNumber, vehicleData, status, mopen, setMOpen,
    fetchAgain, setFetchAgain, setM2open, setvd
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [locationIns, setLocationIns] = useState({ origin: 0 });
    const [pickAddress, setPickAddress] = useState();
    const [pick, setPick] = useState(false);
    const [field, setField] = useState('');
    const [createStartTripStatus, setCreateStartTripStatus] = useState(false);
    const [waypoints, setWaypoints] = useState([]);
    const [atPickupTime, setAtPickupTime] = useState();
    const [notData, setNotData] = useState(false);

    useEffect(() => {
        // console.log(locationIns);
    }, [locationIns])

    // console.log(vehicleData);

    const handleChangeLocation = (ftext) => {
        const dumpick = pick;
        const dumPickAdd = pickAddress;
        if (!pick) {
            setPick(true);
            setField(ftext);
        }
    }

    const fetchIndividualVehicle = async () => {
        await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/y/vehicle/oneerp?vnum=${vehicleNumber}`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log("Data fetched");
                setvd({ ...res.data.data });
                vehicleData = res.data.data;
                // console.log(res.data.data);
                // console.log(vehicleData);
                // setMOpen((mopen) => !mopen);
                // setM2Open(true);
                setNotData({ msg: "Success", type: "success" });
                // setCreateTripStatus('');
                // setTabData(res.data.data);
            })
            .catch((err) => {
                setMOpen((mopen) => !mopen);
                setFetchAgain(true);
                // setTabData([]);
                // window.alert("Some error occurred")
                // console.log(err);
            })
        // setFVLoading(false);
    }

    const updateEnrouteAddOrigin = async () => {
        if (!vehicleData) {
            window.alert("No Vehicle Data found!");
            return;
        }
        const data = {
            data: { origin: { ...locationIns.origin }, destination: { ...vehicleData.current_fleet[0].origin } },
            option: 0,
            vehicleNumber: vehicleNumber,
            current_round: vehicleData.current_round
        }
        console.log(data);
        // console.log(data);
        await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/y/fleets/updateEnroute`, data)
            .then((res) => {
                // console.log(res.data);
                // setFetchAgain(true);
                fetchIndividualVehicle();

                setMOpen(false);
                setCreateStartTripStatus(false);
                console.log("En");
                // window.alert("Success!");
                setTimeout(() => {
                    setMOpen(true);
                }, 500);

                console.log("Dn");
                // setMOpen((mopen) => !mopen);
            })
            .catch((err) => {
                setCreateStartTripStatus(false);
                console.log(err.response.data.error);
                window.alert(err.response.data.error);
            })
    }

    const markArrivedAtPickup = async () => {
        const atpickupDD = atPickupTime;
        if (!atpickupDD) {
            window.alert("Please select pickup time");
            setCreateStartTripStatus(false);
            return;
        }
        var ddveh = { ...vehicleData.current_fleet[0].fleetstatus.enroute_for_pickup.destination };
        ddveh.time = atpickupDD;
        const data = {
            pickupData: ddveh,
            routeId: vehicleData.current_fleet[0].fleetstatus.enroute_for_pickup._id,
            option: 1,
            vehicleNumber: vehicleNumber
        }
        // console.log(data);
        await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/y/fleets/updateEnroute`, data)
            .then((res) => {
                // console.log(res.data);
                // setFetchAgain(true);
                fetchIndividualVehicle();
                setMOpen(mopen => !mopen);
                setCreateStartTripStatus(false);
                // window.alert("Success!");
                setM2open(true);
            })
            .catch((err) => {
                setCreateStartTripStatus(false);
                if (err.response.data.error) {
                    window.alert(err.response.data.error);
                }
                else {
                    window.alert("Some error occurred");
                }
                // console.log();
                // console.log(err.response.data.error);
                // window.alert(err.response.data.error);
            })
    }

    // console.log(vehicleData);
    return (
        <>
            <Modal
                open={mopen}
                onClose={() => {
                    // setFetchAgain(true);
                    setMOpen((mopen) => !mopen);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="overflow-hidden ">
                    <Snackbar open={notData ? true : false} autoHideDuration={6000} onClose={() => { setNotData(false) }}>
                        <Alert
                            onClose={() => { setNotData(false) }}
                            severity={notData ? notData.type : ""}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {notData ? notData.msg : ""}
                        </Alert>
                    </Snackbar>
                    <div className="w-full h-full flex justify-start content-center flex-col pb-4 overflow-auto ">

                        <AtabHeader
                            tabHeader={`Enroute for pickup | ${vehicleNumber ? vehicleNumber : ""}`}
                            setMOpen={setMOpen}
                        // setFetchAgain={setFetchAgain}
                        />
                        <div style={{ background: "rgba(255,255,255,0.4)" }} className=" transition-all duration-500 ease-out border-solid border-b-2 border-slate-300 bg-transparent backdrop-blur-lg fixed flex justify-start content-center flex-wrap w-full h-fit p-2 gap-2 text-sm  top-14 z-[1]">
                            <button className="rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit">
                                Available
                            </button>
                            <button className="rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit">
                                En-route
                            </button>
                            <button
                                // onMouseEnter={handleMouseEnter}
                                // onMouseLeave={handleMouseLeave}
                                className="flex items-center relative rounded-lg border-2 border-green-500 bg-emerald-200 p-2 w-fit animate-pulse active:border- duration-300 active:text-green-900"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                Intransit
                                {!isOpen ? (
                                    <IoMdArrowDropup className="h-3" />
                                ) : (
                                    <IoMdArrowDropup className="h-3" />
                                )}
                            </button>
                            {/* {isOpen && ( */}
                            <div className={'w-full h-full transition-all ease-out duration-500'}>
                                <Tabs isOpen={isOpen} setIsOpen={setIsOpen} />
                            </div>
                            {/* )} */}
                        </div>
                        <div className='flex gap-4 w-full h-full p-4 mt-14 '>
                            <div style={{ minHeight: "calc(100% - 2rem)", width: "70%" }} className="relative border-2 border-solid border-slate-400 overflow-hidden z-[0] rounded-md overflow-hidden">
                                <ModalMap pick={pick} setPick={setPick}
                                    pickAddress={locationIns} setPickAddress={setLocationIns} field={field}
                                    status={vehicleData.current_status} current_fleet={vehicleData?.current_fleet ? vehicleData?.current_fleet[0] : {}}
                                    waypoints={waypoints} setWaypoints={setWaypoints}
                                    vehicleData={vehicleData}
                                />
                            </div>
                            <div style={{ width: '30%' }} className='h-full overflow-auto pr-2'>
                                <div className="w-full h-full flex flex-col gap-4 overflow-auto">

                                    {/* ----------------Route Timeline------------- */}
                                    {vehicleData?.current_fleet && vehicleData?.current_fleet[0] && vehicleData?.current_fleet[0].fleetstatus.enroute_for_pickup ?
                                        <>

                                            <div className="w-full flex justify-center items-center flex-col py-4 px-3">
                                                <p className="font-semibold">Enroute for pickup</p>
                                                <div className="flex justify-center items-center flex-col w-fit">
                                                    <div className="flex justify-center items-center">
                                                        <div className="w-5 h-5 bg-blue-900 rounded-full ml-3"></div>
                                                        <div
                                                            className="h-1 bg-gray-500"
                                                            style={{ minWidth: '15rem', maxWidth: 'calc(100vw - 14rem)' }}
                                                        ></div>
                                                        <div className="w-5 h-5 bg-red-900 rounded-full mr-3"></div>
                                                    </div>
                                                    <div className="flex justify-between w-full font-semibold text-sm">
                                                        <p className="w-1/3 p-1 bg-blue-100">{vehicleData?.current_fleet[0]?.fleetstatus["enroute_for_pickup"]?.origin?.place_name}</p>
                                                        <p className="w-1/3 p-1 bg-red-100">{vehicleData?.current_fleet[0]?.fleetstatus["enroute_for_pickup"]?.destination?.place_name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer
                                                    components={[
                                                        'DatePicker',
                                                        'DateTimePicker',
                                                        'TimePicker',
                                                        'DateRangePicker',
                                                        'DateTimeRangePicker',
                                                    ]}
                                                >
                                                    <DemoItem label="" className="p-2 text-sm">
                                                        <DateTimePicker
                                                            className="p-2 text-sm"
                                                            // defaultValue={today}
                                                            views={['year', 'month', 'day', 'hours', 'minutes']}
                                                            onAccept={(newValue) => {
                                                                setAtPickupTime(newValue);
                                                            }}
                                                        />
                                                    </DemoItem>
                                                </DemoContainer>
                                            </LocalizationProvider>
                                            <button
                                                className="rounded-lg border-2 border-cyan-500 bg-cyan-200 p-2"
                                                style={{ width: 'calc(100%)' }}
                                                onClick={() => {
                                                    setCreateStartTripStatus('loading');
                                                    // updateEnrouteAddOrigin();
                                                    markArrivedAtPickup();
                                                }}
                                                disabled={createStartTripStatus == 'loading'}
                                            >
                                                {createStartTripStatus == 'loading' ? (
                                                    <CircularProgress size={22} color="grey" />
                                                ) : (
                                                    <span>Mark Arrived at Pickup</span>
                                                )}
                                            </button>

                                        </>
                                        :
                                        <>
                                            <div
                                                className='h-fit w-full flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2'
                                            >
                                                <p className='text-normal font-semibold bg-cyan-100 w-full p-2'>Add starting location of vehicle</p>
                                                <div className='flex flex-col h-fit w-full p-2'>
                                                    {locationIns && locationIns.origin.latitude ?
                                                        <div className='flex justify-between font-semibold'>
                                                            <p>
                                                                <span className="bg-slate-200 text-slate-800"> Pickup Location:</span> {locationIns.origin.place_name}
                                                            </p>

                                                            <button
                                                                // className='w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-200 hover:border-slate-400'
                                                                onClick={() => {
                                                                    setLocationIns({
                                                                        ...locationIns, origin:
                                                                        {
                                                                            latitude: locationIns.origin.latitude,
                                                                            longitude: locationIns.origin.longitude,
                                                                            place_name: locationIns.origin.place_name,
                                                                            time: newValue
                                                                        }
                                                                    });
                                                                    handleChangeLocation("origin")
                                                                }
                                                                }
                                                            ><FontAwesomeIcon icon={faEdit} /></button>
                                                        </div>
                                                        :
                                                        <button
                                                            className='w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300'
                                                            onClick={() => handleChangeLocation("origin")}
                                                        >Pick Location</button>
                                                    }

                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer
                                                            components={[
                                                                'DatePicker',
                                                                'DateTimePicker',
                                                                'TimePicker',
                                                                'DateRangePicker',
                                                                'DateTimeRangePicker',
                                                            ]}
                                                        >
                                                            <DemoItem label="" className="p-2 text-sm">
                                                                <DateTimePicker
                                                                    className="p-2 text-sm"
                                                                    defaultValue={today}
                                                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                                                    onAccept={(newValue) => {
                                                                        setLocationIns({
                                                                            ...locationIns, origin:
                                                                            {
                                                                                latitude: locationIns.origin.latitude,
                                                                                longitude: locationIns.origin.longitude,
                                                                                place_name: locationIns.origin.place_name,
                                                                                time: newValue
                                                                            }
                                                                        })
                                                                    }}
                                                                />
                                                            </DemoItem>
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>

                                            </div>
                                            {locationIns && locationIns.origin ? (
                                                <button
                                                    className="rounded-lg border-2 border-cyan-500 bg-cyan-200 p-2"
                                                    style={{ width: 'calc(100%)' }}
                                                    onClick={() => {
                                                        setCreateStartTripStatus('loading');
                                                        updateEnrouteAddOrigin();
                                                    }}
                                                    disabled={createStartTripStatus == 'loading'}
                                                >
                                                    {createStartTripStatus == 'loading' ? (
                                                        <CircularProgress size={22} color="grey" />
                                                    ) : (
                                                        <span>Add Start Location for pickup</span>
                                                    )}
                                                </button>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    }






                                </div>
                            </div>
                            {/* <ACreateTrip /> */}
                        </div>

                        {/* ----------------Create a trip------------- */}

                        {/* <div className="w-full flex justify-center items-center flex-col ">
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
            </div> */}
                        {/* ----------------Route timeline------------ */}
                        {/* <div className="w-full flex justify-center items-center flex-col py-4 px-3">
              <div className="flex justify-center items-center flex-col w-fit">
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 bg-green-900 rounded-full ml-3"></div>
                  <div
                    className="h-1 bg-gray-500"
                    style={{ minWidth: '15rem', maxWidth: 'calc(100vw - 14rem)' }}
                  ></div>
                  <div className="w-5 h-5 bg-red-900 rounded-full mr-3"></div>
                </div>
                <div className="flex justify-between items-center w-full font-semibold text-normal">
                  <p>Mumbai</p>
                  <p>Delhi</p>
                </div>
              </div>
            </div> */}
                        {/* ----------------Enroute for pickup------------- */}
                        {/* <FirstComponet
              vehicalStatus={'Enroute for pickup'}
              location={'Mumbai, Maharashtra, India'}
            /> */}
                        {/* ----------------At pickup------------- */}
                        {/* <SecondComponet
              vehicalStatus={'At pickup'}
              information={'Arrival Information:'}
              location={'Mumbai, Maharashtra, India'}
              time={'19:00:00'}
            /> */}
                        {/* ---------------In Transit---------------- */}
                        {/* <SecondComponet
              vehicalStatus={'In Transit'}
              information={'Vehicle Journey Start Information:'}
              location={'Mumbai, Maharashtra, India'}
              time={'19:00:00'}
            /> */}
                    </div>

                </Box>
            </Modal >
        </>
    )
}