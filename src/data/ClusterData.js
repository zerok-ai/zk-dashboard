import axios from 'axios';
const hostname = '';
function upsertCluster(cluster_id, nickname, domain, api_key, id = null) {
  return axios
    .post(hostname + '/v1/cluster/', {
      cluster_id,
      nickname,
      domain,
      api_key,
      id
    })
    .then((res) => {
      console.log('created');
      return getClusters();
    });
}

function getClusters() {
  return axios.get(hostname + '/v1/cluster/').then((res) => res.data);
}

function deleteCluster(id) {
  return axios.delete(hostname + '/v1/cluster/' + id).then((res) => {
    return getClusters();
  });
}

export { getClusters, upsertCluster, deleteCluster };
