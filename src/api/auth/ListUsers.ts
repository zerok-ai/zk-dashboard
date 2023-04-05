import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/u/users';

export type userDetailType = {
  email: string;
  id: string;
  isApproved: boolean;
  name: string;
};

export type OrgListUsersResponseType = {
  users: userDetailType[];
};

const ListUsers = (): Promise<OrgListUsersResponseType> => {
  return axios
    .get(zkCloudEndpoint)
    .then((response): OrgListUsersResponseType => {
      return response.data.payload;
    })
    .catch((err) => {
      console.error('Error caught while fetching cluster list.', err);
      return {
        users: []
      };
    });
};

export default ListUsers;
