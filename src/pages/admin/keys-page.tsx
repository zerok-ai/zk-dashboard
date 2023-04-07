import { AddTaskOutlined, DeleteOutline } from '@mui/icons-material';
import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Box, Stack } from '@mui/system';
import CreateKey from 'api/keys/CreateKey';
import DeleteKey from 'api/keys/DeleteKey';
import ListKeys, { OrgListKeysResponseType, KeyDetailType } from 'api/keys/ListKeys';
import MainCard from 'components/MainCard';
import LoaderTable from 'components/tables/LoaderTable';
import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import toast from 'utils/ToastNotistack';

const ApiKeysPage = () => {
  const [keysList, setKeysList] = useState<KeyDetailType[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadKeysList = () => {
    setLoading(true);
    ListKeys()
      .then((listKeysResponse: OrgListKeysResponseType) => {
        setKeysList(listKeysResponse.apikeys || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoaded(true);
        setLoading(false);
      });
  };

  const addKey = () => {
    setLoading(true);
    CreateKey()
      .then(
        (response) => {
          toast('New API key created successfully.', { variant: 'success' });
        },
        (err) => {
          toast('Failed ot create new API key.', { variant: 'error' });
        }
      )
      .finally(() => {
        loadKeysList();
      });
  };

  const [deleteKeyDetail, setDeleteKeyDetail] = useState<KeyDetailType | null>(null);
  const handleDeleteConfirm = (deleteConfirm: boolean) => {
    if (!deleteConfirm) {
      setDeleteKeyDetail(null);
      return;
    }

    if (!deleteKeyDetail || !deleteKeyDetail.id) {
      toast('Invalid operation.', { variant: 'warning' });
      return;
    }
    DeleteKey(deleteKeyDetail.id)
      .then(
        (response) => {
          toast('Deleted user successfully.', { variant: 'success' });
        },
        (err) => {
          toast('Error occured while deleting user.', { variant: 'error' });
        }
      )
      .finally(() => {
        loadKeysList();
        setDeleteKeyDetail(null);
      });
  };

  const deleteKeyHandler = (keyDetail: KeyDetailType) => {
    setDeleteKeyDetail(keyDetail);
  };
  useEffect(() => {
    if (loaded) return;
    loadKeysList();
  }, [keysList]);

  return (
    <Grid container spacing={3}>
      <Dialog open={deleteKeyDetail !== null} onClose={handleDeleteConfirm}>
        <Box sx={{ p: 1, py: 1.5 }}>
          <DialogTitle id="alert-dialog-title">Remove User</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove{' '}
              <b title={deleteKeyDetail?.desc} style={{ cursor: 'pointer' }}>
                <u>{deleteKeyDetail?.id}</u>
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
          title="API Keys"
          content={false}
          secondary={
            <Button variant="contained" size="small" onClick={() => addKey()}>
              <AddTaskOutlined sx={{ marginRight: '10px' }} /> Add key
            </Button>
          }
        >
          <TableContainer>
            {loading ? (
              <LoaderTable />
            ) : (
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: 3 }}>ID</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {keysList.map((row) => (
                    <TableRow hover key={row.id}>
                      <TableCell sx={{ pl: 3 }} component="th">
                        <Stack direction="row" alignItems="center" spacing={1.25}>
                          <Stack spacing={0}>
                            <Typography variant="subtitle1">{row.id}</Typography>
                            <Typography variant="caption" color="secondary">
                              {row.desc}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" color="secondary">
                          <Moment date={parseFloat(row.createdAtMs)} format={''} />
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="warning"
                          onClick={(e) => {
                            deleteKeyHandler(row);
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

export default ApiKeysPage;
