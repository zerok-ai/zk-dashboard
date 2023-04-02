// import { Typography } from '@mui/material';
import { Chip } from '@mui/material';
import { getClusterPodList, PodListResultsType } from 'api/cluster/GetClusterPodList';
import BasicTable from 'components/tables/BasicTable';
import LoaderTable from 'components/tables/LoaderTable';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { ServiceDetailsType } from './service-details-tabcontents';

const ServicePodDetails = (params: ServiceDetailsType) => {
  const [podsList, setPodsList] = useState<PodListResultsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    getClusterPodList(params.clusterId, params.ns, params.service, params.st).then((podListResponse) => {
      setPodsList(podListResponse.results || []);
      setLoading(false);
      setLoaded(true);
    });
    console.log('ServicePodDetails:', podsList);
  }, [loaded, params.clusterId, params.ns, params.service, params.st, podsList]);

  const podListCols = [
    {
      Header: 'Service',
      accessor: 'service'
    },
    {
      Header: 'Pod Name',
      accessor: 'pod'
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
  ]

  return loading ? <LoaderTable /> : <BasicTable data={podsList} cols={podListCols}/>;
};

export default ServicePodDetails;
