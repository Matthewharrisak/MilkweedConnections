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
import swal from 'sweetalert';

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

// //delete function for deleting a Participant row in the Participants table with swal alerts
const deletePart = (id) => {
  swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Participant forever?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    
    .then((willDelete) => {
      if (willDelete) {dispatch({type: 'DELETE_PARTICIPANT', payload: {id: id}})
        swal("Poof! The Participant is kindly deleted!", {
          icon: "success",
        });
      } else {
        swal("The Participant is NOT deleted");
      }
    });
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
          <Button className="deleteButton" onClick={() => deletePart(row.rowEdit.id)} color="primary">
            Delete Participant
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}