import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/u/users';

const InviteUser = (email: string, firstname: string, lastname: string): Promise<boolean> => {
  return axios
    .post(zkCloudEndpoint + '/invite', {
      name: firstname,
      familyName: lastname,
      email
    })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      console.error('Error caught while Inviting user.', err);
      return false;
    });
};

export default InviteUser;
