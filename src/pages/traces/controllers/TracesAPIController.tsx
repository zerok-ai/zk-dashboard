import axios from 'utils/axios';

const zkCloudEndpoint = '/v1';

export function getTraceDetails() {
  return axios
    .get(zkCloudEndpoint + '/px', {
      params: {
        st: '-5m'
      }
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
}
