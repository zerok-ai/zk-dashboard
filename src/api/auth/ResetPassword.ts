import axios from 'utils/axios';

const zkCloudEndpoint = '/v1/p/users/invite/accept';

export type SetInviteUserPasswordType = {
  status: string;
};

export const SetInviteUserPassword = async (password: string, flow: string | null, token: string | null) => {
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
};
