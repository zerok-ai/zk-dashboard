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

import { convertNanoToMilliSeconds, roundToTwoDecimals } from 'utils/math';

// ==============================|| SERVICE CARD ||============================== //

function addMillisTypography(millis: number | string) {
  if (millis != null) {
    return (
      <>
        {millis}
        <Typography variant="caption">ms</Typography>
      </>
    );
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

  const stripNS = (nameStr: string) => {
    return nameStr.split('/')[1];
  };

  const getFormattedServiceName = (nameStr: string) => {
    try {
      let namesObj = JSON.parse(nameStr);
      nameStr = namesObj.map((itemName: string) => stripNS(itemName)).join(', ');
      return nameStr;
    } catch (err) {}
    return stripNS(nameStr);
  };

  const getNamespace = (nameStr: string) => {
    try {
      let namesObj = JSON.parse(nameStr);
      nameStr = namesObj[0];
    } catch (err) {}
    return nameStr.split('/')[0];
  };

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
                    <Grid item xs={11} sx={{ pr: 2 }}>
                      <Typography variant="caption" color="GrayText">
                        {getNamespace(name)}/
                      </Typography>
                      <Typography
                        component={Link}
                        to={`/service-details/${getNamespace(name)}/${getFormattedServiceName(name)}`}
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
                        {getFormattedServiceName(name)}
                      </Typography>
                      <Typography color="textPrimary" variant="caption">
                        {podCount} pods
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Box>
                        {isHealthy ? <WbSunnyIcon fontSize="large" color="warning" /> : <ThunderstormIcon fontSize="large" color="error" />}
                      </Box>
                    </Grid>
                  </Grid>

                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <Typography color="textPrimary" variant="h5">
                      Latency
                    </Typography>
                  </Stack>

                  <Grid container direction="row" justifyContent="center">
                    <Grid item xs={4}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Typography color="textPrimary" variant="h5">
                          {addMillisTypography(convertNanoToMilliSeconds(httpLatencyIn.p50))}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle1">
                          p50
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Typography color="textPrimary" variant="h5">
                          {addMillisTypography(convertNanoToMilliSeconds(httpLatencyIn.p90))}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle1">
                          p90
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Typography color="textPrimary" variant="h5">
                          {addMillisTypography(convertNanoToMilliSeconds(httpLatencyIn.p99))}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle1">
                          p99
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs={12}>
                      <Divider light variant="middle" />
                      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
                        <Typography color="textPrimary" variant="h5">
                          Http In
                        </Typography>
                      </Stack>
                    </Grid>
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
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default ServiceCard;
