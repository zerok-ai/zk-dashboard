import { RouteObject, useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import ServiceRoutes from './ServiceRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export const allRoutes: RouteObject[] = [LoginRoutes, MainRoutes, ServiceRoutes];
export default function ThemeRoutes() {
  return useRoutes(allRoutes);
}
