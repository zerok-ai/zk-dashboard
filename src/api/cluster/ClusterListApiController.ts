import { ClusterListAPIResponse } from 'types/models/ClusterInfo';
import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/u/org';

export function fetchClusterList(): Promise<ClusterListAPIResponse> {
  return axios
    .get(zkCloudEndpoint + '/cluster')
    .then((response): ClusterListAPIResponse => {
      return response.data.payload;
    })
    .catch((err) => {
      console.error('Error caught while fetching cluster list.', err);
      return {
        clusters: []
      };
    });
}
