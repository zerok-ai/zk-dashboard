import { useEffect, useState } from 'react';

// material-ui
import { Box, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// types
import { ServiceCardProps } from 'types/services';

// project import
import MainCard from 'components/MainCard';

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

import SkeletonServicePlaceholder from 'components/cards/skeleton/ServicePlaceholder';

// ==============================|| SERVICE CARD ||============================== //

function convertNanoToMilliSeconds(value: number) {
  if (value != null) {
    let millis = value / 1000000;
    return parseFloat(millis.toFixed(2));
  }
  return 'NA';
}

function roundToTwoDecimals(value: number) {
  if (value != null) {
    return parseFloat(value.toFixed(2));
  }
  return 'NA';
}

const ServiceCard = ({
  name,
  podCount,
  httpReqThroughputIn,
  httpErrorRateIn,
  inboundConns,
  outboundConns,
  httpLatencyIn
}: ServiceCardProps) => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  let isHealthy = true;

  if (httpErrorRateIn && httpErrorRateIn > 0) {
    isHealthy = false;
  }

  return (
    <>
      {isLoading ? (
        <SkeletonServicePlaceholder />
      ) : (
        <MainCard
          content={false}
          boxShadow
          sx={{
            '&:hover': {
              transform: 'scale3d(1.02, 1.02, 1)',
              transition: 'all .4s ease-in-out'
            }
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={1.3}>
                  <Grid container direction="row" justifyContent="left" alignItems="center">
                    <Grid item xs={11}>
                      <Typography
                        component={Link}
                        to={`/service-details`}
                        color="textPrimary"
                        variant="h4"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          display: 'block',
                          textDecoration: 'none'
                        }}
                      >
                        {name}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Box>{isHealthy ? <WbSunnyIcon fontSize="large" /> : <ThunderstormIcon fontSize="large" />}</Box>
                    </Grid>
                  </Grid>

                  <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Typography
                      color="textPrimary"
                      variant="subtitle1"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                    >
                      Pods - {podCount}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                    >
                      Latency
                    </Typography>
                  </Stack>

                  <Grid container direction="row" justifyContent="center">
                    <Grid item xs={4}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Typography color="textPrimary" variant="h5">
                          {convertNanoToMilliSeconds(httpLatencyIn.p50)}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle1"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            textDecoration: 'none'
                          }}
                        >
                          p50
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Typography color="textPrimary" variant="h5">
                          {convertNanoToMilliSeconds(httpLatencyIn.p90)}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle1"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            textDecoration: 'none'
                          }}
                        >
                          p90
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Typography color="textPrimary" variant="h5">
                          {convertNanoToMilliSeconds(httpLatencyIn.p99)}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle1"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            textDecoration: 'none'
                          }}
                        >
                          p99
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Divider light variant="middle" sx={{ p: 1 }} />
                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                    >
                      Http In
                    </Typography>
                  </Stack>

                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs={6}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Typography color="textPrimary" variant="h5">
                          {roundToTwoDecimals(httpReqThroughputIn)}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle1"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            textDecoration: 'none'
                          }}
                        >
                          Throughput
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Typography color="textPrimary" variant="h5">
                          {roundToTwoDecimals(httpErrorRateIn)}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle1"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            textDecoration: 'none'
                          }}
                        >
                          Error Rate
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                  <Stack>
                    <Stack direction="row" spacing={1} alignItems="center"></Stack>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default ServiceCard;
