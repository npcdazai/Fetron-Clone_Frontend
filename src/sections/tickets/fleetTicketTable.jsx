import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';
function createData(name) {
  return {
    name,
    value: [
      {
        type: 'newTyre',
        vehNo: 'NH7248',
        summary: 'Tyre-Type',
        subTicket: 'APML10032',
        driverInfo: 'Mandal',
        currentStatus: 'NH 44, Sector - 6, Channi Himmat, Jammu, 180015',
        requestStatus: 'Delayed',
      },
      // {
      //   type: 'accident',
      //   vehNo: '2020-01-05',
      //   summary: 'Tyre-Type',
      //   subTicket: 'APML10032',
      //   driverInfo: 'NH 44, Sector - 6, Channi Himmat, Jammu, 180015',
      //   currentStatus: 'Vee',
      //   requestStatus: 'Delayed'
      // }
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [isShow, setIsShow] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                New Tyre -4
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  {/* <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow> */}
                </TableHead>
                <TableBody>
                  {row.value.map((historyRow) => (
                    <TableRow align='right' key={historyRow.vehNo}>
                      <TableCell align='right' component="th" scope="row">
                        {historyRow.vehNo}
                      </TableCell>
                      <TableCell align='right'>
                        <p>{historyRow.summary}</p>
                        <p className="text-xs text-blue-600 ">{historyRow.subTicket}</p>
                      </TableCell>
                      <TableCell align='right'>{historyRow.driverInfo}</TableCell>
                      <TableCell align='right'>{historyRow.currentStatus}</TableCell>
                      <TableCell
                        className="relative"
                        onMouseEnter={() => setIsShow(true)}
                        onMouseLeave={() => setIsShow(false)}
                      >
                        {isShow && (
                          <div className="absolute">
                            <ButtonTable />
                          </div>
                        )}
                        {historyRow.requestStatus}
                      </TableCell>
                      <TableCell>
                        {/* <button className='bg-gray-100 border-2 border-blue-400 rounded-md p-1 shadow-slate-400 hover:bg-blue-600'>Mark Resolved</button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const rows = [createData('New Tyre'), createData('Accident')];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Vehicle Info.</TableCell>
            <TableCell>Summary</TableCell>
            <TableCell>Driver Info.</TableCell>
            <TableCell>Current Status</TableCell>
            <TableCell>Request Status</TableCell>
            {/* <TableCell >Updates</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
function ButtonTable() {
  return (
    <div>
      <button className="bg-gray-100 border-2 border-blue-400 rounded-md p-1 shadow-slate-400 hover:bg-blue-600">
        Mark Resolved
      </button>
    </div>
  );
}
