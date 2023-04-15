import { Grid, Typography } from '@mui/material';

const KeyValueTable = ({ value }: { value: string }) => {
  const printAsString = () => {
    return (
      <Typography variant="body1" sx={{ textTransform: 'none', fontFamily: 'monospace' }}>
        {value?.toString() || '-'}
      </Typography>
    );
  };

  try {
    const keyValuePair = JSON.parse(value);
    const keys = Object.keys(keyValuePair);
    if (keys.length === 0) {
      return printAsString();
    }
    if (Array.isArray(keyValuePair)) {
      return printAsString();
    }
    return (
      <>
        {keys.map((key, idx) => {
          return (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} key={idx}>
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
    return printAsString();
  }
};

export default KeyValueTable;
