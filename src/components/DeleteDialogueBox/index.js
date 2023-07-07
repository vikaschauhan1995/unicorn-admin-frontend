import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function index({ selectedItem, handleClose, handleSubmit, submitLoading }) {
  return (
    <div>
      <Dialog
        open={selectedItem ? true : false}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Do you really want to delete ${selectedItem?.name}?`}</DialogTitle>
        <DialogActions>
          <Button variant="outlined" disabled={submitLoading} onClick={handleClose}>No</Button>
          <Button variant="contained" disabled={submitLoading} color="error" onClick={handleSubmit}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
