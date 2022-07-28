import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { connect } from "react-redux";

import Styles from "./Dashboard.module.css";
import Countuptab from "../../DashboardUI/CountupTab/Countuptab";
import MileageChart from "../../DashboardUI/MileageChart/MileageChart";
import VehCondition from "../../DashboardUI/VehCondition/VehCondition";
import RadarMileage from "../../DashboardUI/RadarMileage/RadarMileage";
import Cover from "../../Cover/Cover";
import * as actions from "../../Store/actions/index";

const Dashboard = (props) => {
  const [selectedVeh, setselectedVeh] = useState(null);
  const [selectedGlobVeh, setselectedGlobVeh] = useState(null);
  let vehicles = [""];

  useEffect(() => {
    if (props.isAuthenticated) {
      props.fetch_userDetails();
      props.fetch_veh();
    }
  }, []);

  const vehSelectHandler = (event) => {
    const selectedVeh =
      props.vehicles[
        Object.keys(props.vehicles).filter(
          (veh) => props.vehicles[veh].name === event.target.value
        )[0]
      ];

    const selectedGlobVeh =
      props.globalVeh[
        Object.keys(props.globalVeh).filter(
          (veh) => props.globalVeh[veh].name === event.target.value
        )[0]
      ];
      
    setselectedVeh(selectedVeh);
    setselectedGlobVeh(selectedGlobVeh);
  };

  const dashboardComps = (
    <React.Fragment>
      <div>
        <div className={Styles.MonthStats}>Monthly Stats</div>
        <div className={Styles.monthlydetails}>
          <Countuptab type="money" value={selectedVeh?.monthly_spending} />
          <Countuptab type="mileage" value={selectedVeh?.average_mileage} />
          <Countuptab
            type="dist"
            value={selectedVeh?.monthly_distanceTravelled}
          />
        </div>
      </div>

      <div>
        <div className={Styles.MonthStats}>Relative Performance</div>
        <div className={Styles.mileageComp}>
          <div className={Styles.mileageCompDiv}>
            <MileageChart
              data={selectedGlobVeh?.mileage}
              userMileage={selectedVeh?.average_mileage}
            />
          </div>
          <div className={Styles.mileageCompDiv}>
            <VehCondition
              current={selectedVeh?.mileage ? selectedVeh?.average_mileage : 0}
              last={
                selectedVeh?.mileage
                  ? selectedVeh.mileage?.mileage_list[
                      selectedVeh.mileage?.last_entry > 0
                        ? (selectedVeh.mileage?.last_entry - 1) % 50
                        : selectedVeh.mileage?.last_entry
                    ].mileage
                  : 0
              }
            />
          </div>
        </div>
      </div>

      <div>
        <div className={Styles.MonthStats}>Last Trip</div>
        <div className={Styles.monthlydetails}>
          <Countuptab type="money" value={selectedVeh?.last_fuelcost} />
          <Countuptab
            type="mileage"
            value={
              selectedVeh?.average_mileage
                ? selectedVeh?.mileage.mileage_list[
                    selectedVeh.mileage?.last_entry > 0
                      ? `${(selectedVeh.mileage.last_entry - 1) % 50}`
                      : `${selectedVeh.mileage.last_entry % 50}`
                  ].mileage
                : 0
            }
          />
          <Countuptab type="dist" value={selectedVeh?.last_distance} />
        </div>
      </div>

      <div>
        <div className={Styles.MonthStats}>Previous Performance</div>
        <div className={Styles.mileageCompPrev}>
          <div className={Styles.mileageCompPrevDiv}>
            <RadarMileage data={selectedVeh?.mileage.mileage_list} />
          </div>
          <div className={Styles.mileageCompPrevDiv}>
            <MileageChart data={selectedVeh?.mileage.mileage_list} />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <div className={Styles.MonthStats}>Last Month</div>
        <div className={Styles.monthlydetails}>
          <Countuptab type="money" value={selectedVeh?.prev_month.spendings} />
          <Countuptab type="mileage" value={selectedVeh?.prev_month.avg} />
          <Countuptab type="dist" value={selectedVeh?.prev_month.distance} />
        </div>
      </div>
    </React.Fragment>
  );

  if (props.vehicles) {
    vehicles = Object.keys(props.vehicles).map((veh) => {
      return props.vehicles[veh].name;
    });
  }

  return (
    <React.Fragment>
      <Cover />
      <div className={Styles.VehInfo}>
        <p>
          Greetings! {"   "}
          <span style={{ color: "#75c9b7" }}>
            {props.username ? props.username : "UserXYZ"}
          </span>{" "}
        </p>
        <div className={Styles.selectCont}>
          <FormControl fullWidth variant="filled">
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: "#75c9b7 !important", maxWidth: "80%" }}
            >
              Selected Vehicle
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={Styles.selectInp}
              label="Age"
              onChange={(event) => vehSelectHandler(event)}
              sx={{
                color: "#75c9b7 !important",
                minWidth: "250px",
                maxWidth: "80%",
              }}
              defaultValue={""}
            >
              {vehicles.map((vehName) => {
                return (
                  <MenuItem value={vehName} key={vehName}>
                    {vehName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      {selectedVeh !== null ? (
        dashboardComps
      ) : (
        <p
          style={{ display: "flex", width: "fit-content", margin: "8rem auto" }}
        >
          Choose a vehicle to continue
        </p>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    vehicles: state.user.vehicles,
    isAuthenticated: state.auth.token !== null,
    username: state.user.username,
    globalVeh: state.veh.vehicles,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch_userDetails: () => {
      dispatch(actions.fetchUserDetails());
    },
    fetch_veh: () => {
      dispatch(actions.fetch_veh());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
