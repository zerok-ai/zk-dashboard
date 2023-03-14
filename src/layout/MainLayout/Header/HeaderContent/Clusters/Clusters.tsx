// material-ui
import {
  CheckCircleOutlined,
  FolderAddOutlined,
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  PauseCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { SelectChangeEvent, FormControl, Select, MenuItem, ListItemIcon, Divider, Box } from '@mui/material';

import { ClusterContext } from 'contexts/Cluster/ClusterContext';

// assets
import { useState } from 'react';
import ClusterInfo from 'types/models/ClusterInfo';
import ClusterInstructionsModal from '../ClusterInstructionsModal';
import { ClusterHealthStatus } from './models';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Clusters = () => {
  const [selectedCluster, setSelectedCluster] = useState('');
  const [clusterList, setClusterList] = useState([] as ClusterInfo[]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getClusterIcon = (healthStatus: string) => {
    switch (healthStatus) {
      case ClusterHealthStatus.CS_UNKNOWN:
        return <QuestionCircleOutlined />;
      case ClusterHealthStatus.CS_HEALTHY:
        return <CheckCircleOutlined />;
      case ClusterHealthStatus.CS_UNHEALTHY:
        return <CloseCircleOutlined />;
      case ClusterHealthStatus.CS_DISCONNECTED:
        return <PauseCircleOutlined />;
      case ClusterHealthStatus.CS_UPDATING:
        return <ClockCircleOutlined />;
      case ClusterHealthStatus.CS_CONNECTED:
        return <CheckCircleOutlined />;
      case ClusterHealthStatus.CS_UPDATE_FAILED:
      case ClusterHealthStatus.CS_DEGRADED:
      default:
        return <ExclamationCircleOutlined />;
    }
  };

  const blockedClusterStatus: string[] = [
    ClusterHealthStatus.CS_UNKNOWN,
    ClusterHealthStatus.CS_DISCONNECTED,
    ClusterHealthStatus.CS_DEGRADED
  ];

  const getDropdownItems = (clusterList: ClusterInfo[]) => {
    if (clusterList && clusterList.length > 0) {
      return clusterList.map((cluster: ClusterInfo, index: number) => (
        <MenuItem value={cluster.cluster_id} key={cluster.cluster_id}>
          <ListItemIcon color="success" title={cluster.status}>
            {getClusterIcon(cluster.status)}
          </ListItemIcon>
          {cluster.cluster_name}
        </MenuItem>
      ));
    }
  };

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <ClusterInstructionsModal open={open} handleClose={handleClose} />
      <ClusterContext.Consumer>
        {({ onSetSelectedCluster, updateClusterList }: any) => {
          updateClusterList().then((clusterListParam: ClusterInfo[]) => {
            if (!loading) return;
            clusterListParam = clusterListParam.filter((cluster) => {
              return blockedClusterStatus.indexOf(cluster.status) < 0;
            });
            console.log(clusterListParam);
            setClusterList(clusterListParam);
            setLoading(false);
            if (selectedCluster === '' && clusterListParam && clusterListParam.length > 0) {
              setSelectedCluster(clusterListParam[0].cluster_id);
              onSetSelectedCluster(clusterListParam[0].cluster_id);
            }
          });

          function handleClusterChange(e: SelectChangeEvent<string>) {
            if (e.target.value === 'add') {
              handleOpen();
              return;
            }
            onSetSelectedCluster(e.target.value);
            setSelectedCluster(e.target.value);
          }

          return (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select value={selectedCluster} onChange={handleClusterChange} displayEmpty>
                <MenuItem value="" disabled>
                  Target Cluster
                </MenuItem>
                {getDropdownItems(clusterList)}
                <Divider light />
                <MenuItem value={'add'}>
                  <ListItemIcon color="info">
                    <FolderAddOutlined />
                  </ListItemIcon>
                  Add another cluster
                </MenuItem>
              </Select>
            </FormControl>
          );
        }}
      </ClusterContext.Consumer>
    </Box>
  );
};

export default Clusters;
