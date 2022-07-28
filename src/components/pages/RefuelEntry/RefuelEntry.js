import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CircularProgress from "@mui/material/CircularProgress";
import axiosV from "../../../axiosVahan";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

import Styles from "./RefuelEntry.module.css";
import Cover from "../../Cover/Cover";
import * as actions from "../../Store/actions/index";
import Alert from "../../Alert/Alert";
import Validate from "../../Validator/Validator";

const RefuelEntry = (props) => {
  const navigate = useNavigate();
  const vehicles = [];
  let globalVehicles = [];
  const [value, setValue] = useState("1");
  const [record, setrecord] = useState({
    vehicle: null,
    odometerReading: null,
    fuelAdded: null,
    fuelCost: null,
  });
  const [addNewVeh, setaddNewVeh] = useState(null);
  const [selectedVeh, setselectedVeh] = useState(null);
  const [touchState, settouchState] = useState({
    odo: false,
    fuel: false,
    cost: false,
  });
  const [loading, setloading] = useState({
    rec: false,
    newVeh: false,
  });
  const [alert, setalert] = useState({
    type: null,
    msg: null,
    open: false,
  });

  useEffect(() => {
    if (props.isAuthenticated) {
      props.fetch_userDetails();
    }
  }, [value, record]);

  useEffect(() => {
    if (props.isAuthenticated) {
      props.fetch_globalVeh();
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    if (newValue === "2") {
      setrecord({
        vehicle: null,
        odometerReading: null,
        fuelAdded: null,
        fuelCost: null,
      });
      settouchState({
        odo: false,
        fuel: false,
        cost: false,
      });
    }

    setloading({
      rec: false,
      newVeh: false,
    });

    setValue(newValue);
  };

  const newVehIpHandler = (event, value, reason) => {
    if (reason === "clear" || event.target.value.length === 0) {
      console.log("clear");
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
    } else if (type === "cost") {
      recordToBeAdded.fuelCost =
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
        vehSelected.code = Object.keys(props.userVehicles).filter(
          (veh) => props.userVehicles[veh]?.name === event.target.outerText
        )[0];
        setselectedVeh(vehSelected);
        setrecord(recordToBeAdded);
      }
    }
  };

  const checkContentHandler = (event) => {
    if (event.target.defaultValue.length === 0) {
      setaddNewVeh(null);
    }
  };

  const touchHandler = (type) => {
    if (type === "odo") {
      settouchState({
        ...touchState,
        odo: true,
      });
    } else if (type === "fuel") {
      settouchState({
        ...touchState,
        fuel: true,
      });
    } else {
      settouchState({
        ...touchState,
        cost: true,
      });
    }
  };

  const addVehHandler = () => {
    setloading({
      rec: false,
      veh: true,
    });

    const vehData = {
      name: addNewVeh,
      last_odometer: 0,
      last_fuel: 0,
      last_fuelcost: 0,
      last_distance: 0,
      last_updated: 0,
      mileage: {
        last_entry: 0,
        mileage_list: [{ mileage: 0 }],
      },
      monthly_spending: 0,
      monthly_distanceTravelled: 0,
      average_mileage: 0,
      prev_month: {
        avg: 0,
        spendings: 0,
        distance: 0,
      },
    };

    axiosV
      .get(
        `/users/${props.userId}/vehicles.json?auth=${props.token}&orderBy="name"&equalTo="${addNewVeh}"`
      )
      .then((res) => {
        if (Object.keys(res.data).length === 0) {
          axiosV
            .post(
              `/users/${props.userId}/vehicles.json?auth=${props.token}`,
              vehData
            )
            .then((res) => {
              console.log(res, "veh added");
              setalert({
                open: true,
                type: "success",
                msg: "New Vehicle added",
              });
            })
            .catch((err) => {
              console.log(err);
              setalert({
                open: true,
                type: "error",
                msg: "Couldn't add new vehicle!",
              });
            });
        } else {
          alert("vehicle already exists!!!");
        }

        axiosV
          .get(
            `/vehicles.json?auth=${props.token}&orderBy="name"&equalTo="${addNewVeh}"`
          )
          .then((res) => {
            console.log(Object.keys(res.data).length, "search veh");
            if (!Object.keys(res.data).length) {
              let newEntry = {
                name: addNewVeh,
                mileage: [{ mileage: 0 }],
              };
              axiosV
                .post(`/vehicles.json?auth=${props.token}`, newEntry)
                .then((res) => {
                  console.log(res, "global entry added");
                  setalert({
                    open: true,
                    type: "success",
                    msg: "record added in global entry",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  setalert({
                    open: true,
                    type: "error",
                    msg: "Couldn't add record in global entry!",
                  });
                });
            }
          })
          .catch((err) => {
            console.log(err);
            setalert({
              open: true,
              type: "error",
              msg: "Couldn't fetch vehicle details!",
            });
          });

        setTimeout(() => {
          setaddNewVeh(null);
          setValue("1");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setalert({
          open: true,
          type: "error",
          msg: "Couldn't fetch vehicle details!",
        });
      });
  };

  const addRecordHandler = () => {
    setloading({
      rec: true,
      veh: false,
    });

    let mileage = 0,
      average_mileage = 0,
      atZero = false,
      num = 0,
      sum = 0,
      mileage_list = [{ mileage: 0 }];

    mileage = {
      mileage:
        Math.abs(record.odometerReading - selectedVeh.last_odometer) /
        selectedVeh.last_fuel,
    };

    mileage_list = [...selectedVeh.mileage?.mileage_list];
    if (mileage_list.length >= 50) {
      mileage_list[(selectedVeh.mileage.last_entry + 1) % 50] = mileage;
    } else {
      if (selectedVeh.mileage.mileage_list[0].mileage === 0) {
        atZero = true;
        mileage_list[0] = {
          mileage:
            Math.abs(record.odometerReading - selectedVeh.last_odometer) /
            record.fuelAdded,
        };
      } else {
        console.log("not zero");
        mileage_list.push(mileage);
      }
    }

    average_mileage = mileage_list.reduce((prev, curr) => {
      num++;
      return prev + curr.mileage;
    }, sum);
    console.log(selectedVeh, "selectedVeh");
    average_mileage = average_mileage / num;

    const new_record = {
      mileage: {
        last_entry: (atZero ? 0 : selectedVeh.mileage.last_entry + 1) % 50,
        mileage_list,
      },
      average_mileage,
      last_fuel: record.fuelAdded,
      last_odometer: record.odometerReading,
      last_fuelcost: record.fuelCost,
      last_distance: Math.abs(
        selectedVeh.last_odometer - record.odometerReading
      ),
      monthly_distanceTravelled:
        selectedVeh.monthly_distanceTravelled +
        Math.abs(selectedVeh.last_odometer - record.odometerReading),
      monthly_spending:
        parseFloat(selectedVeh.monthly_spending) + parseFloat(record.fuelCost),
      name: selectedVeh.name.trim(),
      prev_month: selectedVeh.prev_month,
      last_updated: new Date().getTime(),
    };

    axiosV
      .get(
        `/vehicles.json?auth=${
          props.token
        }&orderBy="name"&equalTo="${selectedVeh.name.trim()}"`
      )
      .then((res) => {
        let prevData = { ...res.data[Object.keys(res.data)[0]] };
        console.log(selectedVeh.name.trim(), "prevData", prevData, new_record);
        if (res.data) {
          if (prevData.mileage[0].mileage === 0) {
            prevData.mileage.pop();
          }
          console.log(
            "new glob record",
            new_record.mileage,
            new_record.mileage.mileage_list[
              (new_record.mileage.last_entry > 0
                ? new_record.mileage.last_entry - 1
                : new_record.mileage.last_entry) % 50
            ]
          );
          prevData.mileage.push(
            new_record.mileage.mileage_list[
              (new_record.mileage.last_entry > 0
                ? new_record.mileage.last_entry - 1
                : new_record.mileage.last_entry) % 50
            ]
          );

          console.log("upd Glob", prevData);

          axiosV
            .put(
              `/vehicles/${Object.keys(res.data)[0]}.json?auth=${props.token}`,
              prevData
            )
            .then((res) => {
              console.log(res, prevData, "global fuel for pert Veh");
              setalert({
                open: true,
                type: "success",
                msg: "Global entry added",
              });
            })
            .catch((err) => {
              console.log(err);
              setalert({
                open: true,
                type: "success",
                msg: "Couldn't add global entry",
              });
            });
        }
      });

    axiosV
      .put(
        `/users/${props.userId}/vehicles/${
          selectedVeh.code
        }.json?auth=${localStorage.getItem("token")}`,
        new_record
      )
      .then((res) => {
        console.log(res, "record added");
        setalert({
          open: true,
          type: "success",
          msg: "Record added",
        });
        props.isNewMonth(res.data, props.userId, selectedVeh.code);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setalert({
          open: true,
          type: "error",
          msg: "Couldn't add record!",
        });
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

        <TextField
          id="outlined-basic"
          label="Fuel Cost"
          variant="outlined"
          onBlur={() => touchHandler("fuel")}
          error={
            Validate(record.fuelCost, "isNumberOnly|isRequired").isValid ===
              false && touchState.fuelCost === true
              ? true
              : false
          }
          helperText={
            Validate(record.fuelCost, "isNumberOnly|isRequired").isValid ===
              false && touchState.fuelCost === true
              ? Validate(record.fuelCost, "isNumberOnly|isRequired").errorMsg
              : "Cost of Fuel Filled (₹)"
          }
          className={Styles.options}
          onChange={(event) => newRecordHandler(event, null, null, "cost")}
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
          options={globalVehicles}
          className={Styles.options}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(event) => newVehIpHandler(event)}
              onBlur={(event) => checkContentHandler(event)}
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
        {loading.newVeh === false ? "Add Vehicle" : null}
        <Box
          sx={{
            display: loading.veh === true ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={18} sx={{ color: "#ffe26a" }} />
        </Box>
      </button>
    </div>
  );

  if (props.userVehicles) {
    Object.keys(props.userVehicles).map((veh) => {
      vehicles.push(props.userVehicles[veh]?.name);
    });
  }

  if (props.globalVeh) {
    Object.keys(props.globalVeh).forEach((veh) => {
      globalVehicles.push(props.globalVeh[veh].name);
    });
  }

  return (
    <React.Fragment>
      <Cover />
      <Alert type={alert.type} open={alert.open} msg={alert.msg} />
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
            onClick={addRecordHandler}
            disabled={
              record.vehicle !== null &&
              record.fuelAdded !== null &&
              Validate(record.fuelAdded, "isNumberOnly|isRequired").isValid &&
              Validate(
                `${record.odometerReading}|${selectedVeh?.last_odometer}`,
                "isMoreThan|isNumberOnly|isRequired"
              ).isValid &&
              Validate(record.fuelCost, "isNumberOnly|isRequired").isValid &&
              record.odometerReading !== null
                ? false
                : true
            }
          >
            {loading.rec === false ? "Submit" : null}
            <Box
              sx={{
                display: loading.rec === true ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={18} sx={{ color: "#ffe26a" }} />
            </Box>
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
    isAuthenticated: state.auth.token !== null,
    globalVeh: state.veh.vehicles,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch_userDetails: () => {
      dispatch(actions.fetchUserDetails());
    },
    fetch_globalVeh: () => {
      dispatch(actions.fetch_veh());
    },
    isNewMonth: (rec, userId, code) => {
      dispatch(actions.isNewMonth(rec, userId, code));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RefuelEntry);
