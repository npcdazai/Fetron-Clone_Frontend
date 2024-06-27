import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import axios from "axios";
// import CreateFleetModal from './components/createFleet';
// import EnroutePickupFleetModal from './components/enroutePickup';
// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  vehicleType,
  vehicleNumber,
  company,
  role,
  vehicleData,
  isVerified,
  status,
  handleClick,
}) {
  const [mopen, setMOpen] = useState(false);
  const [locationIns, setLocationIns] = useState({ origin: 0, destination: 0 });
  const [pickAddress, setPickAddress] = useState();
  const [pick, setPick] = useState(false);

  useEffect(() => {
    // console.log(locationIns);
  }, [locationIns])

  return (
    <>
      <TableRow
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        className=" hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
        onClick={(e) => {
          setMOpen((mopen) => !mopen);
        }}
      >
        <TableCell component="th" scope="row" padding="0.4">
          <Stack direction="column" alignItems="start" spacing={0.5}>
            <p className="text-sm">
                {vehicleType}
                </p>
            <Typography variant="subtitle2" noWrap>
              {vehicleNumber}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell></TableCell>
        <TableCell>
            {/* {status == "enroute-for-pickup" && vehicleData?.current_fleet ? vehicleData?.current_fleet[0]?.origin.place_name : ""} */}
            </TableCell>

        <TableCell>
            {/* {status == "enroute-for-pickup" && vehicleData?.current_fleet ? vehicleData?.current_fleet[0]?.destination.place_name : ""} */}
        </TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>
      </TableRow>
      {/* <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
      {/* {
        status == "enroute-for-pickup" ?

          <EnroutePickupFleetModal vehicleData={vehicleData} status={status} mopen={mopen} setMOpen={setMOpen} />
          :
          <CreateFleetModal vehicleType={vehicleType} vehicleNumber={vehicleNumber} status={status} mopen={mopen} setMOpen={setMOpen} />
      } */}

    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};