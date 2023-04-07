import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import ApiKeysPage from 'pages/admin/keys-page';

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
          path: 'users',
          element: <UserPage />,
          breadcrumbs: true,
          title: 'Users'
        },
        {
          path: 'api-keys',
          element: <ApiKeysPage />,
          breadcrumbs: true,
          title: 'API Keys'
        }
      ]
    }
  ]
};

export default AdminRoutes;
