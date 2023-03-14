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
  isFetching: boolean;
};

const BlockingModal = (props: BlockingModalProps) => {
  const { open, handleClose, isFetching } = props;

  return (
    <Modal open={open} onClose={handleClose} disableEscapeKeyDown={true} disableAutoFocus={true}>
      <Box sx={style}>
        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ mb: 3, ml: 3 }}>
          <Grid item sx={{ pr: 2 }}>
            <CircularProgress />
          </Grid>
          <Grid item xs={2} sx={{ pr: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {isFetching ? 'Fetching cluster list' : 'Failed to fetch cluster list'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BlockingModal;
