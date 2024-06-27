import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';

import { NAV, HEADER } from './config-layout';

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }) {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'auto',
        // width: '100%',
        // py: `${HEADER.H_MOBILE}px`,
        // ...(lgUp && {
        //   px: 1,
        //   pt: `${HEADER.H_DESKTOP}px`,
        //   pb: "2px",
        //   width: `calc(100% - ${NAV.WIDTH}px)`,
        // }),
        px: 1,
        pt: `${HEADER.H_DESKTOP}px`,
        pb: "2px",
        // width: `calc(100% - ${NAV.WIDTH}px)`,
        width: `calc(100%)`,
        ...sx,
        // pb: "0",
        // height: "100vh"
      }}
    // {...other}
    >
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
