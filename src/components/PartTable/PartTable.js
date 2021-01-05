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
        <TableCell align="right">{row.status}</TableCell>
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
                    <TableCell>County</TableCell>
                    <TableCell>Avatar/ID</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Birthday</TableCell>
                    <TableCell>Guardian Name</TableCell>
                    <TableCell>Scheduling Limitations</TableCell>
                    <TableCell align="right">Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow) => (
                    <TableRow key={detailsRow.dob}>
                      <TableCell component="th" scope="row">
                        {detailsRow.county}
                      </TableCell>
                      <TableCell>{detailsRow.avatar}</TableCell>
                      <TableCell>{detailsRow.address}</TableCell>
                      <TableCell>{detailsRow.gender}</TableCell>
                      <TableCell>{detailsRow.dob}</TableCell>
                      <TableCell>{detailsRow.guardian}</TableCell>
                      <TableCell>{detailsRow.limitations}</TableCell>
                      <TableCell align="right">{detailsRow.notes}</TableCell>
                    </TableRow>
                  ))}
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
  let rows = [];
  // getting participants from redux store
  const part = useSelector((store) => store.participants);
  // loop through participants and assign each to a row
  for (let i = 0; i < part.length; i++) {
    if (part[i]) {
      rows[i] = createData(
        part[i].id,
        part[i].first_name,
        part[i].last_name,
        part[i].dob,
        part[i].phone_num,
        part[i].address,
        part[i].county,
        part[i].gender,
        part[i].limitations,
        part[i].notes,
        part[i].status,
        part[i].ccs.toString(),
        part[i].choices.toString(),
        part[i].psp.toString(),
        part[i].other,
        part[i].avatar,
        part[i].guardian
      );
    }
  }
  //this is the hook for dispatching actions to redux
  const dispatch = useDispatch();
  //this is the hook we use componentDidMount in functional components
  React.useEffect(() => {
    console.log("mounted");
    dispatch({ type: "GET_PART" });
    console.log(part);
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
            <TableCell align="right">Status</TableCell>
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
