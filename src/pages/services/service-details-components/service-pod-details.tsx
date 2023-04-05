// import { Typography } from '@mui/material';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { getClusterPodList, PodListResultsType } from 'api/cluster/GetClusterPodList';
import { getClusterPodMetrics } from 'api/cluster/GetClusterPodMetrics';
import MainCard from 'components/MainCard';
import RightPanelModal from 'components/modals/RightPanelModal';
import BasicTable from 'components/tables/BasicTable';
import LoaderTable from 'components/tables/LoaderTable';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import IncomeAreaChart from 'sections/charts/IncomeAreaChart';
import { parseTimeseriesData } from 'utils/chart';
import { stripNS } from 'utils/strings';
// import IncomeAreaChart from 'sections/charts/IncomeAreaChart';
import { ServiceDetailsType } from './service-details-tabcontents';

const ServicePodDetails = (params: ServiceDetailsType) => {
  const [podsList, setPodsList] = useState<PodListResultsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [showPodMetrics, setShowPodMetrics] = useState(false);
  const [podMetricsBody, setPodMetricsBody] = useState(<LoaderTable />);

  useEffect(() => {
    if (loaded) return;
    getClusterPodList(params.clusterId, params.ns, params.service, params.st).then((podListResponse) => {
      setPodsList(podListResponse.results || []);
      setLoading(false);
      setLoaded(true);
    });
    console.log('ServicePodDetails:', podsList);
  }, [loaded, params.clusterId, params.ns, params.service, params.st, podsList]);

  const plotPodMetrics = (pod: string) => {
    generatePodMetrics(pod);
    setShowPodMetrics(true);
  };

  const handleClose = () => setShowPodMetrics(false);

  const generatePodMetrics = (pod: string) => {
    getClusterPodMetrics(params.clusterId, params.ns, pod, params.st).then((podMetricsResponse) => {
      const timeseriesCPUData = parseTimeseriesData(podMetricsResponse.cpuUsage?.results || []);
      const cpuUsageData = timeseriesCPUData.cpu || [];
      const cpuUsageTS = timeseriesCPUData.time || [];

      const timeseriesHTTPData = parseTimeseriesData(podMetricsResponse.errAndReq?.results || []);
      const httpData: any[] = timeseriesHTTPData.http || [];
      const httpTS: any[] = timeseriesHTTPData.time || [];

      const timeseriesLatencyData = parseTimeseriesData(podMetricsResponse.latency?.results || []);
      const latencyData: any[] = timeseriesLatencyData.latency || [];
      const latencyTS: string[] = timeseriesLatencyData.time;
      setPodMetricsBody(
        <Grid container display={'block'} spacing={3}>
          <Grid item>
            <Grid item>
              <Typography variant="h4">Latency</Typography>
            </Grid>
            <Grid item xs={12}>
              <MainCard content={false} sx={{ mt: 1.5 }}>
                <Box>{<IncomeAreaChart series={latencyData} timeStamps={latencyTS} />}</Box>
              </MainCard>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item>
              <Typography variant="h4">CPU usage</Typography>
            </Grid>
            <Grid item xs={12}>
              <MainCard content={false} sx={{ mt: 1.5 }}>
                <Box>{<IncomeAreaChart series={cpuUsageData} timeStamps={cpuUsageTS} />}</Box>
              </MainCard>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item>
              <Typography variant="h4">Throughput</Typography>
            </Grid>
            <Grid item xs={12}>
              <MainCard content={false} sx={{ mt: 1.5 }}>
                <Box>{<IncomeAreaChart series={httpData} timeStamps={httpTS} />}</Box>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      );
    });
  };

  const podListCols = [
    {
      Header: 'Pod Name',
      accessor: 'pod',
      Cell: ({ value }: { value: string }) => (
        <Button variant="text" component="div" color="info" onClick={() => plotPodMetrics(stripNS(value))}>
          {value}
        </Button>
      )
    },
    {
      Header: 'Service',
      accessor: 'service'
    },
    {
      Header: 'Containers',
      accessor: 'containers'
    },
    {
      Header: 'Age',
      accessor: 'startTime',
      Cell: ({ value }: { value: string }) => <Moment date={value} fromNow ago />
    },
    {
      Header: 'Status',
      accessor: 'status.phase',
      Cell: ({ value }: { value: string }) => {
        switch (value) {
          case 'Stopped':
            return <Chip color="error" label="Stopped" size="small" variant="light" />;
          case 'Running':
            return <Chip color="success" label="Running" size="small" variant="light" />;
          default:
            return <Chip color="info" label={value} size="small" variant="light" />;
        }
      }
    }
  ];

  return loading ? (
    <LoaderTable />
  ) : (
    <>
      <RightPanelModal open={showPodMetrics} onClose={handleClose} body={podMetricsBody} />
      <BasicTable data={podsList} cols={podListCols} />
    </>
  );
};

export default ServicePodDetails;
