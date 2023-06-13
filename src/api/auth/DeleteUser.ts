import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/u/user';

const DeleteUser = (id: string): Promise<boolean> => {
  return axios
    .delete(zkCloudEndpoint + '/' + id)
    .then((response) => {
      return true;
    })
    .catch((err) => {
      console.error('Error caught while Deleting user.', err);
      return false;
    });
};

export default DeleteUser;
