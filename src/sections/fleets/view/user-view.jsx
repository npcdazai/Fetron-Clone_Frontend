import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import { useLocation, useNavigate } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { CircularProgress, Skeleton, TableCell, TableRow } from '@mui/material';

import { users } from 'src/_mock/user';
// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
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
import { width } from '@mui/system';

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

export default function UserPage() {
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

  const [searchInput, setSearchInput] = useState("");
  const [searchArr, setSearchArr] = useState([]);

  const [openSearch, setOpenSearch] = useState(false);

  const [domopen, setDoMOpen] = useState();

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
  var pn = pathname.split("/")[3];



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

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

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

  useEffect(() => {
    // var pn = pathname.split("/")[2];
    // console.log(pn);
    // setValue(pn);
    var new_value = 1;
    if (!pn) {
      setValue(1);
      return;
    }
    console.log(pn);
    for (var i = 0; i < typeOfFleet.length; i++) {
      if (typeOfFleet[i].path == pn) {
        console.log(typeOfFleet[i].id);
        setValue(typeOfFleet[i].id);
        return;
      }
    }
    // refetch();
  }, [pn])

  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');
  // const pathName = useLocation().pathname;

  async function getAllVehicles() {
    pn = pathname.split("/")[3];
    console.log(pn);
    setFVLoading(true);
    var dpn = pn;
    var ssk = skipValue;
    if (!dpn || dpn == "") {
      dpn = "all";
    }
    dpn = dpn.replace("-", "_")
    dpn = dpn.replace("-", "_")
    await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/y/vehicle/erpvehicles?status=${dpn}&skip=${ssk}`,
      { withCredentials: true }
    )
      .then((res) => {
        // console.log(res.data);
        var dd = [...res.data.data];
        setAllVehicles([...dd]);
        setTabData([...dd]);
        setMaxSkipValue(Number(res.data.dataCount));
        // setMaxSkipValue(23);
      })
      .catch((err) => {
        setTabData([]);
        window.alert("Some error occurred")
        // console.log(err);
      })
    setFVLoading(false);
  }

  useEffect(() => {
    getAllVehicles();
    // }
    // refetch();
  }, [pathname, skipValue]);



  useEffect(() => {
    if (fetchAgain) {
      getAllVehicles();
      setFetchAgain(false);
    }
  }, [fetchAgain])

  const handleSearchInput = async () => {
    if (searchInput) {
      // var ddum = [...allVehicles];
      // const filteredData = ddum.filter((el) => {
      //   return el?.vehicleNumber.toLowerCase().includes(searchInput.toLowerCase()) ||
      //     el?.current_location?.location.toLowerCase().includes(searchInput.toLowerCase()) ||
      //     el?.current_fleet?.length && el?.current_fleet[0]?.origin?.place_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      //     el?.current_fleet?.length && el?.current_fleet[0]?.destination?.place_name.toLowerCase().includes(searchInput.toLowerCase())
      // });
      // setTabData(filteredData);
      const ssinput = searchInput.toUpperCase();
      setSearchArr("loading");
      await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/y/vehicle/search?search=${ssinput}`)
        .then((res) => {
          const dumdata = [...res.data.data];
          setSearchArr([...dumdata]);
        })
    } else {
      setSearchArr([]);
      // if (allVehicles && allVehicles.length > 0) {
      //   setTabData([...allVehicles]);
      // }

      // getAllVehicles();
    }
  }

  useEffect(() => {
    // setTimeout(() => {
    //   handleSearchInput();
    // }, 200)
    // handleSearchInput();
  }, [searchInput]);

  useEffect(() => {
    if (openSearch) {
      document.getElementById("searchInputId").focus();
    }
    else {
      setDoMOpen(false);
    }
  }, [openSearch]);

  const fetchIndividualVehicle = async (erpvehicleNumber) => {
    await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/y/vehicle/oneerp?vnum=${erpvehicleNumber}`,
      { withCredentials: true }
    )
      .then((res) => {
        // setNotData({ msg: "Success", type: "success" });
        // console.log("Data fetched");
        // setvd({ ...res.data.data });
        // const mmd = true;
        // setM2open(mmd);

        // setCreateTripStatus(false);
        // console.log(mmd);
        // setMOpen((mopen) => !mopen);
        const vdata = res.data.data;
        if (!vdata) {
          window.alert("Error occurred in fetching data...");
        }
        if (!vdata?.current_status) {
          vdata.current_status = 0;
        }
        setDoMOpen(vdata);
      })
      .catch((err) => {
        console.log(err);
        window.alert("Error occurred in fetching data...");
        // setMOpen((mopen) => !mopen);
        // setFetchAgain(true);

      })
  }

  // useEffect(())

  return (
    <>
      <ALoader isLoading={fetchVehicleLoading} />
      {openSearch ?
        <div className='flex justify-center items-center flex-col fixed top-0 left-0 w-screen h-screen'
          style={{ zIndex: '1200', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(0.1rem)', pointerEvents: '' }}
        >
          <button className='fixed top-0 left-0 w-screen h-screen z-10 cursor-default' onClick={() => { setOpenSearch(false) }}></button>
          <div className='flex justify-center items-center flex-col bg-slate-100 z-20 rounded-lg py-4 border-2 border-cyan-700 border-solid border-cyan-600' style={{
            maxWidth: 'calc(90vw)',
            minWidth: 'calc(50vw)',
          }}>
            <form
              // onClick={() => { handleSearchInput() }} 
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSearchInput();
              }}
              className='w-full px-2 flex justify-center items-center gap-1'>
              <input id="searchInputId"
                className='border-2 border-slate-200 rounded-lg px-3 py-2 w-full border-2 border-cyan-100 focus:border-cyan-700 outline-0'
                placeholder='Type... and press Enter to Search'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              // type='submit'
              />
              <button className='bg-slate-700 text-white py-1 px-2 rounded-full'
                onClick={() => { handleSearchInput(); }}
              ><FontAwesomeIcon icon={faSearch} /></button>
            </form>
            <div className='w-full h-0.5 bg-slate-400 my-2'></div>

            {searchInput && searchArr && searchArr.length && searchArr != "loading" ?
              <div className='flex flex-col w-full rounded-lg gap-1 px-2 max-h-58 overflow-auto'
                style={{ maxHeight: 'calc(100vh - 20rem)' }}
              >

                {
                  searchArr.map((el, index) => {
                    const cc = el.current_status;
                    return (
                      <button className='bg-white w-full p-2 py-3 flex justify-between rounded-md hover:bg-cyan-900 hover:text-white'
                        onClick={() => {
                          // setOpenSearch(false); 
                          fetchIndividualVehicle(el.vehicleNumber)
                        }}
                      >
                        <span className='text-sm font-bold'>{el.vehicleNumber}</span>
                        <span className='text-xs'>
                          {!cc || cc == 0 ? "Available" :
                            (cc == 1 || cc == 2 ? "Enroute for pickup" :
                              cc == 3 ? "At Pickup" :
                                cc == 4 ? "Intransit" :
                                  cc == 5 ? "Unloading" :
                                    cc == 6 ? "Completed" : "")
                          }
                        </span>
                      </button>
                    )
                  })
                }
              </div>
              : <>
                {searchInput && searchArr == "loading" ?
                  <div className='flex flex-col w-full rounded-lg px-2 gap-1 max-h-58 overflow-auto'
                    style={{ maxHeight: 'calc(100vh - 20rem)' }}
                  >
                    <div className='w-full h-8 bg-slate-300 rounded-md'></div>
                    <div className='w-full h-8 bg-slate-300 rounded-md'></div>
                    <div className='w-full h-8 bg-slate-300 rounded-md'></div>
                    <div className='w-full h-8 bg-slate-300 rounded-md'></div>
                    <div className='w-full h-8 bg-slate-300 rounded-md'></div>
                  </div>
                  : <p>No Search</p>
                }
              </>
            }


          </div>




        </div>
        : <></>
      }

      <Container sx={{ width: "100%", maxWidth: "100%" }}>
        <TabContext value={value} className="w-full z-59" sx={{ width: "100%" }}>
          <Box sx={{
            // position: 'fixed',
            width: '100%',
            // boxShadow: 'none',
            // height: HEADER.H_MOBILE,
            zIndex: theme.zIndex.appBar + 10,
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            // background: "white",
            // transition: theme.transitions.create(['height'], {
            //   duration: theme.transitions.duration.shorter,
            // }),
            // ...(lgUp && {
            //   width: `calc(100% - ${NAV.WIDTH + 1}px)`,
            //   // height: HEADER.H_DESKTOP,
            // }),
          }}
          >
            <Toolbar
              sx={{
                // height: 1,
                // px: { lg: 12 },
                // width: "100%",
                // background: "grey"
              }}
              className='flex justify-between w-full'
            >
              <div className='gap-2 flex justify-start items-center'>
                <Typography variant="h5">Fleets</Typography>
                {/* <Box sx={{ flexGrow: 1 }} /> */}
                {/* <UserTableToolbar
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                /> */}
              </div>

              {/* <div className=''> */}
              <div className='flex justify-end items-center gap-2 z-50'>


                <button
                  className=' p-2 bg-slate-100 rounded-lg hover:bg-slate-200'
                  onClick={() => { setOpenSearch(true) }}
                >Search</button>
                <button className='text-sm p-2 bg-slate-100 rounded-lg hover:bg-slate-200'
                  onClick={() => {
                    setDoMOpen(false);
                    setFetchAgain(true)
                  }}
                >
                  <span className='inline-flex justify-center items-center gap-1'><FontAwesomeIcon icon={faRefresh} /> Refresh</span>
                </button>
                {/* <div className='w-fit'> */}
                {maxSkipValue > 0 ?
                  <div className='flex justify-end items-center gap-2'>
                    <button className='bg-slate-100 rounded-full px-2 py-1 hover:bg-blue-100 disabled:opacity-50 text-xs'
                      disabled={(Number(skipValue) < 10) ? true : false}
                      onClick={() => {
                        setSkipValue(skipValue - 10)
                      }}
                    ><FontAwesomeIcon icon={faLessThan} /></button>
                    <div className='text-sm'>
                      {(Number(maxSkipValue) - Number(skipValue) > 10) ?
                        <p>{Number(skipValue) + 1} - {Number(skipValue) + 10}</p>
                        : <p>{Number(skipValue) + 1} - {Number(maxSkipValue)}</p>
                      }
                    </div>
                    <button className='bg-slate-100 rounded-full px-2 py-1 hover:bg-blue-100 disabled:opacity-50 text-xs'
                      style={{ transform: 'rotate(-180deg)' }}
                      disabled={(Number(maxSkipValue) - Number(skipValue) != 0 &&
                        Number(maxSkipValue) - Number(skipValue) > 10
                      ) ? false :
                        true
                      }
                      onClick={() => {
                        if (Number(skipValue) < Number(maxSkipValue)) {
                          setSkipValue((Number(maxSkipValue) - Number(skipValue) > 10) ? (Number(skipValue) + 10) : Number(maxSkipValue));
                        }
                      }}
                    ><FontAwesomeIcon icon={faLessThan} /></button>
                    <p className='text-sm underline underline-blue-900'>Total: {maxSkipValue}</p>
                  </div>
                  : <></>}
                {/* </div> */}
              </div>

              {/* </div> */}
            </Toolbar>
            <Box sx={{
              borderBottom: 1, borderColor: 'divider', marginBottom: 2,
            }}>
              <TabList onChange={handleChange} aria-label="basic tabs example">
                {typeOfFleet.map((el, in2) => {
                  // console.log(in2);
                  return (
                    <Tab label={el.name} value={Number(in2 + 1)} onClick={() => {
                      navigate(`/fleets/fleet-monitoring/${el.path}`)
                      setSkipValue(0);
                      setMaxSkipValue(0);
                    }} />
                  )
                })}
              </TabList>
            </Box>

          </Box>
        </TabContext>
        <Box
        // className="z-40"
        //  sx={{ paddingTop: "8rem" }}
        >


          <Card>

            {/* <Scrollbar> */}
            <TableContainer sx={{ overflowY: 'auto', maxHeight: "calc(100vh - 12.5rem)" }} >
              <Table sx={{ minWidth: 800 }}>

                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  // onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'Veh', label: 'Vehicle' },
                    { id: 'current_l', label: 'Current Location' },
                    { id: 'origin', label: 'Origin' },
                    { id: 'destination', label: 'Destination' },
                    { id: 'status', label: 'Status' }
                  ]}
                />
                {/* {pn == "enroute-for-pickup" ?
                  <>
                    {tabData && tabData.length ?
                      <TableBody>
                        {tabData.map((row) => {
                          return <>
                            {
                              row?.current_fleet && row?.current_fleet.length && row?.current_fleet[0].fleetstatus?.available === "false"
                                && !row?.current_fleet[0].fleetstatus?.atpickup
                                ?
                                // && console.log(row) ?
                                <UserTableRow
                                  // Data={tabData}
                                  key={row?.data?._id}
                                  vehicleNumber={row?.data?.VEHNO}
                                  vehicleType={row?.data?.VehicleType}
                                  status="enroute-for-pickup"
                                  vehicleData={row}
                                  // company={row.DriverName}
                                  // avatarUrl={row.avatarUrl}
                                  // isVerified={row.isVerified}
                                  selected={selected.indexOf(row.name) !== -1}
                                  handleClick={(event) => handleClick(event, row.name)}
                                />
                                // <p>Hello</p>
                                : <></>
                            }
                          </>

                        }
                        )
                        }
                      </TableBody>
                      :
                      <TableBody>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                          <CircularProgress />
                        </Box>
                      </TableBody>
                    }
                  </>
                  :
                  <></>
                } */}
                {/* {pn == "undefined" || pn != "enroute-for-pickup" ? */}
                <TableBody>
                  {tabData && tabData.length ?
                    <>
                      {domopen && domopen._id ?
                        <UserTableRow
                          vehicleData={domopen}
                          fetchAgain={fetchAgain}
                          setFetchAgain={setFetchAgain}
                          selected={true}
                          // handleClick={(event) => handleClick(event, row.name)}
                          domopen={domopen}

                        />
                        :
                        <>
                          {tabData.map((row) => (
                            <UserTableRow
                              key={row?.data?._id}
                              vehicleData={row}
                              fetchAgain={fetchAgain}
                              setFetchAgain={setFetchAgain}
                              selected={false}
                              // handleClick={(event) => handleClick(event, row.name)}
                              domopen={false}
                            />
                          ))}
                        </>
                      }

                    </>
                    :
                    <>
                      {
                        fetchVehicleLoading ?
                          <TableRow
                            tabIndex={- 1}
                            role="checkbox"
                            selected={selected}
                            className=" hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
                          // onClick={(e) => {
                          //   setMOpen((mopen) => !mopen);
                          // }}
                          >
                            <TableCell><Skeleton variant="text" width={100} height={100} /></TableCell>
                            <TableCell><Skeleton variant="text" width={200} height={100} /></TableCell>
                            <TableCell><Skeleton variant="text" width={100} height={100} /></TableCell>

                            <TableCell><Skeleton variant="text" width={100} height={100} /></TableCell>

                            <TableCell>
                              <Skeleton variant="text" width={100} height={100} />
                            </TableCell>
                          </TableRow>
                          : <div className='w-full h-full p-4 flex justify-center items-center'>No data</div>
                      }
                    </>
                  }

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


      </Container >
    </>

  );
}