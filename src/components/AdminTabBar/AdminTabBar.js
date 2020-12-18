import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AdminProvDisplay from "../AdminProvDisplay/AdminProvDisplay";
import AdminPartDisplay from "../AdminPartDisplay/AdminPartDisplay";
import WaitlistPart from "../WaitlistPart/WaitlistPart";
import { useDispatch, useSelector } from "react-redux";

// this component holds the tab bar for the admin page -- sources in the data tables

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // assigning participant reducer to part variable
  const part = useSelector((store) => store.participants);

  // declaring waitlistArray
  let waitlistArray = [];

  // declaring waitlistDisplay
  let waitlistDisplay = `Waitlist`;

  // loop through the participants to check for waitlist status and pushing them to waitlistArray
  for (let i = 0; i < part.length; i++) {
    if (part[i].status === "Waitlist") {
      waitlistArray.push(part);
    }
  }

  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("mounted");
    dispatch({ type: "GET_PART" });
    console.log(part);
  }, []);

  // loop through participants and assign each to a row
  {
    waitlistArray.length > 0
      ? (waitlistDisplay = `Waitlist(${waitlistArray.length})`)
      : (waitlistDisplay = `Waitlist`);
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#878C36", color: "white" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Providers" {...a11yProps(0)} />
          <Tab label="Participants" {...a11yProps(1)} />
          {/* dynamic display for waitlist participants */}
          <Tab label={waitlistDisplay} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AdminProvDisplay />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminPartDisplay />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WaitlistPart />
      </TabPanel>
    </div>
  );
}
