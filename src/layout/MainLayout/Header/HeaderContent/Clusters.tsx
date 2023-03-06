// material-ui
import { CheckCircleOutlined } from '@ant-design/icons';
import { Box, FormControl, ListItemIcon, MenuItem, Select, SelectChangeEvent } from '@mui/material';

// assets
import { useState } from 'react';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Clusters = () => {
  const [cluster, setCluster] = useState('');

  function handleClusterChange(e: SelectChangeEvent<string>) {
    setCluster(e.target.value);
  }

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select value={cluster} onChange={handleClusterChange} displayEmpty>
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
    </Box>
  );
};

export default Clusters;
