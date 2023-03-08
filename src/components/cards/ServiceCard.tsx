import { useEffect, useState } from 'react';

// material-ui
import { CardContent, Divider, Grid, Stack, Typography } from '@mui/material';

// types
import { ServiceCardProps } from 'types/services';

// project import
import MainCard from 'components/MainCard';

import SkeletonServicePlaceholder from 'components/cards/skeleton/ServicePlaceholder';

// ==============================|| PRODUCT CARD ||============================== //

const ServiceCard = ({
  id,
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
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                    >
                      Service Name
                    </Typography>
                    <Typography color="textSecondary" variant="h6">
                      {name}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                    >
                      Pod Count
                    </Typography>
                    <Typography color="textSecondary" variant="h6">
                      {podCount}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                    >
                      Http Throughput In
                    </Typography>
                    <Typography color="textSecondary" variant="h6">
                      {httpReqThroughputIn}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                    >
                      Http Error Rate In
                    </Typography>
                    <Typography color="textSecondary" variant="h6">
                      {httpErrorRateIn}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                    >
                      Inbound Conns
                    </Typography>
                    <Typography color="textSecondary" variant="h6">
                      {inboundConns}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                    >
                      Outbound Conns
                    </Typography>
                    <Typography color="textSecondary" variant="h6">
                      {outboundConns}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                    >
                      p50 Latency
                    </Typography>
                    <Typography color="textSecondary" variant="h6">
                      {httpLatencyIn.p50}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                    >
                      p90 Latency
                    </Typography>
                    <Typography color="textSecondary" variant="h6">
                      {httpLatencyIn.p90}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none' }}
                    >
                      p99 Latency
                    </Typography>
                    <Typography color="textSecondary" variant="h6">
                      {httpLatencyIn.p99}
                    </Typography>
                  </Stack>
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
