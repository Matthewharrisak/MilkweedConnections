import React, { useState, useEffect }from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from "react-redux";
import { createMuiTheme } from '@material-ui/core/styles';
import './ProvTable.css';

const useStyles = makeStyles((theme) => ({
root: {
    maxWidth: 345,
    display: 'flex',
    flexWrap: "wrap",
    flexDirection: 'column',
    justifyContent: 'center',
    width: 300,
    height: 'auto',
    margin: '7px 7px 7px 7px'
    
    // position: 'relative'
    
},

img: {
    height: 0,
    paddingTop: '56.25%',
    borderRadius: '500%', // 16:9
    width: '70%',
    alignSelf: 'center'
    //alignSelf: 'center'
},
expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
},
expandOpen: {
    transform: 'rotate(180deg)',
},
avatar: {
    backgroundColor: red[500],
},
}));

const theme1 = createMuiTheme({
  palette: {
    secondary: {
      main: '#ef6c00',
    },
  }
});
const theme2 = createMuiTheme({
  
  palette: {
    primary: {
      main: '#558b2f',
    },
  }
});
const theme3 = createMuiTheme({
  
  palette: {
    primary: {
      main: '#26a69a',
    },
  }
});

function ProvCard(props) {
    const data = props.props
    const programs = [['ccs', data.ccs], ['psp', data.psp], ['choices', data.choices]]
    const email = "mailto:" + data.email
    const phone = "tel:" + data.phone_num
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    return (
      <div className="card-wrapper">
        <Card className={classes.root}>
        <CardHeader
            id='cardHeader'
            title={data.first_name + " " + data.last_name}
        />
        <CardMedia
            className={classes.img}
            image={data.image}
            title="profile image"
        />
        <CardContent >
            <Typography >
             Programs I work with:
            </Typography>
            <ul>
              {programs.map((prog) => {
                console.log(prog, 'klasdkfj;as')
                  if(prog[1]){
                    return( 
                      // prog[0] == 'ccs' ?
                        <li>
                          <Paper className="paper" theme={theme1} varient="outlined" >{prog[0]}</Paper>
                        </li>
                    )
                  }
                
                  })}
            </ul>
        </CardContent>
        <CardActions disableSpacing className="card-actions">
            <IconButton href={phone}
              aria-label="add to favorites">
            <PhoneIcon />
            </IconButton>
            <IconButton 
            href={email}
            // onClick={handleExpandClick}
            aria-label="share">
            <EmailIcon />
            </IconButton>
            <IconButton
            className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
              Contact Info:
               <Typography href={phone} variant="body2">{data.phone_num}</Typography>
               <Typography href={email} variant="body2">{data.email}</Typography>
            </Typography>
              
            <Typography paragraph>
              My Mission:
               <Typography variant="body2">{data.mission} </Typography>
            </Typography>
            <Typography paragraph>
              Who I work with:
              <Typography variant="body2">{data.help_info} </Typography>
            </Typography>
            </CardContent>
        </Collapse>
        </Card>
        </div>
    );
    }

export default function CollapsibleTable() {
  const prov = useSelector((store) => store.provider.allProviders);
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch({ type: "GET_PROV"});
  }, []);

  return ( 
  <>
    {/* <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
      
    </TableContainer> */}
    <div id='cardDisplay'>
      {prov.map((row) => (
              <ProvCard key={row.id} props={row} />
            ))}
    </div>
    
    </>
  );
}

 