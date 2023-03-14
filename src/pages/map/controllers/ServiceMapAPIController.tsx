import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/cluster/cedf2a6b-2fd9-4783-8fa7-cd8d3973251d';

export async function getServiceMap() {
  const response = await axios.get(zkCloudEndpoint + '/service/map', {
    params: {
      st: '-5m'
    }
  });
  console.log(response.data);
  return response.data;
}
