import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { PreviousTrip, CurrentTrip } from "./DropDownMenu";

export function ModalTabs({ isOpen, setIsOpen }) {
  const data = [
    {
      label: "Current Trip",
      value: "curent-Trip",
      desc: <CurrentTrip isOpen={isOpen} setIsOpen={setIsOpen} />
    },
    {
      label: "Previous Trips",
      value: "Previous-Trips",
      desc: <PreviousTrip isOpen={isOpen} setIsOpen={setIsOpen} />
    },
  ];

  return (
    <>
      {isOpen ?
        <div className="w-full z-0 duration-600 transition-opacity ease-out">
          <Tabs className="w-full" value="curent-Trip" orientation="vertical">
            <TabsHeader className="h-full w-fit rounded-md overflow-hidden border-solid border-gray-400 border-2 divide-gray-400 divide-y-2 divide-solid p-0">
              {data.map(({ label, value }) => (
                <Tab className="bg-slate-100 font-semibold active:bg-sky-300 hover:bg-slate-200 text-cyan-900 h-full" key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className=" ">
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value} className="py-0">
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
        : <></>
      }
    </>


  );
}
export default ModalTabs