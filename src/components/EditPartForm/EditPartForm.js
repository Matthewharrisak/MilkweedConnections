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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { counties } from '../NewUserForm/NewUserForm';

const useStyles = makeStyles((theme) => ({
  formControl: {
      margin: theme.spacing(1),
      minWidth: 180,
      maxWidth: 300,
  },
  chips: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  chip: {
      width: "100%",
      margin: 2
  },
  noLabel: {
      marginTop: theme.spacing(3),
  },
  }));

export default function FormDialog(row) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [firstName, first_name] = React.useState('');
  const [lastName, last_name] = React.useState('');
  const [dOb, dob] = React.useState(new Date());
  const [phoneNum, phone_num] = React.useState('');
  const [Address, address] = React.useState('');
  const [county, setCounty] = React.useState([]);
  const [avatarID, avatar] = React.useState('');
  const [Guardian, guardian] = React.useState('');
  const [Other, other] = React.useState('');
  const [Gender, gender] = React.useState('');
  const [Limitations , limitations ] = React.useState('');
  const [Notes, notes] = React.useState('');
  const [ccs, setCcs] = React.useState(false);
  const [choices, setChoices] = React.useState(false);
  const [psp, setPsp] = React.useState(false);


  const handleUpdate = () => {
      dispatch({
        type: 'UPDATE_PART',
        payload: {
          id: row.rowEdit.id,
          first_name: firstName,
          last_name: lastName,
          dob: dOb,
          phone_num: phoneNum,
          address: Address,
          avatar: avatarID,
          guardian: Guardian,
          other: Other,
          gender: Gender,
          limitations: Limitations,
          notes: Notes,
          ccs: ccs,
          choices: choices,
          psp: psp,
          county: county,
        }, 
      }); 
      handleClose();
 
};

const handleChangeCounties = (event) => {
  setCounty(event.target.value);
  console.log(county);
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
            onChange={e => last_name(e.target.value)}

          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label={row.rowEdit.dob}
            type="email"
            fullWidth
            onChange={e => dob(e.target.value)}

          />   
            <TextField
          autoFocus
          margin="dense"
          id="name"
          label={row.rowEdit.address}
          type="email"
          fullWidth
          onChange={e => address(e.target.value)}

        />  
           <TextField
        autoFocus
        margin="dense"
        id="name"
        label={row.rowEdit.phone_num}
        type="email"
        fullWidth
        onChange={e => phone_num(e.target.value)}
       />  
   <FormControl className={classes.formControl} >
                        <InputLabel id="county-selector">County</InputLabel>
                        <Select
                            labelId="county-selector"
                            id="county-selected"
                            multiple
                            value={county}
                            onChange={handleChangeCounties}
                            input={<Input id="select-multiple-counties" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value.id} label={value.name} className={classes.chip} />
                                    ))}
                                </div>
                            )}>
                            {counties.map((elem) => (
                                <MenuItem key={elem.id} value={elem}>
                                {elem.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                      <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={row.rowEdit.avatar}
                    type="email"
                    fullWidth
                    onChange={e => avatar(e.target.value)}

                  />   
                    <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Date of Birth"
                  type="email"
                  fullWidth
                  onChange={e => guardian(e.target.value)}

                />  
  
  <FormControl component="fieldset">
                        <FormLabel component="legend"> Programs </FormLabel>
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                            value={ccs}
                            control={<Checkbox color="primary" />}
                            label="CCS"
                            labelPlacement="top"
                            onChange={() => {
                            setCcs(!ccs);
                        }}
                            />
                            <FormControlLabel
                            value={choices}
                            control={<Checkbox color="primary" />}
                            label="Choices"
                            labelPlacement="top"
                            onChange={() => {
                            setChoices(!choices);
                            }}
                            />
                            <FormControlLabel
                            value={psp}
                            control={<Checkbox color="primary" />}
                            label="PSP"
                            labelPlacement="top"
                            onChange={() => {
                            setPsp(!psp);
                            }}
                            />
                        </FormGroup>
                    </FormControl>

                    <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Address"
                  type="email"
                  fullWidth
                  onChange={e => other(e.target.value)}

                />  
        <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Gender"
        type="email"
        fullWidth
        onChange={e => gender(e.target.value)}

      />  
     <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Guardian Name"
      type="email"
      fullWidth
      onChange={e => limitations(e.target.value)}

    />   
      <TextField
    autoFocus
    margin="dense"
    id="name"
    label="Schedule Limitations"
    type="email"
    fullWidth
    onChange={e => notes(e.target.value)}

  />   
    <TextField
  autoFocus
  margin="dense"
  id="name"
  label="Notes"
  type="email"
  fullWidth
  // onChange={e => status(e.target.value)}

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