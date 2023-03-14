import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/cluster/bc57b23a-04a9-4dc7-914b-49d6af5b05b3';

export async function getServiceMap() {
  const response = await axios.get(zkCloudEndpoint + '/service/map', {
    params: {
      st: '-5m'
    }
  });
  console.log(response.data);
  return response.data;
}
