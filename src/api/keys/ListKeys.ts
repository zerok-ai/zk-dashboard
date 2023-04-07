import axios from 'utils/axios';

const zkCloudEndpoint = 'v1/u/apikey';

export type KeyDetailType = {
  createdAtMs: string;
  id: string;
  desc: string;
};

export type OrgListKeysResponseType = {
  apikeys: KeyDetailType[];
};

const ListKeys = (): Promise<OrgListKeysResponseType> => {
  return axios
    .get(zkCloudEndpoint)
    .then((response): OrgListKeysResponseType => {
      return response.data.payload;
    })
    .catch((err) => {
      console.error('Error caught while fetching cluster list.', err);
      return {
        apikeys: []
      };
    });
};

export default ListKeys;
