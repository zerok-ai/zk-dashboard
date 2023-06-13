import { Modal, Box } from '@mui/material';
import { ReactChild } from 'react';

type RightPanelModalType = {
  open: boolean;
  onClose: () => void;
  body: ReactChild;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '0',
  left: '50%',
  width: '50%',
  height: '100vh',
  bgcolor: 'background.paper',
  outline: 'none',
  overflow: 'scroll',
  p: 4
};

const RightPanelModal = (props: RightPanelModalType) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box sx={style}>{props.body}</Box>
    </Modal>
  );
};

export default RightPanelModal;
