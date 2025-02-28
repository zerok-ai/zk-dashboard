// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthResetPassword from 'sections/auth/auth-forms/AuthResetPassword';
import { useQuery } from 'utils/utils';

// ================================|| RESET PASSWORD ||================================ //

export type ResetPasswordType = {
  flow: string;
  token: string;
};

const ResetPassword = () => {
  let query = useQuery();
  let flow = query.get('flow');
  let token = query.get('token');
  console.log(flow, token);
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }} spacing={1}>
            <Typography variant="h3">Reset Password</Typography>
            <Typography color="secondary">Please choose your new password</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthResetPassword flow={flow} token={token} />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ResetPassword;
