import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Styles from "./RefuelEntry.module.css";
import "./customTab.css";

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
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
            className={Styles.tabContainer}
          >
            <TabList onChange={handleChange} centered={true}>
              <Tab label="Add Record" value="1" />
              <Tab label="Add Vehicle" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className={Styles.addRecordCont}>
              <div className={Styles.optionsCont}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={vehicles}
                  className={Styles.options}
                  renderInput={(params) => (
                    <TextField {...params} label="Select vehicle" />
                  )}
                />

                <TextField
                  id="outlined-basic"
                  label="Odometer Reading"
                  variant="outlined"
                  placeholder="Odometer reading after refuel (Kms)"
                  className={Styles.options}
                />

                <TextField
                  id="outlined-basic"
                  label="Fuel Filled"
                  placeholder="Fuel filled (Litres)"
                  variant="outlined"
                  className={Styles.options}
                />
              </div>
              <div className={Styles.addRecLastRec}>
                <p>Last Refuel Details</p>
                <div className={Styles.details}>
                  <p>Odometer Reading : <strong>12000 km</strong></p>
                  <p>Fuel Filled: <strong>2 Litre</strong></p>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">Add Vehicle</TabPanel>
        </TabContext>
      </div>
      <div className={Styles.reDiv}>Summary</div>
    </div>
  );
};

export default RefuelEntry;
