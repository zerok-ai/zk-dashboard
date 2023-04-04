import axios from 'utils/axios';
import { maskPassword } from 'utils/auth';

const zkCloudEndpoint = '/v1/p/users/invite/accept';

export type SetInviteUserPasswordType = {
  status: string;
};

export const SetInviteUserPassword = async (password: string, flow: string | null, token: string | null) => {
  password = maskPassword(password);
  console.log(password, flow, token);
  try {
    const response = await axios.post(
      zkCloudEndpoint,
      { password },
      {
        params: {
          flow,
          token
        }
      }
    );
    console.log(response);
    if (response !== undefined && response !== null) {
      let status = response.status;
      console.log(status);
      if (status !== 200) {
        return false;
      }
      return true;
    }
    return false;
  } catch (error) {
    console.log('Error while resetting password ', error);
    return false;
  }
};
