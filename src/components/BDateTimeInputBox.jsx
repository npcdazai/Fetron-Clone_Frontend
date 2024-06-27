import React from 'react'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {  faClock, faLocation, faXmark } from '@fortawesome/free-solid-svg-icons';

const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');
const todayStartOfTheDay = today.startOf('day');
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
const FirstComponet = (props) => {
    return (
      <div>
         <div className='w-full flex justify-center items-center flex-col'>
              <div className='w-full flex justify-between items-center flex-wrap p-4 flex-col gap-3'>
                <div className='flex justify-center items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2 w-full'
                >
                  <p className='text-normal font-semibold bg-cyan-100 w-full p-2'><span className='font-bold'>{props.vehicalStatus}</span></p>
                  <div className='w-full p-2 flex justify-start items-start flex-col gap-2 px-4'>
                    <div className='flex gap-1 justify-start items-center px-2'><div className='h-3 w-3 bg-green-900 animate-pulse rounded-xl'></div> {props.location}</div>
                    <div className='w-full flex justify-start items-center flex-wrap'>
                      <ADateTimePicker />
                      <button className='flex gap-1 justify-center items-center mx-2 px-4 py-3 bg-cyan-600 rounded-lg text-white hover:bg-cyan-500'>Mark as Enrouted for Pickup</button>

                    </div>
                    <div className='w-full flex justify-start items-center flex-wrap'>
                      <ADateTimePicker />
                      <button className='flex gap-1 justify-center items-center mx-2 px-4 py-3 bg-cyan-600 rounded-lg text-white hover:bg-cyan-500'>Mark Arrived</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
    );
  };

  const SecondComponet = (props) => {
    
    return (
      <div>
          <div className='w-full flex justify-center items-center flex-col'>
              <div className='w-full flex justify-between items-center flex-wrap p-4 flex-col gap-3'>
                <div className='flex justify-center items-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2 w-full'
                >
                  <p className='text-normal font-semibold bg-cyan-100 w-full p-2'><span className='font-bold'>{props.vehicalStatus}</span></p>
                  <div className='w-full px-4 py-2 flex justify-start items-start flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                      <p className='font-bold'>{props.information}</p>
                      <div className='flex gap-4 justify-start items-start flex-wrap pl-6'>
                        <div className='flex gap-1 justify-start items-center px-2'><FontAwesomeIcon icon={faLocation} /> <span className='font-semibold'>{props.location}</span></div>
                        <div className='flex gap-1 justify-start items-center px-2'><FontAwesomeIcon icon={faClock} /><span className='font-semibold'> {/* 19:00:00 */} {props.time}</span></div>
                      </div>
                    </div>
                    <div className='w-full flex justify-start items-center flex-wrap'>
                      <ADateTimePicker />
                      <button className='flex gap-1 justify-center items-center mx-2 px-4 py-3 bg-cyan-600 rounded-lg text-white hover:bg-cyan-500'>Mark Departed</button>

                    </div>
                  </div>

                </div>
              </div>
            </div>
      </div>
    );
  };
export  {FirstComponet , SecondComponet}