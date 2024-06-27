import React from 'react'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

  const TABLE_ROWS = [
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      vehNo:"NL01AC2035",
      vehInfo: "50FT HB",
      summary: "New Tyre",
      ticketNO:"APMLTKT0004080",
      driverInfo: "Shikha",
      driverNo:"+91 9813438962",
      currentStatus: "Location",
      RequestStatus: "Delayed",
    }
  ];

  const TABS = [
    {
      label: "New Tyre",
      value: "new-Tyre",
    },
    {
      label: "Accident",
      value: "accident",
    },
    {
      label: "Driver Issue",
      value: "driver-Issue",
    },
    {
      label :"Calulation Issue ",
      value:"calulationIssue"
    },
    {
      label:"RTO Calls",
      value:"rto-calls"
    },
    {
      label:"Short Advance",
      value:"short-advance"
    },
  ];
  
  const TABLE_HEAD = ["Vehicle Info", "Summary", "Driver Info", "Current Status", "Request Satus"];
  const TableFleet = () => {
    return (
      <div>
          <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          {/* <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Tickets
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See Isuues about all Vehicle
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                view all
              </Button>
              <Button className="flex items-center gap-3" size="sm">
                Add member
              </Button>
            </div>
          </div> */}
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max text-nowrap boder-2 border-bl">
              <TabsHeader className='gap-2'>
                {TABS.map(({ label, value }) => (
                  <Tab className='border-2 border-blue-100 rounded-md hover:bg-blue-400 hover:text-white' key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
          </div>
        </CardHeader>
        <CardBody className=" px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody>
              {TABLE_ROWS.map(
                ({ img,vehNo ,vehInfo, summary, ticketNO,driverInfo, driverNo ,currentStatus, RequestStatus }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
  
                  return (
                    <tr  key={vehNo}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {/* <Avatar src={img} alt={name} size="sm" /> */}
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {vehNo}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {vehInfo}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {summary}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {ticketNO}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {driverInfo}
                        </Typography>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {driverNo}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {currentStatus}
                        </Typography>
                      </td>
                      <td className={`${classes} flex items-center`}>
                      <Typography
                          variant="small"
                          className="font-normal text-red-700"
                        >
                          {RequestStatus}
                        </Typography>
                        {/* <Button className='bg-black ml-4'>
                          Markd
                        </Button> */}
                      </td>    
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      
      </div>
    )
  }
  
  export default TableFleet