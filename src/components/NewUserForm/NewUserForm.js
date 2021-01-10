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

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


// predefined values for milkweed 
export const counties = [{id: 1, name: "Barron"}, {id: 2, name: "Burnett"}, {id: 3, name: "Buffalo"}, {id: 4, name: "Chippewa"}, {id: 5, name: "Clark"}, {id: 6, name: "Dunn"}, {id: 7, name: "Eau Claire"}, 
{id: 8, name: "Pierce"}, {id: 9, name: "Pepin"}, {id: 10, name: "Polk"}, 
   {id: 11, name: "Trampealeau"}, {id: 12, name: "Rusk"}, {id: 13, name: "Washburn"}, {id: 14, name: "St.Croix"}];

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
    const dispatch = useDispatch();
    // const history = useHistory();
     const { previous, next } = navigation;

    // state variables
    const [open, setOpen] = React.useState(false);
    const [first, setFirst] = React.useState('');
    const [last, setLast] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [county, setCounty] = React.useState([]);
    const [participants, setParticipants] = React.useState('');
    const [morning, setMorning] = React.useState(false);
    const [evening, setEvening] = React.useState(false);
    const [afternoon, setAfternoon] = React.useState(false);
    const [ccs, setCcs] = React.useState(false);
    const [choices, setChoices] = React.useState(false);
    const [psp, setPsp] = React.useState(false);

    // handle change functions for multiple select dropdowns
    const handleChangeCounties = (event) => {
        setCounty(event.target.value);
        console.log(county);
    };

    // on click of adding new order, change the state status to true
    const handleClickOpen = () => {
        console.log('open');
        setOpen(true);
    };

    // on closing the input form register new account and send provider info
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
                openings: participants,
                morning: morning,
                evening: evening,
                afternoon: afternoon,
                ccs: ccs,
                choices: choices,
                psp: psp
            },
        }); 
        next()  
    };
    // on click of canceling a new account, change state status to false and close input form
    const handleClose = () => {
        setOpen(false); 
    };

    const handleDummy1 = () => {
        setFirst('LeRoy')
        setLast('Dahl')
        setEmail('leroydahl@gmail.com')
        setNumber('6517575954')
        setPassword('OrangeCounty2020!!')     
    };
    

    return (
        <div>
            <Button variant="outlined-light" className="addMixBtn text-light" onClick={handleClickOpen}>Register</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText onClick={handleDummy1}> Connection Details: </DialogContentText>
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
                    <br/>
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
                    <br/>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        value={password}
                        halfwidth="true"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <br/>
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
                        id="participant"
                        type="number"
                        label="Number of clients"
                        value={participants}
                        halfwidth="true"
                        onChange={e => setParticipants(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">General Availability:</FormLabel>
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                            value={morning}
                            control={<Checkbox color="primary" />}
                            label="Morning"
                            labelPlacement="top"
                            onChange={() => {
                            setMorning(!morning);
                        }}
                            />
                            <FormControlLabel
                            value={evening}
                            control={<Checkbox color="primary" />}
                            label="Evening"
                            labelPlacement="top"
                            onChange={() => {
                            setEvening(!evening);
                            }}
                            />
                            <FormControlLabel
                            value={afternoon}
                            control={<Checkbox color="primary" />}
                            label="Afternoon"
                            labelPlacement="top"
                            onChange={() => {
                            setAfternoon(!afternoon);
                            }}
                            />
                        </FormGroup>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Select Programs to work in:</FormLabel>
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
                
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                    <Button onClick={handleChangeClose} color="primary"> Save </Button>
                </DialogActions>
            </Dialog>
        </div>
  );
}