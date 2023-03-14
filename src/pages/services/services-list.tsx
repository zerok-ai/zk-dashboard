// material-ui
import { styled, Theme, useTheme, Grid, Box } from '@mui/material';
import { useEffect, useState, ReactElement } from 'react';

import ServiceCard from 'components/cards/ServiceCard';
import { Services as ServicesType, ServicesFilter } from 'types/services';
import useConfig from 'hooks/useConfig';
import { getServices } from 'store/reducers/services';

import ServicesHeader from 'sections/apps/ServicesHeader';
import ServiceEmpty from 'sections/apps/ServiceEmpty';
import SkeletonServicePlaceholder from 'components/cards/skeleton/ServicePlaceholder';
import { ClusterContext } from 'contexts/Cluster/ClusterContext';
import ClusterInfo from 'types/models/ClusterInfo';

const Main = styled('main', { shouldForwardProp: (prop: string) => prop !== 'open' && prop !== 'container' })(
  ({ theme, open, container }: { theme: Theme; open: boolean; container: any }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
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

  const [isLoading, setLoading] = useState(true);
  const [selectedClusterId, setSelectedClusterId] = useState('');

  const [services, setServices] = useState<ServicesType[]>([]);
  const { container } = useConfig();

  useEffect(() => {
    if (!isLoading) return;
    console.log('useEffect called.');
    updateServices(selectedClusterId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateServices(clusterId: string) {
    if (!clusterId) return;
    setLoading(true);
    getServices(clusterId).then((results) => {
      console.log('Results ', results);
      setServices(results);
      setLoading(false);
    });
  }

  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
  };

  // filter
  const initialState: ServicesFilter = {
    search: ''
  };
  const [filter, setFilter] = useState(initialState);

  const renderServicesCard = () => {
    console.log('renderServicesCard', services);
    let serviceResult: ReactElement | ReactElement[] = <></>;
    if (services && services.length > 0) {
      serviceResult = services
        .filter((service: ServicesType) => {
          return service['name'] && service['name'].toString().toLowerCase().includes(filter.search.toString().toLowerCase());
        })
        .map((service: ServicesType, index: number) => (
          <Grid key={service.name} item xs={12} sm={6} md={4} lg={4}>
            <ServiceCard
              clusterId={selectedClusterId}
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
    console.log(serviceResult);
    return serviceResult;
  };

  function changeListener(cluster: ClusterInfo) {
    if (cluster.cluster_id !== selectedClusterId) {
      console.log('Updating cluster ' + cluster.cluster_name + ',' + cluster.cluster_id);
      setSelectedClusterId(cluster.cluster_id);
      updateServices(cluster.cluster_id);
    }
  }

  return (
    <ClusterContext.Consumer>
      {({ registerChangeListener, getSelectedCluster }: any) => {
        let selectedCluster = getSelectedCluster();
        if (selectedCluster) {
          setSelectedClusterId(selectedCluster.cluster_id);
        }
        registerChangeListener(changeListener);
        return (
          <Box sx={{ display: 'block' }}>
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
                      : renderServicesCard()}
                  </Grid>
                </Grid>
              </Grid>
            </Main>
          </Box>
        );
      }}
    </ClusterContext.Consumer>
  );
};

export default ServicesListPage;
