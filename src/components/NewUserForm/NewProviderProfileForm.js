import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';

export default function NewProviderProfileForm(navigation) {
    const dispatch = useDispatch();
    const { previous, next } = navigation;

    const state = useSelector(state => state)

    // state variables
    const [open, setOpen] = React.useState(true);
    const [openImgUrl, setOpenImgUrl] = React.useState(false);
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
        dispatch({
            type: 'CREATE_PROFILE',
            payload: {
                prov_id: state.errors.providerId,
                name: name,
                description: description,
                help_info: help,
                mission: mission,
                bio: bio,
                image: img
            },
        }); 
        setOpen(false);
        next();
    };
    // on click of canceling a new order, change state status to false and close input form
    const handleClose = () => {
        setOpen(false); 
    };
    const handleClickOpenBtn = () => {
        setOpenImgUrl(true);
    };
    const handleCloseBtn = () => {
        setOpenImgUrl(false); 
    };
    const handleDummy1 = () => {
        setName('LeRoy Dahl')
        setDescription('Recovery Coaching Peer and Parent Mentoring, Individual and family/parent support, Reentry and Reunification, Independent living skills')
        setHelp('Substance use challenges, Youth to adults,Individuals and families')
        setMission('LeRoy wants people to know that there is a way through it, because he has been through it - starting from the bottom and getting back up to your feet from nowhere. He has been through incarceration, child protective services, CHIPS, and Alternatives to Incarcerating Mothers (AIM) court. She has been through substance use recovery, and continues involvement in Narcotics Anonymous.')
        setBio('In his spare time, LeRoy enjoys the company of his cat and dog. The outdoors often call to him, with fishing (including ice fishing), trail walking, and disc golfing being some of his favorite activities. He loves listening to all kinds of music.')     
    }; 
    const handleDummy2 = () => {
        setImg('https://avatars0.githubusercontent.com/u/68084456?s=460&u=967b1256cf1f50b9acd36cb99fad1562eafb24e3&v=4')
    }
    return (
        <div>
            <Button variant="outlined-light" className="addMixBtn text-light" onClick={handleClickOpen}>Register</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle onClick={handleDummy1}>Provider Profile:</DialogTitle>
                <DialogContent id="profile-container">
                    {img != '' ? 
                    <>
                        <img src={img}></img>
                        <Button variant="outlined-light" className="addMixBtn text-light" onClick={handleClickOpenBtn}>Image Upload</Button>
                    </>
                        :
                        <Button variant="outlined-light" className="addMixBtn text-light" onClick={handleClickOpenBtn}>Image Upload</Button>
                        }                    <Dialog open={openImgUrl} onClose={handleCloseBtn} aria-labelledby="form-dialog-title">
                        <DialogTitle onClick={handleDummy2}>Image:</DialogTitle>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="img"
                            label="Image URL"
                            value={img}
                            fullWidth= {true}
                            onChange={e => setImg(e.target.value)}
                        />
                        <DialogActions>
                            <Button onClick={handleCloseBtn} color="primary"> Close </Button>
                        </DialogActions>
                    </Dialog>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Full Name"
                        value={name}
                        fullWidth={true}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Provider Service Description"
                        value={description}
                        fullWidth={true}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="help"
                        label="Who are you aiming to help?"
                        value={help}
                        fullWidth={true}
                        onChange={e => setHelp(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="mission"
                        label="Mission Statement"
                        value={mission}
                        fullWidth={true}
                        onChange={e => setMission(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="bio"
                        label="Bio"
                        value={bio}
                        fullWidth={true}
                        onChange={e => setBio(e.target.value)}
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                    <Button onClick={handleChangeClose} color="primary"> Submit </Button>
                </DialogActions>
            </Dialog>
        </div>
  );
}