import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

// predefined values for milkweed 
const counties = ["Barron", "Burnett", "Buffalo", "Chippewa", "Clark", "Dunn", "Eau Claire", "Pierce", "Pepin", "Polk", 
   "Trampealeau", "Rusk", "Washburn", "St.Croix"];

const programsAvailable = ["CCS", "Choices", "PSP"];

const schedules = ["Morning", "Afternoon", "Evening"];

// styling for borders of input fields, will be changed based of overall styling of web app
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

export default function MixFormDialog(props) {
    const classes = useStyles();
    // react hooks that will be used when submitting or saving form to DB

    // const dispatch = useDispatch();
    // const history = useHistory();

  // state variables
    const [open, setOpen] = React.useState(true);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [help, setHelp] = React.useState('');
    const [mission, setMission] = React.useState('');
    const [bio, setBio] = React.useState('');
    const [img, setImg] = React.useState('');

    // on click of adding new order, change the state status to true
    const handleClickOpen = () => {
        setOpen(true);
    };
    // on closing the input form add mix to order and fetch mixes in order from db
    const handleChangeClose = () => {
        setOpen(false);
    };
    // on click of canceling a new order, change state status to false and close input form
    const handleClose = () => {
        setOpen(false); 
    };

    return (
        <div>
            <Button variant="outlined-light" className="addMixBtn text-light" onClick={handleClickOpen}>Register</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle >Provider Profile:</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Full Name"
                        value={name}
                        halfwidth="true"
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Provider Service Description"
                        value={description}
                        halfwidth="true"
                        onChange={e => setDescription(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="help"
                        label="Who are you aiming to help?"
                        value={help}
                        halfwidth="true"
                        onChange={e => setHelp(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="mission"
                        label="Mission Statement"
                        value={mission}
                        halfwidth="true"
                        onChange={e => setMission(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="bio"
                        label="Bio"
                        value={bio}
                        halfwidth="true"
                        onChange={e => setBio(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="img"
                        label="Image URL"
                        value={img}
                        halfwidth="true"
                        onChange={e => setImg(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                    <Button onClick={handleChangeClose} color="primary"> Save </Button>
                </DialogActions>
            </Dialog>
        </div>
  );
}