import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/u/apikey';

const DeleteKey = (id: string): Promise<boolean> => {
  return axios
    .delete(zkCloudEndpoint + '/' + id)
    .then((response) => {
      return true;
    })
    .catch((err) => {
      console.error('Error caught while Deleting API Key.', err);
      return false;
    });
};

export default DeleteKey;
