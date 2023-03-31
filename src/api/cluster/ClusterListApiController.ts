import { ClusterListAPIResponse } from 'types/models/ClusterInfo';
import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/u/org';

export function fetchClusterList(): Promise<ClusterListAPIResponse> {
  return axios
    .get(zkCloudEndpoint + '/cluster')
    .then((response): ClusterListAPIResponse => {
      console.log(response);
      return response.data.payload;
    })
    .catch((err) => {
      console.log('Error caught while fetching cluster list.', err);
      return {
        clusters: []
      };
    });
}
