import { useEffect, useState } from 'react';

// material-ui
import { CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// types
import { ServiceCardProps } from 'types/services';

// project import
import MainCard from 'components/MainCard';

import SkeletonServicePlaceholder from 'components/cards/skeleton/ServicePlaceholder';

// ==============================|| PRODUCT CARD ||============================== //

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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: '100%', position: 'absolute', top: 0, pt: 1.75, pl: 2, pr: 1 }}
          ></Stack>
          <Divider />
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={1.3}>
                  <Stack direction="row" justifyContent="left" alignItems="center">
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
                  </Stack>

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

                  <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1 }}>
                      <MainCard border={true} sx={{ bgcolor: 'transparent' }}>
                        {httpLatencyIn.p50}
                      </MainCard>
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
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1 }}>
                      <MainCard border={true} sx={{ bgcolor: 'transparent' }}>
                        {httpLatencyIn.p90}
                      </MainCard>
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
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1 }}>
                      <MainCard border={true} sx={{ bgcolor: 'transparent' }}>
                        {httpLatencyIn.p99}
                      </MainCard>
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

                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                    >
                      Http In
                    </Typography>
                  </Stack>

                  <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1 }}>
                      <MainCard border={true} sx={{ bgcolor: 'transparent' }}>
                        {httpReqThroughputIn}
                      </MainCard>
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
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1 }}>
                      <MainCard border={true} sx={{ bgcolor: 'transparent' }}>
                        {httpErrorRateIn}
                      </MainCard>
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
