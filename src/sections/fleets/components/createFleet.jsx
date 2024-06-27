import { faBell, faCancel, faCross, faEdit, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Box, CircularProgress, Modal, Snackbar } from '@mui/material';
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
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import AtabHeader from 'src/components/AtabHeader';
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

export default function CreateFleetModal({ vehicleNumber, vehicleType, status, mopen, setMOpen,
  fetchAgain, setFetchAgain, vd, setvd, setM2Open, vehicleData
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [locationIns, setLocationIns] = useState({ origin: 0, destination: 0 });
  const [pickAddress, setPickAddress] = useState();
  const [pick, setPick] = useState(false);
  const [field, setField] = useState('');
  const [createTripStatus, setCreateTripStatus] = useState(false);
  const [components, setComponents] = useState([]);

  const [waypoints, setWaypoints] = useState([]);
  const [goForward, setGoForward] = useState();
  // const [vData, setVData] = useState();
  const [notData, setNotData] = useState(false);



  // const []
  const removeComponent = (index) => {
    const updatedComponents = [...components];
    updatedComponents.splice(index, 1); // Remove the component at the specified index
    setComponents(updatedComponents);
  };

  // const addComponent = () => {
  //   setComponents([...components,

  //   <div key={components.length} className="h-fit flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2">
  //     <p className="text-normal font-semibold bg-green-500 w-full p-2">Route</p>
  //     <div className="flex flex-col h-fit w-full p-2">
  //       {locationIns && locationIns.origin.latitude ? (
  //         <div className="flex justify-between font-semibold">
  //           <p>
  //             <span>Location: </span>
  //             {locationIns.origin.place_name}
  //           </p>

  //           <button
  //             // className='w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-200 hover:border-slate-400'
  //             onClick={() => {
  //               setLocationIns({
  //                 ...locationIns,
  //                 origin: {
  //                   latitude: locationIns.origin.latitude,
  //                   longitude: locationIns.origin.longitude,
  //                   place_name: locationIns.origin.place_name,
  //                   time: newValue,
  //                 },
  //               });
  //               handleChangeLocation('origin');
  //             }}
  //           >
  //             <FontAwesomeIcon icon={faEdit} />
  //           </button>
  //         </div>
  //       ) : (
  //         <button
  //           className="w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300"
  //           onClick={() => handleChangeLocation('origin')}
  //         >
  //           Pick Location
  //         </button>
  //       )}

  //       <LocalizationProvider dateAdapter={AdapterDayjs}>
  //         <DemoContainer
  //           components={[
  //             'DatePicker',
  //             'DateTimePicker',
  //             'TimePicker',
  //             'DateRangePicker',
  //             'DateTimeRangePicker',
  //           ]}
  //         >
  //           <DemoItem label="" className="p-2 text-sm">
  //             <DateTimePicker
  //               className="p-2 text-sm"
  //               defaultValue={today}
  //               views={['year', 'month', 'day', 'hours', 'minutes']}
  //               onAccept={(newValue) => {
  //                 setLocationIns({
  //                   ...locationIns,
  //                   origin: {
  //                     latitude: locationIns.origin.latitude,
  //                     longitude: locationIns.origin.longitude,
  //                     place_name: locationIns.origin.place_name,
  //                     time: newValue,
  //                   },
  //                 });
  //               }}
  //             />
  //           </DemoItem>
  //         </DemoContainer>
  //       </LocalizationProvider>
  //     </div>
  //   </div>

  //   ])
  // }

  useEffect(() => {
    // console.log(locationIns);
  }, [locationIns]);

  const handleChangeLocation = (ftext) => {
    const dumpick = pick;
    const dumPickAdd = pickAddress;
    if (!dumpick) {
      setPick(true);
      setField(ftext);
    }
  };

  const fetchIndividualVehicle = async () => {
    await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/y/vehicle/oneerp?vnum=${vehicleNumber}`,
      { withCredentials: true }
    )
      .then((res) => {
        // console.log("Data fetched");
        setvd(res.data.data);
        setMOpen((mopen) => !mopen);
        setM2Open(true);
        setNotData({ msg: "Success", type: "success" });
        setCreateTripStatus('');
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


  const handleCreateTrip = async () => {
    const data = {
      vehicle: {
        vehicleNumber: vehicleNumber,
        vehicleType: vehicleType,
      },
      fleet: {
        ...locationIns,
        waypoints: waypoints
      },
    };
    // console.log(locationIns);
    if (!locationIns.origin || !locationIns.origin.place_name || !locationIns.origin.latitude || !locationIns.origin.longitude
      // || !locationIns.origin.time
    ) {
      // setNotData({ msg: "Please select origin location", type: "error" });
      window.alert("Please select origin location")
      setCreateTripStatus('');
      return;
    }
    if (!locationIns.origin.time) {
      window.alert("Please select origin time");
      setCreateTripStatus('');
      return;
    }
    if (!locationIns.destination || !locationIns.destination.place_name || !locationIns.destination.latitude || !locationIns.destination.longitude
      // || !locationIns.destination.time
    ) {
      // setNotData({ msg: "Please select origin location", type: "error" });
      window.alert("Please select destination location")
      setCreateTripStatus('');
      return;
    }
    if (!locationIns.destination.time) {
      window.alert("Please select destination time");
      setCreateTripStatus('');
      return;
    }
    await axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/y/fleets/createtrip`, data)
      .then((res) => {
        // window.alert(res.data.msg);
        // setMOpen((mopen) => !mopen);
        setNotData({ msg: "Fleet created... Fetching updated vehicle data.....", type: "success" });
        fetchIndividualVehicle();
        // setFetchAgain(true);
        // setMOpen((mopen) => !mopen);
      })
      .catch((err) => {
        setCreateTripStatus('');
        setNotData({ msg: "Some error occurred while updating..", type: "error" });
        // window.alert(err.response.data.error);
      });
  };


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
              tabHeader={`${vehicleNumber ? vehicleNumber : ""}`}
              setMOpen={setMOpen}
            // setFetchAgain={setFetchAgain}
            />
            <div
              style={{ background: 'rgba(255,255,255,0.4)' }}
              className=" transition-all duration-500 ease-out border-solid border-b-2 border-slate-300 bg-transparent backdrop-blur-lg fixed flex justify-start content-center flex-wrap w-full h-fit p-2 gap-2 text-sm  top-14 z-[1]"
            >
              <button className="flex items-center relative rounded-lg border-2 border-green-500 bg-emerald-200 p-2 w-fit animate-pulse active:border- duration-300 active:text-green-900">
                Available
              </button>
              <button className="rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit">
                En-route
              </button>
              <button
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                className=" flex items-center rounded-lg border-2 border-gray-300 bg-gray-100 p-2 w-fit"
                onClick={() => setIsOpen(!isOpen)}
              >
                Intransit
                {!isOpen ? (
                  <IoMdArrowDropdown className="h-3" />
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
            <div className="flex gap-4 w-full h-full p-4 mt-14 overflow-hidden">
              <div
                style={{ minHeight: 'calc(100% - 2rem)', width: '70%' }}
                className="relative border-2 border-solid border-slate-400 overflow-hidden z-[0] rounded-md "
              >
                <ModalMap
                  pick={pick}
                  setPick={setPick}
                  pickAddress={locationIns}
                  setPickAddress={setLocationIns}
                  field={field}
                  status={0}
                  waypoints={waypoints}
                  setWaypoints={setWaypoints}
                  vehicleData={vehicleData}
                />
              </div>
              <div style={{ width: '30%' }} className='h-full overflow-auto pr-2'>
                <div className="w-full h-fit flex flex-col gap-4 overflow-auto">
                  <div className="h-fit flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2">
                    <p className="text-normal font-semibold bg-cyan-100 w-full p-2">Origin</p>
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
                          Pick Location
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
                  {/* <div>
                    <div className='flex items-center'>
                      <IoMdAddCircle className='text-blue-600' onClick={addComponent} />
                      <button onClick={addComponent} className='text-blue-600 ml-1'>via (click to add multiple points)</button>
                    </div>
                    <FontAwesomeIcon icon={faCancel} />
                    {components.map((component, index) => (
                      <div key={index}>
                        {component}
                        <MdCancel className='text-blue-600 h-10 w-5' onClick={() => removeComponent(index)} />
                      </div>
                    ))}
                  </div> */}
                  {locationIns && locationIns.origin ? (
                    <>

                      {/* <div className='w-full border-t-2 border-dashed border-t-slate-500'></div> */}
                      <div className="h-fit flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2 pb-2">
                        <div className='flex justify-between items-center px-2 p-1 bg-green-200 w-full'>
                          <p className="text-normal font-semibold  w-full ">Waypoints</p>
                          <button className='p-2 rounded-lg bg-slate-200 w-fit'
                            onClick={() => {
                              var wwd = [...waypoints];
                              wwd.push("");
                              setWaypoints([...wwd])
                            }}
                          >Add</button>
                        </div>
                        {waypoints.map((el, i) => {
                          return (
                            <div key={`ww${i}`}
                              style={{ width: "calc(100% - 1rem)" }}
                              className="h-fit flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2">
                              <div className='flex justify-between items-center p-2 bg-green-100 w-full'>
                                <p className="text-normal font-semibold  w-full ">Waypoint {i + 1}</p>
                                <button className='bg-slate-100 text-red-800 px-1 rounded-full text-sm hover:bg-red-900 hover:text-white'
                                  onClick={() => {
                                    var wwp = [...waypoints];
                                    wwp.splice(i, 1);
                                    setWaypoints(wwp);
                                  }
                                  }
                                ><FontAwesomeIcon icon={faXmark} /></button>
                              </div>

                              <div className="flex flex-col h-fit w-full p-2">
                                {el && el.latitude ? (
                                  <div className="flex justify-between font-semibold">
                                    <p>
                                      <span>Location: </span>
                                      {el?.place_name}
                                    </p>

                                    <button
                                      // className='w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-200 hover:border-slate-400'
                                      onClick={() => {
                                        var ww = [...waypoints];
                                        ww[i] = {
                                          latitude: el?.latitude,
                                          longitude: el?.longitude,
                                          place_name: el?.place_name,
                                          // time: newValue,
                                        };
                                        setWaypoints([...ww]);
                                        handleChangeLocation(`w${i}`);
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    className="w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300"
                                    onClick={() => {
                                      // var ww = [...waypoints];
                                      // ww[i] = {
                                      //   latitude: el.latitude,
                                      //   longitude: waypoints[i].longitude,
                                      //   place_name: waypoints[i].place_name,
                                      //   time: newValue,
                                      // };
                                      // setWaypoints([...ww]);
                                      handleChangeLocation(`w${i}`);
                                    }}
                                  >
                                    Pick Location
                                  </button>
                                )}
                              </div>
                            </div>
                          )

                        })}
                      </div>
                      <div className="h-fit flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2">
                        <p className="text-normal font-semibold bg-cyan-100 w-full p-2">Destination</p>
                        <div className="flex flex-col h-fit w-full p-2">
                          {locationIns && locationIns.destination.latitude ? (
                            <div className="flex justify-between font-semibold">
                              <p>
                                <span>Location: </span>
                                {locationIns.destination.place_name}
                              </p>

                              <button
                                // className='w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-200 hover:border-slate-400'
                                onClick={() => handleChangeLocation('destination')}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                            </div>
                          ) : (
                            // <p><span>Location: </span>{locationIns.destination.place_name}</p>
                            <button
                              className="w-full px-4 py-3 font-semibold border-2 border-solid border-slate-200 rounded hover:bg-slate-100 hover:border-slate-300"
                              onClick={() => handleChangeLocation('destination')}
                            >
                              Pick Location
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
                                  // defaultValue={today}
                                  views={['year', 'month', 'day', 'hours', 'minutes']}
                                  onAccept={(newValue) => {
                                    setLocationIns({
                                      ...locationIns,
                                      destination: {
                                        latitude: locationIns.destination.latitude,
                                        longitude: locationIns.destination.longitude,
                                        place_name: locationIns.destination.place_name,
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
                    <></>
                  )}
                  {locationIns && locationIns.origin && locationIns.destination ? (
                    <button
                      className="rounded-lg border-2 border-cyan-500 bg-cyan-200 p-2"
                      style={{ width: 'calc(100%)' }}
                      onClick={() => {
                        setCreateTripStatus('loading');
                        handleCreateTrip();
                      }}
                      disabled={createTripStatus == 'loading'}
                    >
                      {createTripStatus == 'loading' ? (
                        <CircularProgress size={22} color="grey" />
                      ) : (
                        <span>Create Trip</span>
                      )}
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
