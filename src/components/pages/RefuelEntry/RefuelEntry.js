import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import { connect } from "react-redux";

import Styles from "./RefuelEntry.module.css";
import Cover from "../../Cover/Cover";
import * as actions from "../../Store/actions/index";
import Validate from "../../Validator/Validator";

const RefuelEntry = (props) => {
  const vehicles = [];
  const [value, setValue] = useState("1");
  const [record, setrecord] = useState({
    vehicle: null,
    odometerReading: null,
    fuelAdded: null,
  });
  const [addNewVeh, setaddNewVeh] = useState(null);
  const [selectedVeh, setselectedVeh] = useState(null);
  const [touchState, settouchState] = useState({
    odo: false,
    fuel: false,
  });

  useEffect(() => {
    props.fetch_userDetails();
  }, [value]);

  const handleChange = (event, newValue) => {
    if (newValue === "2") {
      setrecord({
        vehicle: null,
        odometerReading: null,
        fuelAdded: null,
      });
      settouchState({
        odo: false,
        fuel: false,
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
        setselectedVeh(null);
      } else if (reason === "selectOption") {
        recordToBeAdded.vehicle = event.target.outerText;
        const vehSelected =
          props.userVehicles[
            Object.keys(props.userVehicles).filter(
              (veh) => props.userVehicles[veh].name === event.target.outerText
            )
          ];
        setselectedVeh(vehSelected);
        setrecord(recordToBeAdded);
      }
    }
  };

  const touchHandler = (type) => {
    if (type === "odo") {
      settouchState({
        ...touchState,
        odo: true,
      });
    } else {
      settouchState({
        ...touchState,
        fuel: true,
      });
    }
  };

  const addVehHandler = () => {
    const vehData = {
      name: addNewVeh,
      last_odometer: 0,
      last_fuel: 0,
      mileage: {
        last_entry: 0,
        mileage_list: [0],
      },
      monthly_spending: 0,
      monthly_distanceTravelled: 0,
      avg_mileage: 0,
    };

    axios
      .get(
        `https://vaahan-1df59-default-rtdb.firebaseio.com/users/${props.userId}/vehicles.json?auth=${props.token}&orderBy="name"&equalTo="${addNewVeh}"`
      )
      .then((res) => {
        if (Object.keys(res.data).length === 0) {
          axios
            .post(
              `https://vaahan-1df59-default-rtdb.firebaseio.com/users/${props.userId}/vehicles.json?auth=${props.token}`,
              vehData
            )
            .then((res) => {
              console.log(res, "veh added");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("vehicle already exists!!!");
        }
        setTimeout(() => {
          setValue("1");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          onBlur={() => touchHandler("odo")}
          placeholder="Should be more than last odometer reading"
          error={
            Validate(
              `${record.odometerReading}|${selectedVeh?.last_odometer}`,
              "isMoreThan|isNumberOnly|isRequired"
            ).isValid === false && touchState.odo === true
              ? true
              : false
          }
          helperText={
            Validate(
              `${record.odometerReading}|${selectedVeh?.last_odometer}`,
              "isMoreThan|isNumberOnly|isRequired"
            ).isValid === false && touchState.odo === true
              ? Validate(
                  `${record.odometerReading}|${selectedVeh?.last_odometer}`,
                  "isMoreThan|isNumberOnly|isRequired"
                ).errorMsg
              : "Odometer reading after refuel (Kms)"
          }
          className={Styles.options}
          onChange={(event) => newRecordHandler(event, null, null, "odo")}
        />

        <TextField
          id="outlined-basic"
          label="Fuel Filled"
          onBlur={() => touchHandler("fuel")}
          error={
            Validate(record.fuelAdded, "isNumberOnly|isRequired").isValid ===
              false && touchState.fuel === true
              ? true
              : false
          }
          helperText={
            Validate(record.fuelAdded, "isNumberOnly|isRequired").isValid ===
              false && touchState.fuel === true
              ? Validate(record.fuelAdded, "isNumberOnly|isRequired").errorMsg
              : "Fuel filled (Litres)"
          }
          variant="outlined"
          className={Styles.options}
          onChange={(event) => newRecordHandler(event, null, null, "fuel")}
        />
      </div>
      <div className={Styles.addRecLastRec}>
        <p>Last Refuel Details</p>
        <div className={Styles.details}>
          <p>
            Odometer Reading : <strong>{selectedVeh?.last_odometer}</strong>
          </p>
          <p>
            Fuel Filled: <strong>{selectedVeh?.last_fuel} Litre(s)</strong>
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

  if (props.userVehicles) {
    Object.keys(props.userVehicles).map((veh) => {
      vehicles.push(props.userVehicles[veh]?.name);
    });
  }

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
                <p>{parseFloat(record.fuelAdded).toFixed(2)} Litres</p>
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
              Validate(record.fuelAdded, "isNumberOnly|isRequired").isValid &&
              Validate(
                `${record.odometerReading}|${selectedVeh?.last_odometer}`,
                "isMoreThan|isNumberOnly|isRequired"
              ).isValid &&
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

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.user.id,
    token: state.auth.token,
    userVehicles: state.user.vehicles,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch_userDetails: () => {
      dispatch(actions.fetchUserDetails());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RefuelEntry);
