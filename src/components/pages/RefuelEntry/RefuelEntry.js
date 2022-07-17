import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Styles from "./RefuelEntry.module.css";

const RefuelEntry = (props) => {
  const vehicles = ["Activa 4g", "TVS Victor GL", "R15 v4"];
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={Styles.container}>
      <div className={Styles.dataDiv}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={vehicles}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select vehicle" />
          )}
        />
      </div>
      <div className={Styles.reDiv}>b</div>
    </div>
  );
};

export default RefuelEntry;
