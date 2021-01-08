import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';

// this component hold the data table for providers that are being displayed for admins

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

// dispatch({ type: "UPDATE_ACTIVE_STATUS", payload: {id: row.id, acitve: row.acitve}}) 


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [acitve, setAcitve] = React.useState(row.acitve);
  const programs =  [['CCS', row.ccs], ['PSP', row.psp], ['Choices', row.choices],[row.other, row.other]];
  const email = "mailto:" + row.email
  const phone = "tel:" + row.phone_num
  const classes = useRowStyles();
  const dispatch = useDispatch();

  const handleClick = () => {
    setAcitve(!acitve)
    try{
      dispatch({ type: "UPDATE_ACTIVE_STATUS", payload: {id: row.id, acitve: !row.acitve}}) 
    }
    catch{
      console.log('ERROR in dispatch UPDATE_ACTIVE_STATUS');
    }
  // dispatch({ type: "GET_PROV"});
  console.log('clickinggggg');
}

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.first_name} {row.last_name}
        </TableCell>
        <TableCell align="right">
          <IconButton href={phone}
              aria-label="add to favorites">
            <PhoneIcon />
          </IconButton>{row.phone_num}</TableCell>
        <TableCell align="right">
          <IconButton 
            href={email}
            // onClick={handleExpandClick}
            aria-label="share">
            <EmailIcon />
          </IconButton>{row.email}</TableCell>
        <TableCell align="right">
          {!acitve ?
          <Button className="nav-right" onClick={handleClick} color="primary">
                        ACTIVATE
          </Button>
          : 
          <Button className="nav-right" onClick={handleClick} color="primary">
                        DEACTIVATE
          </Button>
        }
          {row.acitve}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h10" gutterBottom component="div">
                {row.first_name}'s Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Programs</TableCell>
                    <TableCell>Number of openings</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <ul>
                        {programs.map((prog) => {
                            if(prog[1]){
                              return( 
                                // prog[0] == 'ccs' ?
                                  <li>
                                    <Paper className="paper" varient="outlined" >{prog[0]}</Paper>
                                  </li>
                              )
                            }
                          
                            })}
                      </ul>
                    </TableCell>
                    <TableCell>{row.openings}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const prov = useSelector((store) => store.provider.providerReducer);

  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("mounted");
    dispatch({ type: "GET_PROV" });
    console.log(prov);
  }, []);

  return (
    <TableContainer component={Paper}>
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
          {prov.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

