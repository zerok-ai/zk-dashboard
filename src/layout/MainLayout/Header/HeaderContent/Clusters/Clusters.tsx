// material-ui
import { CheckCircleOutlined, FolderAddOutlined } from '@ant-design/icons';
import { SelectChangeEvent, FormControl, Select, MenuItem, ListItemIcon, Divider, Box, Grid, Button } from '@mui/material';

import { ClusterContext } from 'contexts/Cluster/ClusterContext';

// assets
import { useState, useEffect } from 'react';
import ClusterInfo from 'types/models/ClusterInfo';
import ClusterInstructionsModal from '../ClusterInstructionsModal';
import BlockingModal from '../BlockingModal';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Clusters = () => {
  const [selectedCluster, setSelectedCluster] = useState('');
  const [clusterList, setClusterList] = useState([] as ClusterInfo[]);
  const [loading, setLoading] = useState(true);
  const [clusterInstructionsOpen, setClusterInstructionsOpen] = useState(false);
  const [blockingOpen, setBlockingOpen] = useState(true);
  const [fetchingClusterList, setFetchingClusterList] = useState(true);
  const handleClusterInstructionOpen = () => setClusterInstructionsOpen(true);
  const handleClusterInstructionClose = () => setClusterInstructionsOpen(false);

  const handleBlockingOpen = () => setBlockingOpen(false);
  const handleBlockingClose = () => setBlockingOpen(false);

  const getDropdownItems = (clusterList: ClusterInfo[]) => {
    if (clusterList && clusterList.length > 0) {
      return clusterList.map((cluster: ClusterInfo, index: number) => (
        <MenuItem value={cluster.cluster_id} key={cluster.cluster_id}>
          <ListItemIcon color="success">
            <CheckCircleOutlined />
          </ListItemIcon>
          {cluster.cluster_name}
        </MenuItem>
      ));
    }
  };

  useEffect(() => {
    handleBlockingOpen();
  }, [blockingOpen]);

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <ClusterInstructionsModal open={clusterInstructionsOpen} handleClose={handleClusterInstructionClose} />
      <BlockingModal open={blockingOpen} handleClose={handleBlockingClose} isFetching={fetchingClusterList} />
      <ClusterContext.Consumer>
        {({ onSetSelectedCluster, updateClusterList, onChange }: any) => {
          onChange = () => {
            console.log('it changed');
          };

          function handleClusterChange(e: SelectChangeEvent<string>) {
            if (e.target.value === 'add') {
              handleClusterInstructionOpen();
              return;
            }
            onSetSelectedCluster(e.target.value);
            setSelectedCluster(e.target.value);
          }

          const handleRefresh = () => {
            updateClusterList().then((clusterListParam: ClusterInfo[]) => {
              if (!loading) return;
              console.log(clusterListParam);
              if (clusterListParam) {
                setClusterList(clusterListParam);
                setLoading(false);
                if (selectedCluster === '' && clusterListParam && clusterListParam.length > 0) {
                  setSelectedCluster(clusterListParam[0].cluster_id);
                  onSetSelectedCluster(clusterListParam[0].cluster_id);
                }
              } else {
                setFetchingClusterList(false);
              }
            });
          };

          handleRefresh();

          return (
            <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mb: 3, ml: 3 }}>
              <Grid item>
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
              </Grid>
              <Grid item>
                <Button onClick={handleRefresh} sx={{ mt: 1, mr: 1 }}>
                  Refresh
                </Button>
              </Grid>
            </Grid>
          );
        }}
      </ClusterContext.Consumer>
    </Box>
  );
};

export default Clusters;
