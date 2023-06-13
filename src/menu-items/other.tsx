// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  ChromeOutlined,
  QuestionOutlined,
  DashboardOutlined,
  AlertOutlined,
  DeploymentUnitOutlined,
  GoldOutlined,
  BarChartOutlined,
  MenuOutlined,
  IssuesCloseOutlined,
  BuildOutlined,
  NodeIndexOutlined
} from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  DashboardOutlined,
  AlertOutlined,
  DeploymentUnitOutlined,
  GoldOutlined,
  BarChartOutlined,
  MenuOutlined,
  IssuesCloseOutlined,
  BuildOutlined,
  NodeIndexOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other: NavItemType = {
  id: 'other',
  type: 'group',
  children: [
    // {
    //   id: 'overview',
    //   breadcrumbs: false,
    //   title: <FormattedMessage id="overview" />,
    //   type: 'item',
    //   url: '/overview',
    //   icon: icons.DashboardOutlined
    // },
    {
      id: 'services',
      title: <FormattedMessage id="services" />,
      type: 'item',
      url: '/services',
      icon: icons.GoldOutlined
    },
    {
      id: 'map',
      title: <FormattedMessage id="map" />,
      type: 'item',
      url: '/map',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'traces',
      title: <FormattedMessage id="traces" />,
      type: 'item',
      url: '/traces',
      icon: icons.NodeIndexOutlined
    },
    {
      id: 'workloads',
      title: <FormattedMessage id="workloads" />,
      type: 'item',
      url: '/workloads',
      icon: icons.BuildOutlined
    },
    {
      id: 'issues',
      title: <FormattedMessage id="issues" />,
      type: 'item',
      url: '/issues',
      icon: icons.IssuesCloseOutlined
    },
    {
      id: 'metrics',
      title: <FormattedMessage id="metrics" />,
      type: 'item',
      url: '/metrics',
      icon: icons.BarChartOutlined
    },
    {
      id: 'logs & events',
      title: <FormattedMessage id="logs & events" />,
      type: 'item',
      url: '/logs-and-events',
      icon: icons.MenuOutlined
    },
    {
      id: 'alerts',
      title: <FormattedMessage id="alerts" />,
      type: 'item',
      url: '/alerts',
      icon: icons.AlertOutlined
    }
  ]
};

export default other;
