import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import axiosV from "../../../axiosVahan";

import Styles from "./Account.module.css";
import * as action from "../../Store/actions/index";
import Dialog from "../../Dialog/Dialog";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "../../../components/Alert/Alert";

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
  const [alert, setalert] = useState({
    open: null,
    type: null,
    msg: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        setalert({
          open: true,
          type: "error",
          msg: "Couldn't fetch states!",
        });
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
          setalert({
            open: true,
            type: "error",
            msg: "Couldn't fetch districts!",
          });
        });
    }
  }, [selectedlocation.state]);

  const editDetailsHandler = (event, type) => {
    setEditState({
      ...editState,
      edit: !editState.edit,
    });
    if (type === "save") {
      const updatedVal = {
        email: editState.email,
        state: editState.state,
        district: editState.district,
        username: editState.username,
        vehicles: props.vehicles,
      };
      axiosV
        .put(`/users/${props.userId}.json?auth=${props.token}`, updatedVal)
        .then((res) => {
          setalert({
            open: true,
            type: "success",
            msg: "Details Updated!",
          });
        })
        .catch((err) => {
          console.log(err);
          setalert({
            open: true,
            type: "error",
            msg: "Couldn't update details!",
          });
        });
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
      setEditState({
        ...editState,
        state: event.target.innerText,
      });
    } else {
      setselectedlocation({
        ...selectedlocation,
        district: event.target.outerText,
      });
      setEditState({
        ...editState,
        district: event.target.innerText,
      });
    }
  };

  if (props.vehicles) {
    const vehs = Object.keys(props.vehicles).map(
      (veh) => props.vehicles[veh].name
    );
    vehList = vehs.map((veh) => {
      return <li key={veh}>{veh}</li>;
    });
  }

  return (
    <React.Fragment>
      <Alert open={alert.open} type={alert.type} msg={alert.msg} />
      <Dialog
        setMethods={setdialogOptions}
        title={"Logout"}
        desc={"Are you sure you want to logout?"}
        onTrue={props.logout}
      />
      <div>
        <div className={Styles.btnCont}>
          <button
            onClick={(event) =>
              editDetailsHandler(event, editState.edit ? "save" : "edit")
            }
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
              <ul style={{ listStyleType: "square" }}>{vehList}</ul>
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
    token: state.auth.token,
    userId: state.user.id,
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
