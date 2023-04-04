import { NodeIndexOutlined, IssuesCloseOutlined, BarChartOutlined, MenuOutlined, AlertOutlined } from '@ant-design/icons';
import { Typography } from '@mui/material';
import ServicePodDetails from './service-pod-details';

export type tabBarItemsType = {
  label: string;
  icon: any;
  tabContents: any;
};

export type ServiceDetailsType = {
  clusterId: string;
  ns: string;
  service: string;
  st: string;
};

export const getTabBarItems = (serviceDetails: ServiceDetailsType) => {
  const tabBarItems: tabBarItemsType[] = [
    {
      label: 'Pods',
      icon: <NodeIndexOutlined />,
      tabContents: <ServicePodDetails {...serviceDetails} />
    },
    {
      label: 'Traces',
      icon: <NodeIndexOutlined />,
      tabContents: <Typography variant="h6">Traces data to be shown here.</Typography>
    },
    {
      label: 'Issues',
      icon: <IssuesCloseOutlined />,
      tabContents: <Typography variant="h6">Issues to be shown here.</Typography>
    },
    {
      label: 'Metrics',
      icon: <BarChartOutlined />,
      tabContents: <Typography variant="h6">Metrics to be shown here.</Typography>
    },
    {
      label: 'Logs & Events',
      icon: <MenuOutlined />,
      tabContents: <Typography variant="h6">Logs & Events to be shown here.</Typography>
    },
    {
      label: 'Alerts',
      icon: <AlertOutlined />,
      tabContents: <Typography variant="h6">Alerts to be shown here.</Typography>
    }
  ];
  return tabBarItems;
};

export default getTabBarItems;
