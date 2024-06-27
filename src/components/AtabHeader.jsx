// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import NotificationsPopover from 'src/layouts/dashboard/common/notifications-popover';

const AtabHeader = ({ tabHeader, setMOpen, setFetchAgain }) => {
  return (
    <div style={{ background: "rgba(255,255,255,0.7)" }} className="flex justify-between p-3 border-solid border-b-2 border-black bg-transparent backdrop-blur-lg sticky top-0 z-[1]">
      <div className="flex justify-center flex-row content-center">
        <p className="text-normal font-semibold">{tabHeader}</p>
      </div>
      <div className="flex h-full justify-center items-center gap-3 px-2">
        <NotificationsPopover />
        <button className='bg-slate-100 h-fit py-1 text-red-800 px-2 rounded-full text-sm hover:bg-red-900 hover:text-white'
          onClick={() => {
            // setFetchAgain(true);
            setMOpen(false);
          }}
        >
          <FontAwesomeIcon
            icon={faXmark}
          />
        </button>
      </div>
    </div>
  )
}

export default AtabHeader