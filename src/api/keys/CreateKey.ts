import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/u/apikey';

const CreateKey = (): Promise<boolean> => {
  return axios
    .post(zkCloudEndpoint + '/create')
    .then((response) => {
      if (response) return true;
      else return false;
    })
    .catch((err) => {
      console.error('Error caught while Creating API Key.', err);
      return false;
    });
};

export default CreateKey;
