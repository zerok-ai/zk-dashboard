// material-ui
import { styled, Theme, useTheme, Grid, Box } from '@mui/material';
//import { Box, Grid } from '@mui/material';

// project import
import { useEffect, useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'store';

import ServiceCard from 'components/cards/ServiceCard';
import { Services as ServicesTypo, ServicesFilter } from 'types/services';
import useConfig from 'hooks/useConfig';
import { getServices, filterServices } from 'store/reducers/services';

import ServiceFilterDrawer from 'sections/apps/ServiceFilterDrawer';
import ServicesHeader from 'sections/apps/ServicesHeader';
import ServiceEmpty from 'sections/apps/ServiceEmpty';
import SkeletonServicePlaceholder from 'components/cards/skeleton/ServicePlaceholder';

// ==============================|| SAMPLE PAGE ||============================== //

// const Services = () => (
//   <MainCard title="Sample Card">
//     <Typography variant="body2">
//       Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
//       minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in reprehended
//       in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui officiate
//       descent molls anim id est labours.
//     </Typography>
//   </MainCard>
// );

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

const ServicesPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  // product data
  const [services, setServices] = useState<ServicesTypo[]>([]);
  const serviceState = useSelector((state) => state.service);
  const { container } = useConfig();

  useEffect(() => {
    setServices(serviceState.services);
  }, [serviceState]);

  useEffect(() => {
    dispatch(getServices());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openFilterDrawer, setOpenFilterDrawer] = useState(true);
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

  let productResult: ReactElement | ReactElement[] = <></>;
  if (services && services.length > 0) {
    productResult = services.map((product: ServicesTypo, index: number) => (
      <Grid key={index} item xs={12} sm={6} md={4}>
        <ServiceCard id={product.id} name={product.name} />
      </Grid>
    ));
  } else {
    productResult = (
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
                : productResult}
            </Grid>
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
};

export default ServicesPage;
