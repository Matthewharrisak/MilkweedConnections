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

export default function MixFormDialog(navigation) {
    const classes = useStyles();
    // react hooks that will be used when submitting or saving form to DB

    // const dispatch = useDispatch();
    // const history = useHistory();
     const { previous, next } = navigation;

  // state variables
    const [open, setOpen] = React.useState(false);
    const [first, setFirst] = React.useState('');
    const [last, setLast] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [programs, setPrograms] = React.useState([]);
    const [county, setCounty] = React.useState([]);
    const [participants, setParticipants] = React.useState('');
    const [schedule, setSchedule] = React.useState([]);

    // handle change functions for multiple select dropdowns
    const handleChangeCounties = (event) => {
        setCounty(event.target.value);
        console.log(county);
    };

    const handleChangePrograms = (event) => {
        setPrograms(event.target.value);
        console.log(programs);
    };

    const handleChangeSchedules = (event) => {
        setSchedule(event.target.value);
        console.log(schedule);
    };

    // on click of adding new order, change the state status to true
    const handleClickOpen = () => {
        console.log('open');
        setOpen(true);
    };
    // on closing the input form add mix to order and fetch mixes in order from db
    const handleChangeClose = () => {
        dispatch({
            type: 'REGISTER',
            payload: {
                username: email,
                password: password,
                first_name: first,
                last_name: last,
                phone_num: number,
                county: county,
                programs: programs,
                openings: participants,
                schedule: schedule
            },
        }); 
        next()
    };
    // on click of canceling a new order, change state status to false and close input form
    const handleClose = () => {
        setOpen(false); 
    };

    return (
        <div>
            <Button variant="outlined-light" className="addMixBtn text-light" onClick={handleClickOpen}>Register</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle >Register New Provider</DialogTitle>
                <DialogContent>
                    <DialogContentText> Connection Details: </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="first"
                        label="First Name"
                        value={first}
                        halfwidth="true"
                        onChange={e => setFirst(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="last"
                        label="Last Name"
                        value={last}
                        halfwidth="true"
                        onChange={e => setLast(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="number"
                        label="Phone Number"
                        value={number}
                        halfwidth="true"
                        onChange={e => setNumber(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        value={email}
                        halfwidth="true"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        value={password}
                        halfwidth="true"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <DialogContentText> Work Details: </DialogContentText>
                    <FormControl className={classes.formControl} >
                        <InputLabel id="county-selector">County to Work</InputLabel>
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
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}>
                            {counties.map((name, index) => (
                                <MenuItem key={index} value={name}>
                                {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="program-selector">Programs to Work in</InputLabel>
                        <Select
                            labelId="program-selector"
                            id="program-selected"
                            multiple
                            value={programs}
                            onChange={handleChangePrograms}
                            input={<Input id="select-multiple-program" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}>
                            {programsAvailable.map((name, index) => (
                                <MenuItem key={index} value={name}>
                                {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="availibility-selector">General Availibilty</InputLabel>
                        <Select
                            labelId="availibility-selector"
                            id="availibility-selected"
                            multiple
                            value={schedule}
                            onChange={handleChangeSchedules}
                            input={<Input id="select-multiple-availibilities" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}>
                            {schedules.map((name, index) => (
                                <MenuItem key={index} value={name}>
                                {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="participant"
                        type="number"
                        label="Number of clients"
                        value={participants}
                        halfwidth="true"
                        onChange={e => setParticipants(e.target.value)}
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