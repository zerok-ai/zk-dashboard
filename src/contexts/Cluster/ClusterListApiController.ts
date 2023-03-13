import axios from 'utils/axios';

const zkCloudEndpoint = '/v1';

export function fetchClusterList() {
  return axios.get(zkCloudEndpoint + '/cluster').then((response) => {
    return response.data;
  });
}
