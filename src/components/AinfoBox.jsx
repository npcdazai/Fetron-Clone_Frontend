import { Button, Typography } from '@material-tailwind/react';
import { Box } from '@mui/system';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { FaHome } from "react-icons/fa";
import { FaCircleDot } from 'react-icons/fa6';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';

const ADateTimePicker = () => {
  return (
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
        <DemoItem label="">
          <DateTimePicker
            defaultValue={today}
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  )
}

const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');
const todayStartOfTheDay = today.startOf('day');
const AinfoBox = (props) => {
  return (
    <Box
      className="p-2"
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>

        <Box style={{ display: 'flex' }}>
          <Typography sx={{ fontSize: '12px', color: '#152935', marginLeft: '2.7rem' }}>
            {props.sublocation}
          </Typography>
          <Typography
            style={{ fontSize: '12px', color: '#152935', marginLeft: '1.8rem' }}
          ></Typography>
        </Box>
      </Box>
      <Box
        style={{
          color: '#1b7e8b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '15px',
        }}
      >
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <IoCheckmarkDoneCircle style={{ height: '20px', width: '20px', fontSize: '20px' }} />
          <Typography sx={{ fontSize: '16px' }}>Arrived at:</Typography>
        </Box>

        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Typography>{props.time}</Typography>
          <MdCancel style={{ color: "#e6717d", marginLeft: "5px" }} />
        </Box>
      </Box>
      <Box
        style={{
          marginTop: '15px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FaCircleDot
            style={{
              backgroundColor: '#8ec7ff',
              color: 'transparent',
              borderRadius: '50%',
              border: ' 4px   solid #bedfff',
              fontSize: '15px',
              height: '20px',
              width: '20px',
            }}
          />
          <Typography sx={{ marginLeft: '1rem' }}>Unloading Start:</Typography>
        </Box>
        <ADateTimePicker />
      </Box>
      <Box
        style={{
          marginTop: '15px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FaCircleDot
            style={{
              backgroundColor: '#d2d2d2',
              color: 'transparent',
              borderRadius: '50%',
              border: ' 4px solid #e2e2e2',
              fontSize: '15px',
              height: '20px',
              width: '20px',
            }}
          />
          <Typography sx={{ marginLeft: '1rem' }}>Unloading Finished:</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        </Box>
      </Box>
      <Box
        style={{
          marginTop: '15px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FaCircleDot
            style={{
              backgroundColor: '#d2d2d2',
              color: 'transparent',
              borderRadius: '50%',
              border: ' 4px solid #e2e2e2',
              fontSize: '15px',
              height: '20px',
              width: '20px',
            }}
          />
          <Typography sx={{ marginLeft: '1rem' }}>Depature:</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            onClick={{}}
            style={{
              backgroundColor: '#084cb4',
              color: '#000000',
              marginRight: '5px',
              padding: '10px',
            }}
          >
            {props.button}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AinfoBox;
