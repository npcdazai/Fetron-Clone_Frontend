import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import axios from "axios";
import CreateFleetModal from './components/createFleet';
import EnroutePickupFleetModal from './components/enroutePickup';
import Pickup from "./components/pickup"
import AtPickupFleetModal from './components/Atpickup';
import InTransit from './components/inTransit';
import UnloadingVehicle from './components/unloading';
// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  vehicleData,
  fetchAgain,
  setFetchAgain,
  domopen,
}) {

  const [mopen, setMOpen] = useState(false);
  const [m2open, setM2Open] = useState(false);
  const [m3open, setM3Open] = useState(false);
  const [m4open, setM4Open] = useState(false);
  const [m5open, setM5Open] = useState(false);

  const [locationIns, setLocationIns] = useState({ origin: 0, destination: 0 });
  const [pickAddress, setPickAddress] = useState();
  const [pick, setPick] = useState(false);
  const [vehicalStatus, setVehicalStatus] = useState();
  const [numStatus, setVNumStatus] = useState();
  const [vd, setvd] = useState();

  const [upVehData, setUpVehData] = useState();

  useEffect(() => {
    // console.log(locationIns);
  }, [locationIns])

  // console.log(vehicleData);

  const vehicle_status = [
    "available",
    "",
    "enroute-for-pickup",
    "at-pickup",
    "intransit",
    "unloading",
    "completed"
  ]

  useEffect(() => {
    if (domopen && domopen._id
      && domopen.vehicleNumber
    ) {
      // vehicleData = { ...domopen };
      // vehicleNumber = domopen.vehicleNumber;
      // console.log(domopen);
      var status = domopen.current_status;
      setVNumStatus(Number(domopen.current_status));
      if (status == 0) {
        setMOpen(true);
      }
      else if (status == 1 || status == 2) {
        setM2Open(true);
      }
      else if (status == 3) {
        setM3Open(true);
      }
      else if (status == 4) {
        setM4Open(true);
      }
      else if (status == 5) {
        setM5Open(true);
      }
    }
  }, [domopen]);

  useEffect(() => {
    // console.log(status);
    if (!upVehData) {
      return;
    }
    if (!upVehData.current_status) {
      setVehicalStatus("available");
    }
    else {
      if (upVehData.current_status == 1 || upVehData.current_status == 2) {
        setVehicalStatus(vehicle_status[2]);
      }
      else {
        setVehicalStatus(vehicle_status[upVehData.current_status]);
      }

    }
    // setVNumStatus(status);
  }, [upVehData])

  useEffect(() => {
    if (vehicleData) {
      // console.log(vehicleData);
      setUpVehData({ ...vehicleData });
      var cs = vehicleData?.current_status;
      if (!cs) {
        setVNumStatus(numStatus => 0);
      }
      else {
        // console.log(cs);
        setVNumStatus(numStatus => Number(cs));
      }

    }
  }, [vehicleData])

  // MH14KA3798


  useEffect(() => {
    // console.log(vd);
    // if (vd && vd._id) {
    if (vd && vd._id) {
      // status = vd.current_status;
      setVNumStatus(Number(vd.current_status));
      // vehicleData = { ...vd };
      // setFetchAgain(true);
      // console.log(Number(vd.current_status));
      // console.log(vd);
    }
    // }
  }, [vd])

  useEffect(() => {
    // console.log("Num Status " + numStatus);
  }, [numStatus])

  // useEffect(() => {
  //   console.log(m4open);
  // }, [m4open])
  // console.log(numStatus);

  return (
    <>
      {upVehData && upVehData._id ?
        <>
          {numStatus == 0 ?
            <>
              <TableRow
                tabIndex={-1}
                role="checkbox"
                selected={selected}
                className=" hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
                onClick={(e) => {
                  setMOpen((mopen) => !mopen);
                }}
              >
                <TableCell component="th" scope="row" padding="0.4">
                  <Stack direction="column" alignItems="start" spacing={0.5}>
                    <p className="text-sm">{upVehData?.data?.vehicleType}</p>
                    <Typography variant="subtitle2" noWrap>
                      {upVehData?.vehicleNumber}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>{upVehData?.current_location ? upVehData?.current_location?.location : ""}</TableCell>
                <TableCell>{upVehData?.current_fleet[0]?.origin?.place_name ?
                  upVehData?.current_fleet[0]?.origin?.place_name : ""
                }</TableCell>

                <TableCell>{upVehData?.current_fleet[0]?.destination?.place_name ?
                  upVehData?.current_fleet[0]?.destination?.place_name : ""
                }</TableCell>

                <TableCell>
                  <Label color={(numStatus === 'banned' && 'error') || 'success'}>{vehicalStatus ? vehicalStatus : ""}</Label>
                </TableCell>

              </TableRow>
              <CreateFleetModal vehicleType={upVehData?.data?.vehicleType}
                vehicleNumber={upVehData?.vehicleNumber} status={vehicalStatus} mopen={mopen}
                setMOpen={setMOpen}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                vd={vd}
                setvd={setvd}
                setM2Open={setM2Open}
                vehicleData={upVehData}
              />
              {/* <EnroutePickupFleetModal vehicleData={vd}
            vehicleNumber={vehicleNumber} status={1} mopen={m2open}
            setMOpen={setM2Open}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          /> */}

            </> : <></>
          }
          {
            numStatus == 1 || numStatus == 2 ?
              <>
                <TableRow
                  tabIndex={-1}
                  role="checkbox"
                  selected={selected}
                  className=" hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
                  onClick={(e) => {
                    setM2Open((m2open) => !m2open);
                  }}
                >
                  <TableCell component="th" scope="row" padding="0.4">
                    <Stack direction="column" alignItems="start" spacing={0.5}>
                      <p className="text-sm">{upVehData?.data?.vehicleType}</p>
                      <Typography variant="subtitle2" noWrap>
                        {upVehData?.vehicleNumber}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{upVehData?.current_location ? upVehData?.current_location?.location : ""}</TableCell>

                  <TableCell>{upVehData?.current_fleet ? upVehData?.current_fleet[0]?.origin.place_name : ""}</TableCell>
                  <TableCell>{upVehData?.current_fleet ? upVehData?.current_fleet[0]?.destination.place_name : ""}</TableCell>

                  <TableCell>
                    <Label color={'success'}>{vehicalStatus ? vehicalStatus : ""}</Label>
                  </TableCell>

                </TableRow>
                <EnroutePickupFleetModal vehicleData={vd ? vd : upVehData}
                  vehicleNumber={upVehData?.vehicleNumber} status={numStatus} mopen={m2open}
                  setMOpen={setM2Open}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  setM2open={setM3Open}
                  vd={vd}
                  setvd={setvd}
                />
              </> : <></>
          }
          {
            numStatus == 3 ?
              <>
                <TableRow
                  tabIndex={-1}
                  role="checkbox"
                  selected={selected}
                  className=" hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
                  onClick={(e) => {
                    setM3Open(true);
                  }}
                >
                  <TableCell component="th" scope="row" padding="0.4">
                    <Stack direction="column" alignItems="start" spacing={0.5}>
                      <p className="text-sm">{upVehData?.data?.vehicleType}</p>
                      <Typography variant="subtitle2" noWrap>
                        {upVehData?.vehicleNumber}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{upVehData?.current_location ? upVehData?.current_location?.location : ""}</TableCell>

                  <TableCell>{upVehData?.current_fleet[0]?.origin?.place_name ?
                    upVehData?.current_fleet[0]?.origin?.place_name : ""
                  }</TableCell>
                  <TableCell>{upVehData?.current_fleet[0]?.destination?.place_name ?
                    upVehData?.current_fleet[0]?.destination?.place_name : ""
                  }</TableCell>

                  <TableCell>
                    <Label color={'success'}>{vehicalStatus ? vehicalStatus : ""}</Label>
                  </TableCell>

                </TableRow>
                <AtPickupFleetModal vehicleType={upVehData?.data?.vehicleType} vehicleData={vd ? vd : upVehData}
                  vehicleNumber={upVehData?.vehicleNumber} status={numStatus} mopen={m3open}
                  setMOpen={setM3Open}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  setvd={setvd}
                  setM2open={setM4Open}
                />

              </> : <></>
          }
          {
            numStatus == 4 ?
              <>
                <TableRow
                  tabIndex={-1}
                  role="checkbox"
                  selected={selected}
                  className=" hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
                  onClick={(e) => {
                    setM4Open(true);
                  }}
                >
                  <TableCell component="th" scope="row" padding="0.4">
                    <Stack direction="column" alignItems="start" spacing={0.5}>
                      <p className="text-sm">{upVehData?.data?.vehicleType}</p>
                      <Typography variant="subtitle2" noWrap>
                        {upVehData?.vehicleNumber}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{upVehData?.current_location ? upVehData?.current_location?.location : ""}</TableCell>

                  <TableCell>{upVehData?.current_fleet[0]?.origin?.place_name ?
                    upVehData?.current_fleet[0]?.origin?.place_name : ""
                  }</TableCell>
                  <TableCell>{upVehData?.current_fleet[0]?.destination?.place_name ?
                    upVehData?.current_fleet[0]?.destination?.place_name : ""
                  }</TableCell>

                  <TableCell>
                    <Label color={'success'}>{vehicalStatus ? vehicalStatus : ""}</Label>
                  </TableCell>

                </TableRow>
                <InTransit vehicleType={upVehData?.vehicleType} vehicleData={vd ? vd : upVehData}
                  vehicleNumber={upVehData?.vehicleNumber} status={numStatus} mopen={m4open}
                  setMOpen={setM4Open}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  setM2open={setM5Open}
                  vd={vd}
                  setvd={setvd}

                />

              </> : <></>
          }
          {
            numStatus == 5 ?
              <>
                <TableRow
                  tabIndex={-1}
                  role="checkbox"
                  selected={selected}
                  className=" hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
                  onClick={(e) => {
                    setM5Open(true);
                  }}
                >
                  <TableCell component="th" scope="row" padding="0.4">
                    <Stack direction="column" alignItems="start" spacing={0.5}>
                      <p className="text-sm">{upVehData?.data?.vehicleType}</p>
                      <Typography variant="subtitle2" noWrap>
                        {upVehData?.vehicleNumber}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{upVehData?.current_location ? upVehData?.current_location?.location : ""}</TableCell>

                  <TableCell>{upVehData?.current_fleet[0]?.origin?.place_name ?
                    upVehData?.current_fleet[0]?.origin?.place_name : ""
                  }</TableCell>
                  <TableCell>{upVehData?.current_fleet[0]?.destination?.place_name ?
                    upVehData?.current_fleet[0]?.destination?.place_name : ""
                  }</TableCell>

                  <TableCell>
                    <Label color={'success'}>{vehicalStatus ? vehicalStatus : ""}</Label>
                  </TableCell>

                </TableRow>
                <UnloadingVehicle vehicleType={upVehData?.data?.vehicleType} vehicleData={vd ? vd : upVehData}
                  vehicleNumber={upVehData?.vehicleNumber} status={numStatus} mopen={m5open}
                  setMOpen={setM5Open}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  // setM2open={setM5Open}
                  vd={vd}
                  setvd={setvd}
                />

              </> : <></>
          }
        </>
        : <></>}
    </>
  );
}
UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};