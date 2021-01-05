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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
root: {
    maxWidth: 345,
},
media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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

function ProvCard(props) {
    const data = props.props
    const programs = {ccs:data.ccs, psp:data.psp, choices: data.choices}
    console.log('yyyyyyyyyyy', props, programs);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
        <CardHeader
            title={data.first_name + " " + data.last_name}
        />
        <CardMedia
            className={classes.media}
            image={data.image}
            title="profile image"
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.bio}
            </Typography>
            <List component="nav" aria-label="secondary mailbox folders">
              Programs:
              {Object.entries(programs).map(([key, value]) => {
                console.log(key, value, 'klasdkfj;as')
                  // value ? 
                  //   (<ListItem button>
                  //     <ListItemText primary={key} />
                  //   </ListItem>)
                  //   :
                  //   <div></div>
                
                  })}
            </List>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
            <PhoneIcon />
            </IconButton>
            <IconButton aria-label="share">
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
            <Typography paragraph>{data.description}</Typography>
            <Typography paragraph>
              My Mission:
              <br/>
               {data.mission}
            </Typography>
            <Typography paragraph>
              Who I work with:
              <br/>
                {data.help_info}
            </Typography>
            </CardContent>
        </Collapse>
        </Card>
    );
    }

export default function CollapsibleTable() {
  const prov = useSelector((store) => store.provider.allProviders);
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    console.log("as,d.fmasd,./fma");    
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
    {prov.map((row) => (
            <ProvCard key={row.id} props={row} />
          ))}
    
    </>
  );
}

 