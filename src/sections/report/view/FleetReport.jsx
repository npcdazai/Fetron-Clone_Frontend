import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { CircularProgress, Skeleton, TableCell, TableHead, TableRow } from '@mui/material';

import { users } from 'src/_mock/user';
// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// import TableNoData from '../table-no-data';
// import UserTableRow from '../user-table-row';
import UserTableHead from '../../fleets/user-table-head';
// import TableEmptyRows from '../table-empty-rows';
// import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../../fleets/utils';
import { typeOfFleet } from 'src/data/fleet';
import { usePathname } from 'src/routes/hooks';
import { useTheme } from '@emotion/react';
import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER, NAV } from 'src/layouts/dashboard/config-layout';
import { bgBlur } from 'src/theme/css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ALoader from 'src/components/ALoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
import { fontSize, width } from '@mui/system';
import Label from 'src/components/label';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { split } from 'lodash';
import moment from 'moment';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Distance = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371;

  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);

  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

function FleetReportWithNotify() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [value, setValue] = useState();
  const [pathQ, setPathQ] = useState();

  const [allVehicles, setAllVehicles] = useState();
  const [tabData, setTabData] = useState();

  const [skipValue, setSkipValue] = useState(0);
  const [maxSkipValue, setMaxSkipValue] = useState(0);

  const [fetchVehicleLoading, setFVLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [searchArr, setSearchArr] = useState([]);

  const [openSearch, setOpenSearch] = useState(false);

  const [domopen, setDoMOpen] = useState();

  const { enqueueSnackbar } = useSnackbar();

  // const { isPending, error, data, refetch } = useQuery({
  //   queryKey: ['fleetData'],
  //   queryFn: async () => {
  //     pn = pathname.split("/")[2];
  //     setFVLoading(true);
  //     var dpn = pn;
  //     var ssk = skipValue;
  //     if (!dpn || dpn == "" || dpn == "all") {
  //       dpn = "available";
  //     }
  //     dpn = dpn.replace("-", "_")
  //     dpn = dpn.replace("-", "_")
  //     const result = await axios.get(`http://localhost:5050/y/vehicle/erpvehicles?status=${dpn}&skip=${ssk}`,
  //       { withCredentials: true }
  //     )
  //       .then((res) => {
  //         // console.log(res.data);
  //         return res.data.data;
  //         // setTabData(res.data.data);
  //       })
  //     return result;
  //     // .catch((err) => {
  //     // setTabData([]);
  //     // window.alert("Some error occurred")
  //     // console.log(err);
  //     // })
  //     // setFVLoading(false);
  //   }
  // })

  // useEffect(() => {
  //   if (isPending) {
  //     // console.log("Pending....")
  //     setFVLoading(true);
  //     setTabData([]);
  //   }
  //   else if (data) {
  //     setFVLoading(false);
  //     setTabData(data);
  //     console.log(data);
  //   }
  // }, [isPending, data, error]);

  const navigate = useNavigate();
  const pathname = usePathname();
  var pn = pathname.split('/')[3];

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');
  // const pathName = useLocation().pathname;

  async function getAllVehicles() {
    setFVLoading(true);

    await axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/y/vehicle/allvehicles`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        enqueueSnackbar('Live Data fetched', { variant: 'success' });
        var dd = [...res.data.data];
        // setAllVehicles([...dd]);
        setTabData([...dd]);

        // setMaxSkipValue(Number(res.data.dataCount));
        // setMaxSkipValue(23);
      })
      .catch((err) => {
        setTabData([]);
        enqueueSnackbar('Error occurred in fetching data', { variant: 'error' });
        // window.alert("Some error occurred")
        // console.log(err);
      });
    setFVLoading(false);
  }

  useEffect(() => {
    getAllVehicles();

    const intervalId = setInterval(getAllVehicles, 30000); // Fetch every 30 seconds

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, []);

  const vehicle_status = [
    'enroute-for-pickup',
    'enroute-for-pickup',
    'at-pickup',
    'intransit',
    'unloading',
    'completed',
  ];

  // useEffect(())

  const calculatePendingKilometers = (vehicle) => {
    if (!vehicle.current_location || !vehicle.current_fleet[0].destination) return 0;

    const currentLocation = {
      latitude: parseFloat(vehicle.current_location.lat),
      longitude: parseFloat(vehicle.current_location.lngt),
    };

    const destination = vehicle.current_fleet[0].destination;

    return Math.round(Distance(currentLocation, destination));
  };

  
  function isYesterday(date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getDate() === yesterday.getDate() &&
           date.getMonth() === yesterday.getMonth() &&
           date.getFullYear() === yesterday.getFullYear();
}
  

  return (
    <React.Fragment>
      <Container sx={{ width: '100%', maxWidth: '100%' }}>
        <Box className="z-40">
          <Card>
            <TableContainer sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 1rem)' }}>
              <Table sx={{ height: 'calc(100vh - 1rem)', borderRadius: '0.1rem' }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  // onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'Veh', label: 'Vehicle no' },
                    { id: 'capacity', label: 'Capacity' },
                    { id: 'driverName', label: 'Driver name' },
                    { id: 'driverNo', label: 'Driver no' },
                    { id: 'driverName', label: 'Driver name' },
                    { id: 'from', label: 'From' },
                    { id: 'to', label: 'To' },
                    { id: 'status', label: 'Status' },
                    { id: 'current_l', label: 'Current Location' },
                    { id: 'pending_km', label: 'Pending km' },
                    { id: 'time', label: 'Time' },
                    { id: 'party_name', label: 'Party Name' },
                    { id: 'cons_name', label: 'Consignment name' },
                    { id: 'yest_km', label: 'Yesterday km' },
                    { id: 'remark', label: 'Remark' },
                  ]}
                />
                <TableBody>
                  {tabData && tabData.length ? (
                    tabData.map((upVehData, i) => {
                      let yesterdayKm = 'N/A';

                      if (upVehData?.current_fleet?.length > 0) {
                        const destination = upVehData.current_fleet[0].destination;
                        const destinationTime = new Date(destination.time);
                        
                        if (isYesterday(destinationTime)) {
                            const origin = upVehData.current_fleet[0].origin;
                            const distance = calculateDistance(
                                origin.latitude,
                                origin.longitude,
                                destination.latitude,
                                destination.longitude
                            );
                            
                            yesterdayKm = distance.toFixed(2); // Format as needed
                        }
                    }

                        const labelClass = upVehData?.current_status
                          ? upVehData?.current_status == 1 || upVehData?.current_status == 2
                            ? 'bg-blue-100 text-blue-900'
                            : upVehData?.current_status == 3
                            ? 'bg-orange-100 text-orange-900'
                            : upVehData?.current_status == 4
                            ? 'bg-yellow-100 text-yellow-900'
                            : upVehData?.current_status == 5
                            ? 'bg-green-100 text-green-900'
                            : upVehData?.current_status == 6
                            ? 'bg-teal-100 text-teal-900'
                            : 'bg-red-100 text-red-900'
                          : 'z-0 animate-pulse bg-red-500 text-white';
                        return (
                          <TableRow
                            key={upVehData._id}
                            tabIndex={-1}
                            role="checkbox"
                            className="transition-colors duration-200 ease-in-out"
                          >
                            <TableCell sx={{ padding: '0.1rem 0.2rem', paddingLeft: '0.5rem' }}>
                              <p className="text-xs font-semibold" noWrap>
                                {upVehData?.vehicleNumber}
                              </p>
                            </TableCell>
                            <TableCell sx={{ padding: '0.1rem 0.2rem' }}>
                              {/* <p className="text-xs">
                                {upVehData?.current_fleet[0]?.origin?.place_name || ''}
                              </p> */}
                            </TableCell>
                            <TableCell sx={{ padding: '0.1rem 0.2rem' }}></TableCell>
                            <TableCell sx={{ padding: '0.1rem 0.2rem' }}></TableCell>
                            <TableCell sx={{ padding: '0.1rem 0.2rem' }}>
                              <p className="text-xs">
                                {/* {upVehData?.current_fleet[0]?.origin.place_name} */}
                              </p>
                            </TableCell>
                            <TableCell sx={{ padding: '0.1rem 0.2rem' }}>
                              <p className="text-xs">
                                {upVehData?.current_fleet[0]?.origin?.place_name || ''}
                              </p>
                            </TableCell>
                            <TableCell sx={{ padding: '0.1rem 0.2rem' }}>
                              {/* <p className="text-xs">
                                {upVehData?.current_fleet[0]?.destination?.time || ''}
                              </p> */}
                              <p className="text-xs">
                                {upVehData?.current_fleet[0]?.destination?.place_name || ''}
                              </p>
                            </TableCell>
                            <TableCell sx={{ padding: '0.1rem 0.2rem' }}>
                              <p className={`${labelClass} text-xs w-fit rounded p-1`}>
                                {upVehData?.current_status
                                  ? vehicle_status[upVehData?.current_status - 1]
                                  : 'available'}
                              </p>
                            </TableCell>
                            <TableCell sx={{ padding: '0.1rem 0.2rem' }}>
                              <p className="text-xs">
                                {upVehData?.current_location
                                  ? upVehData?.current_location?.location
                                  : ''}
                              </p>
                            </TableCell>
                            <TableCell sx={{ padding: '0.1rem 0.2rem' }}>
                              <p className="text-xs">
                                {calculatePendingKilometers(upVehData).toFixed(2)}Kms
                              </p>
                            </TableCell>

                            <TableCell sx={{ padding: '0.1rem 0.2rem' }}>
                              <p className="text-xs">
                                  <moment format="HH:MM">
                                    {(upVehData?.current_fleet[0]?.destination?.time || '')
                                      .split('')
                                      .slice(11, 19)
                                      .join('')}
                                  </moment>
                              </p>
                            </TableCell>

                            <TableCell>
                            {/* {yesterdayKm} */}
                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell sx={{ padding: '0.1rem 0.2rem' }}>
                            <p className="text-xs">
                            {yesterdayKm}
                            </p>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  ) : fetchVehicleLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                      <TableRow key={index} className="transition-colors duration-200 ease-in-out">
                        <TableCell>
                          <Skeleton variant="text" width={100} height={50} />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" width={200} height={50} />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" width={100} height={50} />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" width={100} height={50} />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" width={100} height={50} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="w-full h-full p-4 flex justify-center items-center"
                      >
                        No data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default function Loading() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={2000}
    >
      <FleetReportWithNotify />
    </SnackbarProvider>
  );
}