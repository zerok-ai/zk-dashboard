// material-ui
import { CheckCircleOutlined } from '@ant-design/icons';
import { Box, FormControl, ListItemIcon, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { ClusterContext } from 'contexts/ClusterContext';

// assets
import { useState } from 'react';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Clusters = () => {
  const [cluster, setCluster] = useState('');

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <ClusterContext.Consumer>
        {({ getSelectedCluster, onSetSelectedCluster }: any) => {
          const selectedDomain = getSelectedCluster().domain;

          function handleClusterChange(e: SelectChangeEvent<string>) {
            onSetSelectedCluster(1);
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
              </Select>
            </FormControl>
          );
        }}
      </ClusterContext.Consumer>
    </Box>
  );
};

export default Clusters;
