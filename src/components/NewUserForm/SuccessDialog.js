import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function SuccessDialog() {
    // state variables
    const [open, setOpen] = React.useState(true);

    // on click of adding new order, change the state status to true
    const handleClickOpen = () => {
        setOpen(true);
    };

    // on click of canceling a new order, change state status to false and close input form
    const handleClose = () => {
        setOpen(false); 
    };

    return (
        <div>
            <Button variant="outlined-light" className="addMixBtn text-light" onClick={handleClickOpen}>Register</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle >You have successfully Registered an account, waiting for account approval from admin!</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Close </Button>
                </DialogActions>
            </Dialog>
        </div>
  );
}