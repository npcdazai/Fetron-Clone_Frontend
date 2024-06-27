import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';
import { useLocation } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars, faChartLine } from '@fortawesome/free-solid-svg-icons';
// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');
  const [slide, setSlide] = useState();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      {/* <Avatar src={account.photoURL} alt="photoURL" /> */}

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">
          {/* {account.displayName} */}
          APML
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {/* {account.role} */}
          Tracking App
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <div className='flex justify-between items-center w-full px-5 py-5'>
        <Logo />
        <button onClick={() => { setSlide(true) }}
          className='py-1 px-3 rounded-full bg-slate-200 hover:bg-blue-200'
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

      </div>


      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />

      {/* {renderUpgrade} */}
    </Scrollbar>
  );

  return (
    <>
      {/* {slide ? */}

      <div className='h-full w-fit pl-3 pt-3 fixed'
        style={{ zIndex: 1000 }}
      >
        <button onClick={() => { setSlide(false) }}
          className='py-1 px-3 rounded-full bg-slate-200 hover:bg-blue-200'
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* : */}
      <Box
        sx={{
          // flexShrink: { lg: 0 },
          width: slide ? "0" : NAV.WIDTH,
          // width: "0",
          zIndex: 1001,

          // background: "white",
          // position: 'fixed',
          transition: "0.3s all ease-out"
        }}
      >
        <Box
          sx={{
            height: 1,
            // width: "fit-content",
            // position: slide ? "relative" : "fixed",
            // position: 'fixed',
            // left: slide ? { lg: -NAV.WIDTH } : "0",
            width: slide ? "0" : NAV.WIDTH,
            background: "white",
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
        {/* {upLg ? (
          <Box
            sx={{
              height: 1,
              // width: "fit-content",
              position: slide ? "relative" : "fixed",
              // width: NAV.WIDTH,
              background: "white",
              borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            {renderContent}
          </Box>
        ) : (
          <Drawer
            open={openNav}
            onClose={onCloseNav}
            PaperProps={{
              sx: {
                width: NAV.WIDTH,
              },
            }}
          >
            {renderContent}
          </Drawer>
        )} */}
      </Box >
      {/* } */}
    </>


  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------


function NavItem({ item }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const pathname = location.pathname;
  const par = pathname.split('/');


  const handleToggle = () => {
    setOpen(!open);
  };

  // console.log(pathname.split("/"));

  // const active = pathname.includes(item.path);
  // console.log(item.path, pathname);

  return (
    <>
      <ListItemButton
        onClick={item.children && handleToggle}
        component={item.children ? Box : RouterLink} // Fix component prop for non-children items
        to={item.path}
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'text.secondary',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightMedium',
          ...(par[1] == item.path.split("/")[1] && {
            color: 'primary.main',
            fontWeight: 'fontWeightSemiBold',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            },
          }),
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 1 }}>
          {item.icon}
          {/* <FontAwesomeIcon icon={faChartLine} className='text-normal' /> */}
        </Box>
        <Typography variant="subtitle1">{item.title}</Typography>
        <Box sx={{ marginLeft: "10px" }}>
          {item.children && (open ? <IoMdArrowDropup className="h-3" /> : <IoMdArrowDropdown className="h-3" />)}
        </Box>
      </ListItemButton>

      {item.children && (
        <Stack sx={{ display: open ? 'block' : 'none' }}>
          {item.children.map((child, index) => (
            <ListItemButton
              key={index}
              component={RouterLink}
              to={item.path + child.subpath}
              sx={{
                marginLeft: "2rem",
                minHeight: 44,
                borderRadius: 0.75,
                typography: 'body2',
                color: 'text.secondary',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightMedium',
                ...(child.subpath && par[2] == child.subpath.split("/")[1] && {
                  color: 'primary.main',
                  fontWeight: 'fontWeightSemiBold',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                  },
                }),
              }}
            >
              <Box component="span" sx={{ width: 24, height: 24, mr: 1 }}>
                {child?.icon ? child.icon : ""}
                {/* <FontAwesomeIcon icon={faChartLine} className='text-normal' /> */}
              </Box>
              <Typography variant="subtitle2">{child.subTitle}</Typography>
            </ListItemButton>
          ))}
        </Stack>
      )}
      {/* {console.log(pathname)} */}
    </>
  );

}
NavItem.propTypes = {
  item: PropTypes.object,
};