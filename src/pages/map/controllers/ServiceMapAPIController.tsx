import axios from 'utils/axios';
import { ServiceMapAPIResponse } from '../models/ServiceMapResponse';

const zkCloudEndpoint = '/v1/u/cluster/';

export async function getServiceMap(clusterId: string): Promise<ServiceMapAPIResponse> {
  return axios
    .get(zkCloudEndpoint + clusterId + '/service/map', {
      params: {
        st: '-5m'
      }
    })
    .then((response): ServiceMapAPIResponse => {
      console.log(response.data.payload);
      return response.data.payload;
    })
    .catch((err) => {
      console.error('Error caught while fetching cluster list.', err);
      return {
        results: []
      };
    });
}
