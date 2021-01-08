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
import Checkbox from "@material-ui/core/Checkbox";
import EditPartForm from "../EditPartForm/EditPartForm";
import AdminPartAssign from "../AdminPartAssign/AdminPartAssign";
import AdminPartStatusAssign from "../AdminPartStatusAssign/AdminPartStatusAssign";
import "./AdminPartDisplay.css";
import SelectAll from '../SelectAll/SelectAll'


// this component displays waitlisted participants

// sets styles for rows using makeStyles hook
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      // borderBottom: "unset",
      borderColor: "#f08621",
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
  name,
  email
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
    county,
    avatar,
    dob,
    name,
    email,
    details: [
      {
        address,
        gender,
        limitations,
        notes,
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
  const dispatch = useDispatch();
  const { DateTime } = require("luxon");
  const dt = DateTime.fromISO(row.dob);
  const prov = useSelector((store) => store.provider.providerReducer);
  const part_prov = useSelector((store) => store.provider.provPart);

  function removeProvPart(event) {
    dispatch({
      type: "DELETE_PROV_PART",
      payload: event.target.value,
    });
  }


  return (
    <React.Fragment>
      <TableRow id="borderStyle" className={classes.root}>
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
          {row.other != "" ? <>{row.other}</> : <></>}
        </TableCell>
        <TableCell align="right">
          <AdminPartStatusAssign id={row.id} status={row.status} />
        </TableCell>
        <TableCell align="right">{row.county}</TableCell>
        <TableCell align="right">{row.avatar}</TableCell>
        <TableCell align="right">{dt.toLocaleString()}</TableCell>
        <TableCell align="right">
          {row.name}
          <br />
          {row.email}
        </TableCell>
        <TableCell align="right">
          <SelectAll row={[row]} align="center" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/* <Typography variant="h10" gutterBottom component="div">
                {row.first_name}'s Details
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Guardian Name</TableCell>
                    <TableCell>Scheduling Limitations</TableCell>
                    <TableCell>Notes</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Current Provider(s)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow) => (
                    <TableRow key={detailsRow.dob}>
                      <TableCell>{detailsRow.address}</TableCell>
                      <TableCell>{detailsRow.gender}</TableCell>
                      <TableCell>{detailsRow.guardian}</TableCell>
                      <TableCell>{detailsRow.limitations}</TableCell>
                      <TableCell>{detailsRow.notes}</TableCell>

                      <TableCell>
                        <AdminPartAssign prov={prov} row={row} />
                      </TableCell>

                      <TableCell>
                        {part_prov.map((provPart) => (
                          <>
                            {row.id === provPart.participants_id ? (
                              <>
                                <p>
                                  {provPart.first_name} {provPart.last_name}{" "}
                                  <button
                                    onClick={removeProvPart}
                                    value={provPart.id}
                                  >
                                    Remove
                                  </button>
                                </p>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        ))}
                      </TableCell>
                      <TableCell>
                        <EditPartForm rowEdit={row} />
                      </TableCell>
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
  const classes = useRowStyles();


  function ButtonClick() {
    dispatch({ type: "SET_PRINT", payload: rows })
  }


  let rows = [];
  // getting participants from redux store
  const provPart = useSelector((store) => store.provPart);
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
        part[i].guardian,
        part[i].name,
        part[i].email
      );
    }
  }
  //this is the hook for dispatching actions to redux
  const dispatch = useDispatch();
  //this is the hook we use componentDidMount in functional components
  React.useEffect(() => {
    console.log("mounted");
    dispatch({ type: "GET_PART" });
    dispatch({ type: "GET_PROV" });
    dispatch({ type: "GET_PROV_PART" });
    console.log(part);
  }, []);

  function nameAsc() {
    dispatch({ type: "GET_PART_NAME_ASC" });
  }

  function nameDesc() {
    dispatch({ type: "GET_PART_NAME_DESC" });
  }

  function countyAsc() {
    dispatch({ type: "GET_PART_COUNTY_ASC" });
  }

  function countyDesc() {
    dispatch({ type: "GET_PART_COUNTY_DESC" });
  }

  function ccsSort() {
    dispatch({ type: "GET_PART_CCS" });
  }

  function choicesSort() {
    dispatch({ type: "GET_PART_CHOICES" });
  }

  function pspSort() {
    dispatch({ type: "GET_PART_PSP" });
  }

  function allSort() {
    dispatch({ type: "GET_PART" });
  }

  function filterDischarged() {
    dispatch({ type: "GET_PART_NO_DISCHARGE" });
  }
  

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                Name
                <button className="nameAscBtn" onClick={nameAsc}>
                  Name ASC
                </button>
                <button className="nameDescBtn" onClick={nameDesc}>
                  Name DESC
                </button>
              </TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">
                Program(s)
                <button className="ccsSortBtn" onClick={ccsSort}>
                  CCS
                </button>
                <button className="choicesSortBtn" onClick={choicesSort}>
                  Choices
                </button>
                <button className="pspSortBtn" onClick={pspSort}>
                  PSP
                </button>
                <button className="allSortBtn" onClick={allSort}>
                  All
                </button>
              </TableCell>
              <TableCell align="right">
                Status
                <button className="hideDischargeBtn" onClick={filterDischarged}>Hide Discharged</button>
                <button className="showAllBtn" onClick={allSort}>Show All</button>
              </TableCell>
              <TableCell align="right">
                County
                <button className="countyAscBtn" onClick={countyAsc}>
                  County ASC
                </button>
                <button className="countyDescBtn" onClick={countyDesc}>
                  County DESC
                </button>
              </TableCell>
              <TableCell align="right">Avatar/ID</TableCell>
              <TableCell align="right">Date of Birth</TableCell>
              <TableCell align="right">Referring Worker</TableCell>

              <TableCell align="right">

              <button className="printAllBtn" onClick={ButtonClick}> Print All </button>

              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
