import React from 'react';
import { buttons } from '../../../commondatda';
import DriverIssueModal from '../driverIssue/DriverIssueModal';
export default function listButtons() {
  return (
    <div className="flex">
      <div className="flex-grow-[2] h-[100%] border-r-2 border-indigo-500">
        {buttons.map((text) => {
          return (
            <div className="md:flex ml-2 mt-2 flex-col h-full ">
              <ul className="text-white w-32 bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">
                <li>
                  <a href="#">{text}</a>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
      <div className="flex-grow-[7] bg-green-500">
        <DriverIssueModal />
      </div>
    </div>
  );
}
