import React from 'react';
import Available from "../Available"
import Loading from '../Loading';
import Unloading from '../Unloading';
const MainScreen = () => {
  return (
    <div style={{height:"100vh"}} className="bg-slate-900 py-4 px-6 shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4">MXL-SCREEN</h2>
      <p className="text-sm text-gray-400 mb-8">
       MXL-SCREEN
      </p>

      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-full text-white p-2 mr-2">13</div>
          <span className="text-sm text-gray-400 font-semibold">Active</span>
        </div>
        <div className="flex items-center">
          <div className="bg-red-500 rounded-full text-white p-2 mr-2">2</div>
          <span className="text-sm text-gray-400 font-semibold">Cancelled</span>
        </div>
      </div>

        <Available/>
      <div className="bg-slate-900 p-4 rounded-lg flex ">
        <Loading/>
        <Unloading/>
      </div>
    </div>
  );
};

export default MainScreen;
