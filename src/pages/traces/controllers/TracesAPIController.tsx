import axios from 'utils/axios';

const zkCloudEndpoint = '/v1';

export function getTraceDetails(cluster_id: string) {
  return axios
    .get(zkCloudEndpoint + '/px', {
      params: {
        st: '-15m',
        cluster_id: cluster_id
      }
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
}
