import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const ServicesListPage = Loadable(lazy(() => import('pages/services/services-list')));
const ServiceDetailsPage = Loadable(lazy(() => import('pages/services/service-details')));

// ==============================|| MAIN ROUTING ||============================== //

const ServiceRoutes = {
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
          path: 'services',
          element: <ServicesListPage />
        },
        {
          path: 'service-details/:clusterId/:ns/:service',
          title: 'service-details',
          element: <ServiceDetailsPage />
        }
      ]
    }
  ]
};

export default ServiceRoutes;
