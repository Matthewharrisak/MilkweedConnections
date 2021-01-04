import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './NewPartForm.css';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className="addNewBtn" variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New Participant
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Participants</DialogTitle>
        <DialogContent>
          <DialogContentText>
    
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="Name"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone"
            type="email"
            fullWidth
          />    
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Program(s)"
          type="email"
          fullWidth
          />   
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Status"
          type="email"
          fullWidth
          />   
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="County"
          type="email"
          fullWidth
          />    
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Avatar/ID"
          type="email"
          fullWidth
          />   
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Date of Birth"
          type="email"
          fullWidth
          />  

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Referring Worker"
            type="email"
            fullWidth
          />   
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Address"
          type="email"
          fullWidth
          />  
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Gender"
          type="email"
          fullWidth
            />  
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Guardian Name"
            type="email"
            fullWidth
          />   
            <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Schedule Limitations"
          type="email"
          fullWidth
        />   
          <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Notes"
        type="email"
        fullWidth
      />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}