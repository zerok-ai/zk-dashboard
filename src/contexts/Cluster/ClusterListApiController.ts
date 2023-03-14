import axios from 'utils/axios';

const zkCloudEndpoint = '/v1';

export function fetchClusterList() {
  return axios
    .get(zkCloudEndpoint + '/cluster')
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log('Error caught while fetching cluster list.', err);
      return null;
    });
}
