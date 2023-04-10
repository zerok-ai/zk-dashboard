import { Grid, Typography } from '@mui/material';

const KeyValueTable = ({ value }: { value: string }) => {
  try {
    const keyValuePair = JSON.parse(value);
    const keys = Object.keys(keyValuePair);
    if (keys.length === 0) {
      return <Typography variant="body1"> {value || '-'} </Typography>;
    }
    return (
      <>
        {keys.map((key) => {
          return (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={3}>
                <Typography variant="caption">
                  <b>{key}</b>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="caption">{keyValuePair[key]}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </>
    );
  } catch (err) {
    return <Typography variant="body1"> {value || '-'} </Typography>;
  }
};

export default KeyValueTable;
