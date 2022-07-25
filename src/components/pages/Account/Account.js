import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

import Styles from "./Account.module.css";
import * as action from "../../Store/actions/index";
import Dialog from "../../Dialog/Dialog";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Account = (props) => {
  const districtSelector = useRef();
  let vehList = (
    <p
      style={{
        width: "100%",
        display: "flex",
        margin: "0 auto",
      }}
    >
      No registered vehicles.....
    </p>
  );
  let navigate = useNavigate();
  const [dialogOptions, setdialogOptions] = useState({
    openDialog: null,
  });

  const [editState, setEditState] = useState({
    edit: false,
    username: props.username,
    email: props.email,
    district: props.district,
    state: props.state,
  });

  const [location, setlocation] = useState({ state: null, district: null });
  const [selectedlocation, setselectedlocation] = useState({
    state: null,
    district: null,
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  useEffect(() => {
    setEditState({
      edit: false,
      username: props.username,
      email: props.email,
      district: props.district,
      state: props.state,
    });
  }, [props.username, props.email, props.district, props.state]);

  useEffect(() => {
    axios
      .get("https://api-fuelprices-india.herokuapp.com/states")
      .then((res) => {
        let stateData = [];
        Object.keys(res.data).map((stateKey) => {
          stateData.push({ label: stateKey });
        });

        setlocation((prevState) => {
          return { ...prevState, state: stateData };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedlocation.state) {
      axios
        .get(
          `https://api-fuelprices-india.herokuapp.com/state/district?state=${selectedlocation.state}`
        )
        .then((res) => {
          let districtData = [];
          Object.keys(res.data).map((stateKey) => {
            districtData.push({ label: stateKey });
          });

          setlocation((prevState) => {
            return { ...prevState, district: districtData };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedlocation.state]);

  const editDetailsHandler = (event, type) => {
    setEditState({
      ...editState,
      edit: !editState.edit,
    });
    if (type === "save") {
    }
  };

  const ipChangeHandler = (event, type) => {
    switch (type) {
      case "name":
        setEditState({
          ...editState,
          username: event.target.value,
        });
        break;
      case "dis":
        setEditState({
          ...editState,
          district: event.target.value,
        });
        break;
      case "state":
        setEditState({
          ...editState,
          state: event.target.value,
        });
        break;
      default:
        console.log("invalid move my guy");
    }
  };

  const setLocationHandler = (event, type) => {
    if (type === "State") {
      setselectedlocation((prevState) => {
        return {
          ...prevState,
          state: event.target.innerText,
          district: [],
        };
      });
    } else {
      setselectedlocation({
        ...selectedlocation,
        district: event.target.outerText,
      });
    }
  };

  if (props.vehicles) {
    vehList = [];
    Object.keys(props.vehicles).forEach((veh) =>
      vehList.push(props.vehicles[veh].name)
    );
  }

  return (
    <React.Fragment>
      <Dialog
        setMethods={setdialogOptions}
        title={"Logout"}
        desc={"Are you sure you want to logout?"}
        onTrue={props.logout}
      />
      <div>
        <div className={Styles.btnCont}>
          <button
            onClick={() => editDetailsHandler(editState.edit ? "save" : "edit")}
            className={editState.edit ? Styles.save : null}
          >
            {editState.edit ? "SAVE DETAILS" : "EDIT DETAILS"}
          </button>
          <button onClick={dialogOptions?.openDialog}>LOGOUT</button>
        </div>
        <div className={Styles.container}>
          <div>
            <p className={Styles.heading}>User Details :</p>
            <div>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={editState.username !== null ? editState.username : ""}
                helperText="Your display name"
                className={Styles.userDetails}
                disabled={!editState.edit ? true : false}
                onChange={(event) => ipChangeHandler(event, "name")}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={editState.email !== null ? editState.email : ""}
                helperText="Registered mail ID"
                disabled
                className={Styles.userDetails}
              />
              <Autocomplete
                disablePortal
                disabled={!editState.edit ? true : false}
                value={editState.state !== null ? editState.state : ""}
                className={Styles.autoComp}
                options={location.state !== null ? location.state : []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="State"
                    helperText="Your preffered State for fuel price info"
                  />
                )}
                onChange={(event) => setLocationHandler(event, "State")}
              />
              {selectedlocation.state && location.district?.length > 0 ? (
                <Autocomplete
                  ref={districtSelector}
                  className={Styles.autoComp}
                  disablePortal
                  value={editState.district !== null ? editState.district : ""}
                  options={location.district !== null ? location.district : []}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="District"
                      helperText="Your preffered district for fuel price info"
                    />
                  )}
                  disabled={!editState.edit ? true : false}
                  onChange={(event) => setLocationHandler(event, "District")}
                />
              ) : location.district?.length < 1 ? (
                <p>Districts not available! Please choose another state</p>
              ) : null}
            </div>
          </div>
          <div>
            <p className={Styles.heading}>Vehicles : </p>
            <div className={Styles.userVeh}>
              {typeof vehList === "object" ? (
                <ul style={{ listStyleType: "square" }}>
                  {vehList.map((veh) => (
                    <li>{veh}</li>
                  ))}
                </ul>
              ) : (
                vehList
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
    email: state.user.email,
    username: state.user.username,
    district: state.user.district,
    state: state.user.state,
    vehicles: state.user.vehicles,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      dispatch(action.logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
