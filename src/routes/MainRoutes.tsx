import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// pages routing
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

// render - sample page
const OverviewPage = Loadable(lazy(() => import('pages/overview/overview-page')));
const ServicesPage = Loadable(lazy(() => import('pages/services/services-page')));
const MapPage = Loadable(lazy(() => import('pages/map/map-page')));
const TracesPage = Loadable(lazy(() => import('pages/traces/traces-page')));
const WorkloadsPage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const IssuesPage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const MetricsPage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const LogsPage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const AlertsPage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'overview',
          element: <OverviewPage />
        },
        {
          path: 'services',
          element: <ServicesPage />
        },
        {
          path: 'map',
          element: <MapPage />
        },
        {
          path: 'traces',
          element: <TracesPage />
        },
        {
          path: 'workloads',
          element: <WorkloadsPage />
        },
        {
          path: 'issues',
          element: <IssuesPage />
        },
        {
          path: 'metrics',
          element: <MetricsPage />
        },
        {
          path: 'logs-and-events',
          element: <LogsPage />
        },
        {
          path: 'alerts',
          element: <AlertsPage />
        }
      ]
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    }
  ]
};

export default MainRoutes;
