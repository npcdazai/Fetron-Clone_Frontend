import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TabContext from '@mui/lab/TabContext';
import { useLocation, useNavigate } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { users } from 'src/_mock/user';
import UserTableHead from '../../fleets/user-table-head';
import UserTableToolbar from '../../fleets/user-table-toolbar';
import {driver} from 'src/data/driver';
import { usePathname } from 'src/routes/hooks';
import { useTheme } from '@emotion/react';
import { useResponsive } from 'src/hooks/use-responsive';
import { HEADER, NAV } from 'src/layouts/dashboard/config-layout';
import { bgBlur } from 'src/theme/css';
import axios from 'axios';
import { AccordionCustomIcon } from 'src/components/AAccordian';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { MdAddCircle } from "react-icons/md";
import Modal from '@mui/material/Modal';
import { borderRadius, height } from '@mui/system';
import ProcessArea from '../Components/processArea';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100vw - 3rem)',
  height: 'calc(100vh - 3rem)',
  bgcolor: 'background.paper',
  transition: 'all 0.2s ease-in',
  boxShadow: 24,
  borderRadius:"8px",
  // overflowY:"scroll"
};


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [value, setValue] = useState();
  const [pathQ, setPathQ] = useState();

  const [tabData, setTabData] = useState();

  const navigate = useNavigate();
  const pathname = usePathname();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');
  // const pathName = useLocation().pathname;

  return (
    <>

      <TabContext value={value}>
        <Box sx={{
          position: 'fixed',
          width: '100%',
          boxShadow: 'none',
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 10,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          ...(lgUp && {
            width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          }),
        }}
        >
          <Toolbar
            sx={{
              height: 1,
              px: { lg: 5 },
            }}
          >
            <Typography sx={{ flexGrow: 0 }} variant="h4">Issue Tracking</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography onClick={handleOpen} sx={{ flexGrow: 0 }} variant="h4"> <MdAddCircle style={{color:"blue"}}/></Typography>
            <UserTableToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />
          </Toolbar>
          
        </Box>
      </TabContext>
        <Box sx={{ paddingTop: "8rem" }}>
            {/* <FleetTable/> */}
        </Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <ProcessArea />
        </Box>
      </Modal>
    </>
  );
}