import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";

import Styles from "./RefuelEntry.module.css";
import Cover from "../../Cover/Cover";

const RefuelEntry = (props) => {
  const vehicles = ["Activa 4g", "TVS Victor GL", "R15 v4"];
  const [value, setValue] = useState("1");
  const [record, setrecord] = useState({
    vehicle: null,
    odometerReading: null,
    fuelAdded: null,
  });
  const [addNewVeh, setaddNewVeh] = useState(null);

  const handleChange = (event, newValue) => {
    if (newValue === "2") {
      setrecord({
        vehicle: null,
        odometerReading: null,
        fuelAdded: null,
      });
    }
    setValue(newValue);
  };

  const newVehIpHandler = (event, value, reason) => {
    if (reason === "clear" || event.target.value.length === 0) {
      setaddNewVeh(null);
    } else if (reason === "selectOption") {
      setaddNewVeh(event.target.outerText);
    } else {
      setaddNewVeh(event.target.value);
    }
  };

  const newRecordHandler = (event, value, reason, type) => {
    let recordToBeAdded = { ...record };
    if (type === "odo") {
      recordToBeAdded.odometerReading =
        event.target.value.length === 0 ? null : event.target.value;
      setrecord(recordToBeAdded);
    } else if (type === "fuel") {
      recordToBeAdded.fuelAdded =
        event.target.value.length === 0 ? null : event.target.value;
      setrecord(recordToBeAdded);
    } else if (type === "veh") {
      if (reason === "clear" || event.target.value.length === 0) {
        recordToBeAdded.vehicle = null;
        setrecord(recordToBeAdded);
      } else if (reason === "selectOption") {
        recordToBeAdded.vehicle = event.target.outerText;
        setrecord(recordToBeAdded);
      }
    }
  };

  const addVehHandler = () => {
  }

  const addRecord = (
    <div className={Styles.addRecordCont}>
      <div className={Styles.optionsCont}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={vehicles}
          className={Styles.options}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select vehicle"
              helperText="Vehicle for which record is added"
            />
          )}
          onChange={(event, value, reason) =>
            newRecordHandler(event, value, reason, "veh")
          }
        />

        <TextField
          id="outlined-basic"
          label="Odometer Reading"
          variant="outlined"
          helperText="Odometer reading after refuel (Kms)"
          className={Styles.options}
          onChange={(event) => newRecordHandler(event, null, null, "odo")}
        />

        <TextField
          id="outlined-basic"
          label="Fuel Filled"
          helperText="Fuel filled (Litres)"
          variant="outlined"
          sx={{ borderColor: "red !important" }}
          className={Styles.options}
          onChange={(event) => newRecordHandler(event, null, null, "fuel")}
        />
      </div>
      <div className={Styles.addRecLastRec}>
        <p>Last Refuel Details</p>
        <div className={Styles.details}>
          <p>
            Odometer Reading : <strong>12000 km</strong>
          </p>
          <p>
            Fuel Filled: <strong>2.01 Litre</strong>
          </p>
        </div>
      </div>
    </div>
  );

  const addVehicle = (
    <div style={{ position: "relative", margin: "1rem" }}>
      <div className={Styles.optionsCont}>
        <Autocomplete
          onChange={(event, value, reason) =>
            newVehIpHandler(event, value, reason)
          }
          freeSolo={true}
          disablePortal
          id="combo-box-demo"
          options={vehicles}
          className={Styles.options}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(event) => newVehIpHandler(event)}
              label="Select vehicle"
              helperText="Select new vehicle to be added"
            />
          )}
        />
      </div>
      <div className={Styles.vehAddSumm}>
        Vehicle to be added is : {addNewVeh}
      </div>
      <button
        className={Styles.addVehBtn}
        disabled={addNewVeh === null}
        onClick={addVehHandler}
      >
        Add Vehicle
      </button>
    </div>
  );

  return (
    <React.Fragment>
      <Cover />
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
            <TabPanel value="1">{addRecord}</TabPanel>
            <TabPanel value="2">{addVehicle}</TabPanel>
          </TabContext>
        </div>
        <div
          className={Styles.reDiv}
          style={{ display: value === "1" ? "block" : "none" }}
        >
          <div className={Styles.summTitle}>Summary</div>
          {record.vehicle !== null &&
          record.fuelAdded !== null &&
          record.odometerReading !== null ? (
            <div className={Styles.summCont}>
              <div className={Styles.summDetails}>
                <p>{record.odometerReading} KM</p>
                <span>Odometer Reading</span>
              </div>
              <div className={Styles.summDetails}>
                <p>{record.fuelAdded} Litres</p>
                <span>Fuel Filled</span>
              </div>
              <p className={Styles.summVehType}>{record.vehicle}</p>
            </div>
          ) : (
            <p
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                height: "50%",
              }}
            >
              Add details to view summary....
            </p>
          )}
          <button
            disabled={
              record.vehicle !== null &&
              record.fuelAdded !== null &&
              record.odometerReading !== null
                ? false
                : true
            }
          >
            Submit
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RefuelEntry;
