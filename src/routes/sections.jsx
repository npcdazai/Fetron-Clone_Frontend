import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import FleetReportPage from 'src/pages/report';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const FleetPage = lazy(() => import('src/pages/fleet'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const LoadAss = lazy(() => import('src/pages/loadAss'));
export const MasterVehicle = lazy(() => import('src/pages/masterVehicle'));
export const IssueTracking =lazy(()=>import('src/pages/issueTracking')) 
export const MXLScreen = lazy(()=>import('src/pages/MxlScreen'))
// ----------------------------------------------------------------------
export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },

        {
          path: "fleets/fleet-monitoring", element: (
            <FleetPage>
              <Suspense>
                <Outlet />
              </Suspense>
            </FleetPage>
          ),
          children: [
            { path: "all", element: {} },
            { path: "available", element: {} },
            { path: "enroute-for-pickup", element: {} },
            { path: "at-pickup", element: {} },
            { path: "intransit", element: {} },
            { path: "unloading", element: {} },
            { path: "completed", element: {} }
          ]
        },
        { path: "tickets", element: <LoadAss /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'issueTracking', element: <BlogPage /> },
        { path: "master/vehicle", element: <MasterVehicle /> },

        {
          path: "driver", element: {},
          children: [
            { path: "driverList", element: {} },
            { path: "Pending", element: {} },
          ]
        }
      ],
    },
    {
      path: 'mxl-screen',
      element: <MXLScreen />,
    },
    {
      path: 'vehicle/report', element: <FleetReportPage />
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
  return routes;
}
