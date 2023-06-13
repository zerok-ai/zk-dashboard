import { Grid, Box, CircularProgress, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4
};

type BlockingModalProps = {
  open: boolean;
  handleClose: () => void;
  hasFetchingFailed: boolean;
};

const BlockingModal = (props: BlockingModalProps) => {
  const { open, handleClose, hasFetchingFailed } = props;

  return (
    <Modal open={open} onClose={handleClose} disableEscapeKeyDown={true} disableAutoFocus={true}>
      <Box sx={style}>
        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ mb: 3, ml: 3 }}>
          <Grid item sx={{ pr: 2 }}>
            {hasFetchingFailed ? <></> : <CircularProgress />}
          </Grid>
          <Grid item xs={2} sx={{ pr: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {hasFetchingFailed ? 'Failed to fetch cluster list. Refresh page to try again.' : 'Fetching cluster list'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BlockingModal;
