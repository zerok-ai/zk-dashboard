// import { Typography } from '@mui/material';
import { getClusterPodList, PodListResultsType } from 'api/cluster/GetClusterPodList';
import BasicTable from 'components/tables/BasicTable';
import LoaderTable from 'components/tables/LoaderTable';
import { useEffect, useState } from 'react';
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
  return loading ? <LoaderTable /> : <BasicTable data={podsList} />;
};

export default ServicePodDetails;
