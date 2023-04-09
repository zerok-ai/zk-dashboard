// material-ui
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputLabel,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import IconButton from 'components/@extended/IconButton';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import { useEffect, useState } from 'react';
import { Close, DeleteOutline, PersonAddAltOutlined, SendOutlined } from '@mui/icons-material';
import ListUsers, { OrgListUsersResponseType } from 'api/auth/ListUsers';
import InviteUser from 'api/auth/InviteUser';
import DeleteUser from 'api/auth/DeleteUser';
import toast from 'utils/ToastNotistack';
import LoaderTable from 'components/tables/LoaderTable';

// table data
type UserInfoType = {
  name: string;
  avatar: string;
  email: string;
  role: number;
  status: boolean;
  id: string;
};
function createData(name: string, avatar: string, email: string, role: number, status: boolean, id: string) {
  return { name, avatar, email, role, status, id };
}

const avatarImage = require.context('assets/images/users', true);

// ==============================|| ACCOUNT PROFILE - ROLE ||============================== //

const UserPage = () => {
  const [inviteBox, showInviteBox] = useState(false);
  const showInvite = () => {
    showInviteBox(true);
  };
  const hideInvite = () => {
    showInviteBox(false);
  };

  const [userList, setUserList] = useState<UserInfoType[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadUserList = () => {
    setLoading(true);
    ListUsers()
      .then((listUserResponse: OrgListUsersResponseType) => {
        setUserList(
          listUserResponse.users.map((user, idx) => {
            return createData(user.name, `avatar-${(idx % 5) + 1}.png`, user.email, idx % 4, user.isApproved, user.id);
          })
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoaded(true);
        setLoading(false);
      });
  };

  const [deleteUserDetail, setDeleteUserDetail] = useState<UserInfoType | null>(null);
  const handleDeleteConfirm = (deleteConfirm: boolean) => {
    if (!deleteConfirm) {
      setDeleteUserDetail(null);
      return;
    }

    if (!deleteUserDetail || !deleteUserDetail.id) {
      toast('Invalid operation.', { variant: 'warning' });
      return;
    }
    DeleteUser(deleteUserDetail.id)
      .then(
        (response) => {
          toast('Deleted user successfully.', { variant: 'success' });
        },
        (err) => {
          toast('Error occured while deleting user.', { variant: 'error' });
        }
      )
      .finally(() => {
        loadUserList();
        setDeleteUserDetail(null);
      });
  };

  const deleteUser = (userDetail: UserInfoType) => {
    setDeleteUserDetail(userDetail);
  };

  type inviteUserFormType = {
    email: string;
    firstname: string;
    lastname: string;
  };

  const handleInviteUser = async (values: inviteUserFormType) => {
    try {
      await InviteUser(values.email, values.firstname, values.lastname).then(
        (response: any) => {
          toast(`Invite sent successfully to ${values.email}`, { variant: 'success' });
          loadUserList();
        },
        (err: any) => {
          toast('Failed to invite user. please try again', { variant: 'error' });
        }
      );
    } catch (err: any) {
      console.error(err);
      toast('Failed to invite user. please try again', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (loaded) return;
    loadUserList();
  }, [userList]);

  return (
    <Grid container spacing={3}>
      <Dialog open={deleteUserDetail !== null} onClose={handleDeleteConfirm}>
        <Box sx={{ p: 1, py: 1.5 }}>
          <DialogTitle id="alert-dialog-title">Remove User</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove{' '}
              <b title={deleteUserDetail?.email} style={{ cursor: 'pointer' }}>
                <u>{deleteUserDetail?.name}</u>
              </b>{' '}
              from this org?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={() => handleDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => handleDeleteConfirm(true)} autoFocus>
              Proceed
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Grid item xs={12}>
        <MainCard
          title="Team Members"
          content={false}
          secondary={
            inviteBox ? (
              <Button variant="text" color="secondary" onClick={() => hideInvite()}>
                <Close />
              </Button>
            ) : (
              <Button variant="contained" onClick={() => showInvite()}>
                <PersonAddAltOutlined sx={{ marginRight: '10px' }} /> Invite Team Members
              </Button>
            )
          }
        >
          {inviteBox ? (
            <Stack spacing={2.5} sx={{ p: 2.5 }}>
              <Formik
                initialValues={{
                  email: '',
                  firstname: '',
                  lastname: '',
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  firstname: Yup.string().max(255).required('Firstname is required'),
                  lastname: Yup.string().max(255).required('Lastname is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                  await handleInviteUser(values);
                }}
              >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                  <form
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <Stack
                      spacing={3}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-end"
                      sx={{ width: { xs: 1, md: '80%', lg: '60%' } }}
                    >
                      <Stack spacing={1} sx={{ width: `calc(100% - 110px)` }}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <InputLabel>First Name</InputLabel>
                            <TextField
                              fullWidth
                              variant="outlined"
                              placeholder="First Name"
                              name="firstname"
                              value={values.firstname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <InputLabel>Last Name</InputLabel>
                            <TextField
                              fullWidth
                              variant="outlined"
                              placeholder="Last Name"
                              name="lastname"
                              value={values.lastname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <InputLabel>Email Address</InputLabel>
                            <TextField
                              fullWidth
                              variant="outlined"
                              placeholder="Enter email address"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                        </Grid>
                      </Stack>
                      <Button variant="contained" size="large" type="submit">
                        <SendOutlined sx={{ marginRight: '10px' }} /> Send
                      </Button>
                      <Button variant="outlined" size="large" color="secondary" onClick={() => hideInvite()}>
                        Cancel
                      </Button>
                    </Stack>
                  </form>
                )}
              </Formik>
            </Stack>
          ) : (
            <></>
          )}
          <TableContainer>
            {loading ? (
              <LoaderTable />
            ) : (
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: 3 }}>Member</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList.map((row) => (
                    <TableRow hover key={row.email}>
                      <TableCell sx={{ pl: 3 }} component="th">
                        <Stack direction="row" alignItems="center" spacing={1.25}>
                          <Avatar alt="Avatar 1" src={avatarImage(`./${row.avatar}`)} />
                          <Stack spacing={0}>
                            <Typography variant="subtitle1">{row.name}</Typography>
                            <Typography variant="caption" color="secondary">
                              {row.email}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {row.role === 1 && <Chip size="small" variant="light" color="primary" label="Admin" />}
                        {row.role === 2 && <Chip size="small" variant="light" color="info" label="Read-Only" />}
                        {row.role === 3 && <Chip size="small" variant="light" color="warning" label="Debugger" />}
                        {row.role === 0 && <Chip size="small" variant="light" color="success" label="Developer" />}
                      </TableCell>
                      <TableCell align="right">
                        {!row.status && (
                          <Stack direction="row" alignItems="center" spacing={1.25} justifyContent="flex-end">
                            <Button
                              size="small"
                              color="error"
                              onClick={(e) => {
                                const nameArr = row.name.split(' ');
                                handleInviteUser({
                                  email: row.email,
                                  firstname: nameArr[0],
                                  lastname: nameArr.slice(1).join(' ')
                                });
                              }}
                            >
                              Resend
                            </Button>
                            <Chip size="small" color="info" variant="outlined" label="Invited" />
                          </Stack>
                        )}
                        {row.status && <Chip size="small" color="success" label="Joined" />}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="warning"
                          onClick={(e) => {
                            deleteUser(row);
                          }}
                        >
                          <DeleteOutline style={{ fontSize: '1.15rem' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default UserPage;
