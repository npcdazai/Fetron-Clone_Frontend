import React, { useState } from 'react'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


import UseAutocompletePopper from 'src/components/AAutocompleteInput';
import AAutoCI2 from './AAutoCI2';


const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');
const todayStartOfTheDay = today.startOf('day');

const ALocationInputBox = ({
  statusUpdate
  // location,
  // setLocation,
  // time,
  // setTime
}) => {
  const [address, setAddress] = useState({
    streetAndNumber: "",
    place: "",
    region: "",
    postcode: "",
    country: "",
    latitude: "",
    longitude: "",
  });
  const [location, setLocation] = useState({});
  const [time, setTime] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (address.streetAndNumber) {
      console.log("Selected address:", address);
    }
  };

  const handleManualInputChange = (event, stateProperty) => {
    const newAddress = { ...address };
    newAddress[stateProperty] = event.target.value;

    setAddress(newAddress);
  };

  return (


    <div className='h-full flex justify-start items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2'
      style={{ width: "calc(50% - 1rem)" }}
    >
      <p className='text-normal font-semibold bg-cyan-100 w-full p-2'>{statusUpdate}</p>
      <div className='flex flex-col justify-between h-full w-full p-2'>

        <UseAutocompletePopper />

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
                onAccept={(newValue) => { setTime(time => newValue) }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>

    </div>

  )
}



export default ALocationInputBox