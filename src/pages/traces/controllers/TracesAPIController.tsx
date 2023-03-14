import axios from 'utils/axios';

const zkCloudEndpoint = '/v1';

export function getTraceDetails() {
  return axios
    .get(zkCloudEndpoint + '/px', {
      params: {
        st: '-15m',
        cluster_id: 'cedf2a6b-2fd9-4783-8fa7-cd8d3973251d'
      }
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
}
