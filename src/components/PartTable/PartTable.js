import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";

// this component displays waitlisted participants 

// sets styles for rows using makeStyles hook
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

// defining the structure of our data and a function to assemble it
function createData(
  id,
  first_name,
  last_name,
  dob,
  phone_num,
  address,
  county,
  gender,
  limitations,
  notes,
  status,
  ccs,
  choices,
  psp,
  other,
  avatar,
  guardian,
) {
  return {
    id,
    first_name,
    last_name,
    phone_num,
    status,
    ccs,
    choices,
    psp,
    other,
    details: [
      {
        dob,
        address,
        county,
        gender,
        limitations,
        notes,
        avatar,
        guardian,
      },
    ],
  };
}

//function setting up rows for display
function Row(props) {
  const { row } = props;
  //using a state hook to track dropdowns
  const [open, setOpen] = React.useState(false);

  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {('worker_name'in row) ?
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          :
          <div></div>
        }
        </TableCell>
        <TableCell component="th" scope="row">
          {row.first_name} {row.last_name}
        </TableCell>
        <TableCell align="right">{row.phone_num}</TableCell>
        <TableCell align="right">
          {row.ccs === "true" ? <>CCS</> : <></>}
          <span> </span>
          {row.choices === "true" ? <>Choices</> : <></>}
          <span> </span>
          {row.psp === "true" ? <>PSP</> : <></>}
          <span> </span>
          {row.other != "" ? <>{row.other}</>
          :
          <></>}
        </TableCell>
        <TableCell align="right">{row.county}</TableCell>
      </TableRow>
      {('worker_name'in row) ?
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Referring County Worker Details:
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell variant="body1">Name</TableCell>
                      <TableCell variant="body1">
                        Email
                        <IconButton 
                            href={'mailto:' + row.worker_email}
                            aria-label="share">
                            <EmailIcon />
                          </IconButton>
                      </TableCell>
                      <TableCell variant="body1">
                        Phone
                        <IconButton 
                            href={'tel:' + row.worker_phone}
                            aria-label="add to favorites">
                            <PhoneIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow >
                        <TableCell variant="body2" component="th" scope="row">
                          {row.worker_name}
                        </TableCell>
                        <TableCell variant="body2" component="th" scope="row">
                          {row.worker_email}
                        </TableCell>
                        <TableCell variant="body2" component="th" scope="row">
                          {row.worker_phone}
                        </TableCell>
                      </TableRow>
                    
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        :
        <div></div>
  }
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  let rows = [];
  const prov = useSelector((store) => store.provider.currProv);
  // getting participants from redux store
  const part = useSelector((store) => store.provider.provPart);
  // loop through participants and assign each to a row
  for (let i = 0; i < part.length; i++) {
    if (part[i]) {
      rows[i] = part[i]
    }
  }
  //this is the hook for dispatching actions to redux
  const dispatch = useDispatch();
  //this is the hook we use componentDidMount in functional components
  React.useEffect(() => {
    console.log("mounted");
    dispatch({ type: "GET_PART" });
    console.log('poop', prov.id);
    dispatch({ type: "GET_PART_ON_PROV", payload: prov.id});
    console.log('double poop');
    
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Program(s)</TableCell>
            <TableCell align="right">County</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
