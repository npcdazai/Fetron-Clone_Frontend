
import React from 'react';
import { GoHome } from "react-icons/go";
import { MdOutlineDone } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";

const CurrentTrip = ({ isOpen, setIsOpen }) => {
  // ${isOpen ? 'grid-rows-[1fr] opacity-100': 'grid-rows-[0fr] opacity-0'}
  return (
    <div className="w-full flex justify-between items-center flex-wrap flex-col gap-3 overflow-hidden transition-1 transition-opacity ease-in-out">
      <div className="flex bg-slate-50 justify-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2 w-full">
        <p className="text-normal font-semibold bg-cyan-100 w-full p-2">
          <span className="font-bold">Current Trip</span>
        </p>
        <div className="w-full p-2 flex justify-start items-start flex-col gap-2 px-4">
          <div className="flex  gap-1 justify-start items-center px-2">
            <div className="h-3 w-3 bg-blue-700 animate-pulse rounded-xl"></div> Leg Completed at 9:28 AM, 12-May
          </div>
          <div className="w-full flex justify-start items-center flex-wrap">

            <button className="flex w-80 gap-1 justify-between items-center mx-2 px-4 py-3 bg-cyan-600 rounded-lg text-white">
              <div ><GoHome /></div>
              <p style={{ marginLeft: "1rem", marginRight: "1rem" }}>APML KHASWPUR (WCPO)</p>
              <div style={{ borderRadius: "50%", backgroundColor: "green", color: "whitesmoke" }} ><MdOutlineDone /></div>
            </button>
          </div>
        </div>
        <div className="w-full p-2 flex justify-start items-start flex-col gap-2 px-4">
          <div className=" flex gap-1 justify-start items-center px-2">
            <div className="h-3 w-3 bg-blue-700 animate-pulse rounded-xl"></div> Leg Completed at 9:28 AM, 12-May
          </div>
          <div className="w-full flex justify-start items-center flex-wrap">

            <button className="flex gap-1 justify-between w-80 items-center mx-2 px-4 py-3 bg-cyan-600 rounded-lg text-white">
              <div ><MdOutlineLocationOn /></div>
              <p style={{ marginLeft: "1rem", marginRight: "1rem" }}>Delhi</p>
              <div style={{ borderRadius: "50%", backgroundColor: "green", color: "whitesmoke" }} ><MdOutlineDone /></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PreviousTrip = ({ isOpen, setIsOpen }) => {
  // ${isOpen ? 'grid-rows-[1fr] opacity-100': 'grid-rows-[0fr] opacity-0'}
  return (
    <div className="w-full flex justify-between items-center flex-wrap flex-col gap-3 overflow-hidden transition-1 transition-opacity ease-in-out">
      <div className="flex bg-slate-50 justify-center flex-col border-2 rounded-md border-gray-400  overflow-hidden gap-2 w-full">
        <p className="text-normal font-semibold bg-cyan-100 w-full p-2">
          <span className="font-bold">Previous Trip</span>
        </p>
        <div className="w-full p-2 flex justify-start items-start flex-col gap-2 px-4">
          <div className="flex  gap-1 justify-start items-center px-2">
            <div className="h-3 w-3 bg-blue-700 animate-pulse rounded-xl"></div> Leg Completed at 9:28 AM, 12-May
          </div>
          <div className="w-full flex justify-start items-center flex-wrap">

            <button className="flex w-80 gap-1 justify-between items-center mx-2 px-4 py-3 bg-cyan-600 rounded-lg text-white text-nowrap">
              <div ><GoHome /></div>
              <p style={{ marginLeft: "1rem", marginRight: "1rem", }}>APML KHASWPUR (WCPO)</p>
              <div style={{ borderRadius: "50%", backgroundColor: "green", color: "whitesmoke" }} ><MdOutlineDone /></div>
            </button>
          </div>
        </div>
        <div className="w-full p-2 flex justify-start items-start flex-col gap-2 px-4">
          <div className=" flex gap-1 justify-start items-center px-2">
            <div className="h-3 w-3 bg-blue-700 animate-pulse rounded-xl"></div>Leg Completed at 9:28 AM, 12-May
          </div>
          <div className="w-full flex justify-start items-center flex-wrap">

            <button className="flex gap-1 justify-between w-80 items-center mx-2 px-4 py-3 bg-cyan-600 rounded-lg text-white">
              <div ><MdOutlineLocationOn /></div>
              <p style={{ marginLeft: "1rem", marginRight: "1rem" }}>Delhi</p>
              <div style={{ borderRadius: "50%", backgroundColor: "green", color: "whitesmoke" }} ><MdOutlineDone /></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export { CurrentTrip, PreviousTrip };