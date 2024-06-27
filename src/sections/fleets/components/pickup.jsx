import { faBell, faEdit, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, CircularProgress, Modal } from '@mui/material';
import Tabs from '../../../components/Tabs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import ModalMap from 'src/components/Modal/Map';
import NotificationsPopover from 'src/layouts/dashboard/common/notifications-popover';
import AtabHeader from 'src/components/AtabHeader';
import { FaHome } from "react-icons/fa";
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

export default function PickupFleetModal({
  vehicleNumber,
  vehicleData,
  status,
  mopen,
  setMOpen,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [locationIns, setLocationIns] = useState({ origin: 0 });
  const [pickAddress, setPickAddress] = useState();
  const [pick, setPick] = useState(false);
  const [field, setField] = useState('');
  const [createTripStatus, setCreateTripStatus] = useState(false);

  useEffect(() => {
    // console.log(locationIns);
  }, [locationIns]);

  console.log(vehicleData);

  const handleChangeLocation = (ftext) => {
    const dumpick = pick;
    const dumPickAdd = pickAddress;
    if (!pick) {
      setPick(true);
      setField(ftext);
    }
  };

  const handleCreateTrip = async () => {
    const data = {
      vehicle: {
        vehicleNumber: vehicleNumber,
        vehicleType: vehicleType,
      },
      fleet: {
        ...locationIns,
        status: "intransit"
      },
    };
    await axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/y/fleets/createtrip`, data)
      .then((res) => {
        setCreateTripStatus('');
        window.alert(res.data.msg);
        setMOpen(false);
      })
      .catch((err) => {
        setCreateTripStatus('');
        window.alert(err.response.data.error);
      });
  };

  const updateEnrouteAddOrigin = async () => {
    const data = {
      data: {
        origin: { ...locationIns.origin },
        destination: { ...vehicleData.current_fleet[0].destination },
      },
      option: 0,
      vehicleNumber: vehicleNumber,
    };
    // console.log(data);
    await axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/y/fleets/updateEnroute`, data)
      .then((res) => {
        // console.log(res.data);
        setCreateTripStatus(false);
        window.alert('Success!');
        setMOpen((mopen) => !mopen);
      })
      .catch((err) => {
        setCreateTripStatus(false);
        console.log(err.response.data.error);
        window.alert(err.response.data.error);
      });
  };

  return (
    <>
      <Modal
        open={mopen}
        onClose={() => {
          setMOpen((mopen) => !mopen);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="overflow-hidden ">
          <div className="w-full h-full flex justify-start content-center flex-col pb-4 overflow-auto ">
            <AtabHeader
              tabHeader="Enroute for Pickup"
              // cancelIcon={<FontAwesomeIcon
              //   icon={faXmark}
              //   onClick={() => {
              //     setMOpen(false);
              //   }}
              // />}
              setMOpen={setMOpen}
              setFetchAgain={setFetchAgain}
            />
            <div
              style={{ background: 'rgba(255,255,255,0.4)' }}
              className=" transition-all duration-500 ease-out border-solid border-b-2 border-slate-300 bg-transparent backdrop-blur-lg fixed flex justify-start content-center flex-wrap w-full h-fit p-2 gap-2 text-sm  top-11 z-[1]"
            >
              <button className="rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit">
                Available
              </button>
              <button className="rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit">
                En-route
              </button>
              <button
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
              <div className={'w-full h-full transition-all ease-out duration-500'}>
                <Tabs isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            </div>
            <div className="flex gap-4 w-full h-full p-4 mt-14 ">
              <div
                style={{ minHeight: 'calc(100% - 2rem)', width: '65%' }}
                className="relative border-2 border-solid border-slate-400  z-[0] rounded-md overflow-hidden"
              >
                <ModalMap
                  pick={pick}
                  setPick={setPick}
                  pickAddress={locationIns}
                  setPickAddress={setLocationIns}
                  field={field}
                  status={vehicleData.current_status}
                  current_fleet={vehicleData?.current_fleet ? vehicleData?.current_fleet[0] : {}}
                  vehicleData={vehicleData}
                />
              </div>
              <div style={{ width: '35%' }} className="w-full h-full flex flex-col gap-4">
                {vehicleData &&
                  vehicleData.current_fleet &&
                  vehicleData.current_fleet[0].fleetstatus['enroute-for-pickup'] ? (
                  <>
                    {/* ----------------Route Timeline------------- */}
                    <div className="w-full flex justify-center items-center flex-col py-4 px-3">
                      <div className="flex justify-center items-center flex-col w-fit">
                        <div className="flex justify-center items-center">
                          <div className="w-5 h-5 bg-green-900 rounded-full ml-3"></div>
                          <div
                            className="h-1 bg-gray-500"
                            style={{ minWidth: '15rem', maxWidth: 'calc(100vw - 14rem)' }}
                          ></div>
                          <div className="w-5 h-5 bg-red-900 rounded-full mr-3"></div>
                        </div>
                        <div className="flex justify-between w-full font-semibold text-sm">
                          <p className="w-1/3 p-1 bg-green-100">
                            {vehicleData.current_fleet[0].fleetstatus['enroute-for-pickup']}
                          </p>
                          <p className="w-1/3 p-1 bg-red-100">
                            {vehicleData.current_fleet[0].destination.place_name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-fit flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2">
                      <p className="text-normal font-semibold bg-cyan-100 w-full p-2">
                        Add waypoints of Vehicle
                      </p>
                      <div className="flex flex-col h-fit w-full p-2">
                        {locationIns && locationIns.origin.latitude ? (
                          <div className="flex justify-between font-semibold">
                            <p>
                              <span>Location: </span>
                              {locationIns.origin.place_name}
                            </p>

                            <button
                              // className='w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-200 hover:border-slate-400'
                              onClick={() => {
                                setLocationIns({
                                  ...locationIns,
                                  origin: {
                                    latitude: locationIns.origin.latitude,
                                    longitude: locationIns.origin.longitude,
                                    place_name: locationIns.origin.place_name,
                                    time: newValue,
                                  },
                                });
                                handleChangeLocation('origin');
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                          </div>
                        ) : (
                          <button
                            className="w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300"
                            onClick={() => handleChangeLocation('origin')}
                          >
                            Update Location
                          </button>
                        )}

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
                                    ...locationIns,
                                    origin: {
                                      latitude: locationIns.origin.latitude,
                                      longitude: locationIns.origin.longitude,
                                      place_name: locationIns.origin.place_name,
                                      time: newValue,
                                    },
                                  });
                                }}
                              />
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-fit flex justify-start  flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2">
                      <p className="text-normal font-semibold bg-cyan-100 w-full p-2">
                        Add start location of vehicle to enroute for pickup
                      </p>
                      <p className='ml-3 font-semibold antialiased'>Current Location</p>
                      <div className='flex justify-start ml-3 items-center'>
                        <div className='mr-2 w-2 h-2 bg-blue-700 rounded-full flex justify-center items-center text-center p-2 shadow-xl animate-pulse'></div>
                        <div className='flex flex-row gap-4'>
                          <span className='flex gap-1 justify-center items-center mx-2 px-4 py-3 bg-cyan-600 rounded-lg text-white '>NA KMs to go</span>
                          {/* <p>|</p> */}
                          <span className='flex gap-1 justify-center items-center mx-2 px-4 py-3 bg-cyan-600 rounded-lg text-white'>Updated NA</span>
                        </div>
                      </div>
                      <div className="flex flex-col h-fit w-full p-2">
                        {locationIns && locationIns.origin.latitude ? (
                          <div className="flex justify-between font-semibold">
                            <p>
                              <span>Location: </span>
                              {locationIns.origin.place_name}
                            </p>

                            <button
                              // className='w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-200 hover:border-slate-400'
                              onClick={() => {
                                setLocationIns({
                                  ...locationIns,
                                  origin: {
                                    latitude: locationIns.origin.latitude,
                                    longitude: locationIns.origin.longitude,
                                    place_name: locationIns.origin.place_name,
                                    time: newValue,
                                  },
                                });
                                handleChangeLocation('origin');
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                          </div>
                        ) : (
                          <button
                            className="w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300"
                            onClick={() => handleChangeLocation('origin')}
                          >
                            Update Location
                          </button>
                        )}

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
                                    ...locationIns,
                                    origin: {
                                      latitude: locationIns.origin.latitude,
                                      longitude: locationIns.origin.longitude,
                                      place_name: locationIns.origin.place_name,
                                      time: newValue,
                                    },
                                  });
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
                          setCreateTripStatus('loading');
                          updateEnrouteAddOrigin();
                        }}
                        disabled={createTripStatus == 'loading'}
                      >
                        {createTripStatus == 'loading' ? (
                          <CircularProgress size={22} color="grey" />
                        ) : (
                          <span>Add start location</span>
                        )}
                        {/* Create Trip */}
                      </button>
                    ) : (
                      <></>
                    )}
                  </>
                )}

                {/* PickUP info */}
                <div className="h-fit flex justify-start  flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2">
                  <p className="text-normal font-semibold bg-cyan-100 w-full p-2">
                    Pick-Up Info
                  </p>
                  <div style={{ maxWidth: "calc(100%-25px)" }} className='flex'>
                    <span className='ml-3 mt-1'><FaHome /></span>
                    <div className='ml-2 flex flex-col '>Pick up Location {/* Main location */}
                      <p className='text-gray-500'>Sub location</p>
                      <p className='flex gap-1 justify-center items-center px-4 py-3 bg-slate-200 rounded-lg text-blue-600'>{`ETA : 3:15PM, 18-5-22`}</p>
                    </div>
                  </div>
                  <button onClick={handleChangeLocation} className='flex gap-1  justify-center items-center mx-2 mb-2 px-4 py-3 bg-cyan-600 rounded-lg text-white'>Marked Arrived</button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
