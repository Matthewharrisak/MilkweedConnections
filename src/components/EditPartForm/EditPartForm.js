import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';
import './EditPartForm.css';

export default function FormDialog(row) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const [fName, first_name] = React.useState('');

  const handleUpdate = () => {
      dispatch({
        type: 'UPDATE_PART',
        payload: {
            first_name: fName,
        }, 
      }); 
      handleClose();
 
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
{console.log(row, 'coming in from the EDITPART FORM !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
}
  return (
    <div>
      <Button class="editButtonStyle" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Participants</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {JSON.stringify(row)}
    
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={row.rowEdit.first_name}
            type="Name"
            fullWidth
            onChange={e => first_name(e.target.value)}

          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label={row.rowEdit.last_name}
            type="Name"
            fullWidth
          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label={row.rowEdit.phone_num}
            type="email"
            fullWidth
          />     <TextField
          autoFocus
          margin="dense"
          id="name"
          label={row.rowEdit.last_name}
          type="email"
          fullWidth
        />     <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Status"
        type="email"
        fullWidth
      />     <TextField
      autoFocus
      margin="dense"
      id="name"
      label="County"
      type="email"
      fullWidth
    />     <TextField
    autoFocus
    margin="dense"
    id="name"
    label="Avatar/ID"
    type="email"
    fullWidth
  />     <TextField
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
  />     <TextField
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
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}