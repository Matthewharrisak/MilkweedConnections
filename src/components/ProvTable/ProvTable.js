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
import userReducer from "../../redux/reducers/user.reducer";
import ProvCard from "../ProvCard/ProvCard";
import React, { useState, useEffect } from 'react';

// this component hold the data table for providers that are being displayed for admins

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(
  id,
  email,
  active,
  first_name,
  last_name,
  phone_num,
  programs,
  openings,
  schedule,
  user_id,
) {
  return {
  id,
  first_name,
  last_name,
  phone_num,
  email,
  details: [{ openings, schedule, user_id, programs, active, }],
};
}

function Row(props) {
  const { row } = props;
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
        <TableCell align="right">{row.programs}</TableCell>
        <TableCell align="right">{row.schedule}</TableCell>
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
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Programs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow) => (

                    <TableRow key={detailsRow.id}>
                      <TableCell component="th" scope="row">
                        {detailsRow.openings}
                      </TableCell>
                      <TableCell>{detailsRow.schedule}</TableCell>
                      <TableCell>{detailsRow.user_id}</TableCell>
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

  const prov = useSelector((store) => store.provider.providerReducer);

  for (let i = 0; i < prov.length; i++) {
    console.log(prov[i]);
    if (prov[i]) {
      rows[i] = createData(
        prov[i].id,
        prov[i].active,
        prov[i].first_name,
        prov[i].last_name,
        prov[i].phone_num,
        prov[i].email,
        prov[i].programs,
        prov[i].openings,
        prov[i].schedule,
        prov[i].user_id
      );
    }
  }

  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("as,d.fmasd,./fma");
    dispatch({ type: "GET_PROV"});
    dispatch({ type: "GET_ALL_PROVS" });
    console.log("prov");
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
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

