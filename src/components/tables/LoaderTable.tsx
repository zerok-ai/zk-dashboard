import { CircularProgress, Grid } from '@mui/material';

const LoaderTable = () => {
  return (
    <Grid container sx={{ height: '150px', width: '100%' }} direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default LoaderTable;
