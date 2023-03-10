// material-ui
import { CheckCircleOutlined, FolderAddOutlined } from '@ant-design/icons';
import { SelectChangeEvent, FormControl, Select, MenuItem, ListItemIcon, Divider, Box } from '@mui/material';

import { ClusterContext } from 'contexts/ClusterContext';

// assets
import { useState } from 'react';
import ClusterInstructionsModal from './ClusterInstructionsModal';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Clusters = () => {
  const [cluster, setCluster] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <ClusterInstructionsModal open={open} handleClose={handleClose} />
      <ClusterContext.Consumer>
        {({ getSelectedCluster, onSetSelectedCluster }: any) => {
          const selectedDomain = getSelectedCluster().domain;

          function handleClusterChange(e: SelectChangeEvent<string>) {
            if (e.target.value === 'add') {
              handleOpen();
              return;
            }
            onSetSelectedCluster(0);
            setCluster(e.target.value);
          }

          return (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select value={selectedDomain || cluster} onChange={handleClusterChange} displayEmpty>
                <MenuItem value="" disabled>
                  Target Cluster
                </MenuItem>
                <MenuItem value={'devpx07.getanton.com'}>
                  <ListItemIcon color="success">
                    <CheckCircleOutlined />
                  </ListItemIcon>
                  devpx07.getanton.com
                </MenuItem>
                <MenuItem value={'demo.getanton.com'}>
                  <ListItemIcon color="success">
                    <CheckCircleOutlined />
                  </ListItemIcon>
                  demo.getanton.com
                </MenuItem>
                <MenuItem value={'miltonGreen.getanton.com'}>
                  <ListItemIcon color="success">
                    <CheckCircleOutlined />
                  </ListItemIcon>
                  miltonGreen.getanton.com
                </MenuItem>
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
