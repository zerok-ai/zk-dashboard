import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/u/cluster/';

export async function getServiceMap(clusterId: string) {
  const response = await axios.get(zkCloudEndpoint + clusterId + '/service/map', {
    params: {
      st: '-5m'
    }
  });
  console.log(response.data);
  return response.data;
}
