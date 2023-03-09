// material-ui
import { styled, Theme, useTheme, Grid, Box } from '@mui/material';
import { useEffect, useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'store';

import ServiceCard from 'components/cards/ServiceCard';
import { Services as ServicesType, ServicesFilter } from 'types/services';
import useConfig from 'hooks/useConfig';
import { getServices, filterServices } from 'store/reducers/services';

import ServiceFilterDrawer from 'sections/apps/ServiceFilterDrawer';
import ServicesHeader from 'sections/apps/ServicesHeader';
import ServiceEmpty from 'sections/apps/ServiceEmpty';
import SkeletonServicePlaceholder from 'components/cards/skeleton/ServicePlaceholder';

const Main = styled('main', { shouldForwardProp: (prop: string) => prop !== 'open' && prop !== 'container' })(
  ({ theme, open, container }: { theme: Theme; open: boolean; container: any }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: -320,
    ...(container && {
      [theme.breakpoints.only('lg')]: {
        marginLeft: !open ? -240 : 0
      }
    }),
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 0,
      marginLeft: 0
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter
      }),
      marginLeft: 0
    })
  })
);

const ServicesListPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const [services, setServices] = useState<ServicesType[]>([]);
  const serviceState = useSelector((state) => state.service);
  const { container } = useConfig();

  useEffect(() => {
    setServices(serviceState.services);
  }, [serviceState]);

  useEffect(() => {
    dispatch(getServices());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
  };

  // filter
  const initialState: ServicesFilter = {
    search: '',
    sort: 'low'
  };
  const [filter, setFilter] = useState(initialState);

  const filterData = async () => {
    await dispatch(filterServices(filter));
    setLoading(false);
  };

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  let serviceResult: ReactElement | ReactElement[] = <></>;
  if (services && services.length > 0) {
    serviceResult = services.map((service: ServicesType, index: number) => (
      <Grid key={index} item xs={12} sm={6} md={4}>
        <ServiceCard
          name={service.name}
          podCount={service.podCount}
          httpReqThroughputIn={service.httpReqThroughputIn}
          httpErrorRateIn={service.httpErrorRateIn}
          inboundConns={service.inboundConns}
          outboundConns={service.outboundConns}
          httpLatencyIn={service.httpLatencyIn}
        />
      </Grid>
    ));
  } else {
    serviceResult = (
      <Grid item xs={12} sx={{ mt: 3 }}>
        <ServiceEmpty handelFilter={() => setFilter(initialState)} />
      </Grid>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <ServiceFilterDrawer
        filter={filter}
        setFilter={setFilter}
        openFilterDrawer={openFilterDrawer}
        handleDrawerOpen={handleDrawerOpen}
        setLoading={setLoading}
        initialState={initialState}
      />
      <Main theme={theme} open={openFilterDrawer} container={container}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <ServicesHeader filter={filter} handleDrawerOpen={handleDrawerOpen} setFilter={setFilter} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {isLoading
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <Grid key={item} item xs={12} sm={6} md={4} lg={4}>
                      <SkeletonServicePlaceholder />
                    </Grid>
                  ))
                : serviceResult}
            </Grid>
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
};

export default ServicesListPage;
