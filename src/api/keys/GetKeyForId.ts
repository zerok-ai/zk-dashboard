import axios from 'utils/axios';

const zkCloudEndpoint = 'v1/u/apikey';

type KeyToIDMapping = {
  id: string;
  key: string;
  createdAt: number;
};

type GetKeysForIDResponseType = {
  apikey: KeyToIDMapping | null;
};

const GetKeysForId = (id: string): Promise<GetKeysForIDResponseType> => {
  return axios
    .get(zkCloudEndpoint + '/' + id)
    .then((response): GetKeysForIDResponseType => {
      return response.data.payload;
    })
    .catch((err) => {
      console.error('Error caught while fetching cluster list.', err);
      return {
        apikey: null
      };
    });
};

export default GetKeysForId;
