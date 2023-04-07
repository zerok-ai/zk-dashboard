import axios from 'utils/axios';

const zkCloudEndpoint = 'v1/u/apikey';

type KeyToIDMapping = {
  id: string;
  key: string;
};

type GetKeysForIDResponseType = {
  apikeys: KeyToIDMapping[];
};

const GetKeysForId = (id: string): Promise<GetKeysForIDResponseType> => {
  return axios
    .get(zkCloudEndpoint, {
      params: {
        apikey: id
      }
    })
    .then((response): GetKeysForIDResponseType => {
      return response.data.payload;
    })
    .catch((err) => {
      console.error('Error caught while fetching cluster list.', err);
      return {
        apikeys: []
      };
    });
};

export default GetKeysForId;
