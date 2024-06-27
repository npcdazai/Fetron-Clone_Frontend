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
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { CircularProgress, Skeleton, TableCell, TableRow } from '@mui/material';
import { users } from 'src/_mock/user';
import Scrollbar from 'src/components/scrollbar';
import UserTableHead from '../fleets/user-table-head';
import { emptyRows, applyFilter, getComparator } from '../fleets/utils';
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


  const getTimeDifference = (endTime) => {
    const currentTime = new Date();
    const pickupEndTime = new Date(endTime);
    let timeDifference = currentTime - pickupEndTime;
  
    // Convert milliseconds to seconds, then to hours
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    // Calculate remaining time difference in milliseconds
    timeDifference = timeDifference % (1000 * 60 * 60);
  
    // Convert remaining milliseconds to minutes
    const minutes = Math.floor(timeDifference / (1000 * 60));
  
    // If the difference is more than or equal to 24 hours
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
  
      // Format days, hours, and minutes
      const formattedDays = days.toString();
      const formattedHours = remainingHours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
  
      return `${formattedDays} d ${formattedHours} h ${formattedMinutes} m`;
    } else {
      // Format hours and minutes
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
  
      return `${formattedHours} h ${formattedMinutes} m`;
    }
  };
  
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

  // useEffect(())
  
  return (
    <React.Fragment>
      <Container sx={{ width: '40%', maxWidth: '100%' }}>
      <div style={{color:"white"}}>Unloading</div>
        <Box className={`z-40`}
         >
          <Card>
            {/* <Scrollbar> */}
            <TableContainer>
              <Table sx={{ minWidth: 450 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'Veh', label: 'Vehicle no' },
                    { id: 'place', label: 'Place' },
                    { id: 'count', label: 'Count-Up' },
                  ]}
                />
                <TableBody sx={{width:"100%",overflow:"auto"}}>
                  {tabData && tabData.length ? (
                    <>
                      {tabData
                        .filter((vehicle) => vehicle.current_status===5)
                        .map((upVehData, i) => {
                            const timeDifference = getTimeDifference(upVehData?.current_fleet[0]?.fleetstatus?.intransit);

                          return (
                            <TableRow
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell sx={{ padding: '0.1rem 0.2rem', paddingLeft: '0.5rem' }}>
                                <p className="text-xs font-semibold" noWrap>
                                  {upVehData?.vehicleNumber}
                                </p>
                              </TableCell>
            
                              <TableCell sx={{ padding: '0.1rem 0.2rem' }}>
                                <p className="text-xs">
                                  {upVehData?.current_fleet[0]?.origin?.place_name
                                    ? upVehData?.current_fleet[0]?.origin?.place_name
                                    : ''}
                                </p>
                              </TableCell>

                              <TableCell sx={{ padding: '0.1rem 0.2rem' }}>
                                <p className="text-xs">
                                  {/* {upVehData?.current_fleet[0]?.destination?.place_name
                                    ? upVehData?.current_fleet[0]?.destination?.place_name
                                    : ''} */}
                                    {timeDifference}
                                </p>
                              </TableCell>
                              {/* <TableCell sx={{ padding: '0.1rem 0.2rem' }}>
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
                              </TableCell> */}
                            </TableRow>
                          );
                        })}
                    </>
                  ) : (
                    <>
                      {fetchVehicleLoading ? (
                        <>
                          <TableRow
                            // tabIndex={- 1}
                            role="checkbox"
                            // selected={selected}
                            className=" transition-colors duration-200 ease-in-out"
                            // onClick={(e) => {
                            //   setMOpen((mopen) => !mopen);
                            // }}
                          >
                            <TableCell>
                              <Skeleton variant="text" width={100} height={50} />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            role="checkbox"
                            className=" transition-colors duration-200 ease-in-out"
                          >
                            <TableCell>
                              {/* <Skeleton variant="text" width={100} height={50} /> */}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            role="checkbox"
                            className=" transition-colors duration-200 ease-in-out"
                          >
                            <TableCell>
                              {/* <Skeleton variant="text" width={100} height={50} /> */}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            role="checkbox"
                            className=" transition-colors duration-200 ease-in-out"
                          >
                            <TableCell>
                              <Skeleton variant="text" width={100} height={50} />
                            </TableCell>
                          </TableRow>
                          <TableRow
                            role="checkbox"
                            className=" transition-colors duration-200 ease-in-out"
                          >
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
                          <TableRow
                            role="checkbox"
                            className=" transition-colors duration-200 ease-in-out"
                          >
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
                          <TableRow
                            // tabIndex={- 1}
                            role="checkbox"
                            // selected={selected}
                            className=" transition-colors duration-200 ease-in-out"
                          >
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
                          <TableRow>
                            <TableCell>
                              <Skeleton variant="text" width={100} height={50} />
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <div className="w-full h-full p-4 flex justify-center items-center">
                          No data
                        </div>
                      )}
                    </>
                  )}
                </TableBody>
                {/* : <></>
                } */}
              </Table>
            </TableContainer>
            {/* </Scrollbar> */}

            {/* <TablePagination
              page={page}
              count={users.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              // rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
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
