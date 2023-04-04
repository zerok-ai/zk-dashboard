import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// Admin menu routes
const UserPage = Loadable(lazy(() => import('pages/admin/user-page')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
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
          path: 'user',
          element: <UserPage />,
          breadcrumbs: true,
          title: 'Users'
        }
      ]
    }
  ]
};

export default AdminRoutes;
