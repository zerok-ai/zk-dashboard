import axios from 'utils/axios';

const zkCloudEndpoint = '/v1';

export function getTraceDetails() {
  return axios
    .get(zkCloudEndpoint + '/px', {
      params: {
        st: '-5m',
        cluster_id: 'bc57b23a-04a9-4dc7-914b-49d6af5b05b3'
      }
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
}
