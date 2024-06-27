import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
 
export function AccordionCustomIcon(props) {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader className="ml-3 text-blue-600" onClick={() => handleOpen(1)}>{props.head}</AccordionHeader>
        <AccordionBody>
        <div >

            <div  style={{color:"-moz-initial"}} className="flex w-14 flex-col text-nowrap">
            <span className="flex mb-3 text-base">
                {props.baseLoc} :
            <span className="ml-1 text-base">
                {props.loc}
            </span>
            </span>
            </div>
    <div className="flex justify-between align-middle bg-white  rounded-none mb-3 ml-4">

            <div style={{display:"flex", alignItems:"center", marginLeft:"1rem"}} className="gap-10 ">
               <div style={{color:"#0086da",fontSize:"14px"}}>
                  {`indents - ${props.indentsNos}`}
               </div>
               <div style={{color:"#0086da",fontSize:"14px"}}>
                  {`TP-Enqquires - ${props.indentsNos}`}
               </div>
               <div style={{color:"#0086da",fontSize:"14px"}}>
                  {`Bids - ${props.indentsNos}`}
               </div>
               <div style={{color:"#0086da",fontSize:"14px"}}>
                  {`Unplanned Order -0 - ${props.indentsNos}`}
               </div>
               <button  className="bg-gray-200 rounded-md h-8 ">
                <p className="text-blue-700 text-sm p-1">{props.button}</p>
                </button>
            </div>

        <button className="bg-green-500 text-white h-9 rounded-sm text-nowrap p-2">
         {/* 1 Vrls 0 Confirmeds loads */}
         {`${props.vrlsNos} VRls ${props.nosCon} Confirmed loads`}
        </button>
    </div>
        </div>
        </AccordionBody>
      </Accordion>
    </>
  );
}