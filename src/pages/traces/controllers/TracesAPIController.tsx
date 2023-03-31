import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/u/cluster';

export function getTraceDetails(cluster_id: string, interval: string) {
  return axios
    .get(zkCloudEndpoint + '/traces', {
      params: {
        st: interval,
        cluster_id: cluster_id
      }
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
}
