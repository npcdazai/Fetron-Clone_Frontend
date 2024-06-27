import SvgColor from 'src/components/svg-color';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartArea,
  faChartLine,
  faDriversLicense,
  faMagnifyingGlass,
  faMagnifyingGlassChart,
  faPager,
  faPerson,
  faQuestion,
  faScrewdriverWrench,
  faSortAmountAsc,
  faTruck,
  faTruckArrowRight,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
// import { title } from 'process';
import { FaPagelines } from 'react-icons/fa';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const dashboardIcon = () => {
  return <FontAwesomeIcon icon={faChartLine} className="text-normal" />;
};

const navConfig = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <FontAwesomeIcon icon={faChartLine} className="text-normal" />,
  },
  {
    title: 'MXL-SCREEN DASHBOARD',
    path: '/mxl-screen',
    icon: <FontAwesomeIcon icon={faChartArea} className="text-normal" />,
  },
  {
    title: 'Live Report',
    path: '/vehicle/report',
    icon: <FontAwesomeIcon icon={faPager} className="text-normal" />,
  },
  {
    title: 'Fleet Managment',
    path: '/fleets',
    icon: <FontAwesomeIcon icon={faTruck} className="text-normal" />,
    children: [
      {
        subTitle: 'Fleet Monitoring',
        subpath: '/fleet-monitoring',
        icon: <FontAwesomeIcon icon={faMagnifyingGlassChart} className="text-normal" />,
      },
      // {
      //   subTitle: 'Tickets',
      //   subpath: '/tickets',
      // },
    ],
  },
  {
    title: 'Live DashBoard',
    path: '/products',
    icon: <FontAwesomeIcon icon={faTruckArrowRight} />,
  },
  {
    title: 'Issue Tracking',
    path: '/issueTracking',
    icon: <FontAwesomeIcon icon={faQuestion} />,
  },
  {
    title: 'Master',
    path: '/master',
    icon: <FontAwesomeIcon icon={faScrewdriverWrench} className="text-normal" />,
    children: [
      {
        subTitle: 'Vehicle',
        subpath: '/vehicle',
        icon: <FontAwesomeIcon icon={faTruck} className="text-normal" />,
      },
      {
        subTitle: 'Driver',
        subpath: '/driver',
        icon: <FontAwesomeIcon icon={faUsers} className="text-normal" />,
      },
    ],
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
