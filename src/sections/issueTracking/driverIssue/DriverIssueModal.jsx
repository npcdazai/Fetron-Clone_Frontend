import { useState } from 'react';
import AtabHeader from 'src/components/AtabHeader';
import { Textarea } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
// ----------------------------------------------------------------------
export default function ProductsView() {
  return (
    <div className='h-[80vh] overflow-y-scroll'>
        <div className="bg-white px-4 py-2 w-full overflow-y-scroll ">
          <h2 className="text-lg font-bold mb-2">Driver Issue</h2>
          <div className="flex justify-between gap-2">
            <p className="text-gray-600">
              Assigned to: <span class="font-bold">ControlRoom Calldesk</span>
            </p>
            <p className="text-gray-600">
              Due Date: <span class="font-bold">May 22, 8:21 PM</span>
            </p>
            <button className=" hover:bg-gray-200 text-blue-600 font-bold py-2 px-4 rounded border-2 border-blue-600">
              Mark Resolved
            </button>
          </div>
        </div>
        <div className="p-4 bg-white  ">
          <h2 className="text-lg font-bold mb-2">Description</h2>
          <Textarea
            size="lg"
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your Description here..."
          ></Textarea>
        </div>
        <div className="p-4 bg-white overflow-scroll">
          <h2 className="text-lg font-bold mb-2">Filed</h2>
          <h2 className="text-lg mb-2">Issue Filed</h2>
          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Other Expenses
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Fooding"
                  required
                />
              </div>
              <div>
                <label
                  for="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  AMOUNT
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="2000"
                  required
                />
              </div>
              <div>
                <label
                  for="company"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Adv slip No ;
                </label>
                <input
                  type="text"
                  id="company"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  for="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  OTHER EXPENSE DETAIL
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>

              <label
                for="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Select an Payment option
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected> Bank</option>
                <option >Fuel Card</option>
              </select>
          </form>
        </div>
    </div>
  );
}
