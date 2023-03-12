import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/cluster/1';

export async function getServiceMap() {
  const response = await axios.get(zkCloudEndpoint + '/default/namespace/map', {
    params: {
      st: '-5m'
    }
  });
  console.log(response.data);
  return response.data;
}
