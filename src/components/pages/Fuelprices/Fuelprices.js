import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Styles from "./Fuelprices.module.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Fuelprice from "../../Fuelprice/Fuelprice";

const Fuelprices = (props) => {
  const districtSelector = useRef();

  const [location, setlocation] = useState({ state: null, district: null });
  const [selectedlocation, setselectedlocation] = useState({
    state: null,
    district: null,
  });
  const [fuelPrice, setfuelPrice] = useState({
    petrol: null,
    diesel: null,
  });

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

  const setLocationHandler = (event, type) => {
    if (type === "State") {
      setfuelPrice({
        petrol: null,
        diesel: null,
      });
      setselectedlocation((prevState) => {
        return {
          ...prevState,
          state: event.target.innerText,
          district: [],
        };
      });
    } else {
      setselectedlocation((prevState) => {
        return {
          ...prevState,
          district: event.target.innerText,
        };
      });
      fetchPriceHandler();
    }
  };

  const fetchPriceHandler = () => {
    axios
      .get(
        `https://api-fuelprices-india.herokuapp.com/price/state/district/?state=${selectedlocation.state}&district=${selectedlocation.district}&fuel=petrol`
      )
      .then((res) => {
        setfuelPrice((prevState) => {
          setfuelPrice({ ...prevState, petrol: res.data });
        });
        axios
          .get(
            `https://api-fuelprices-india.herokuapp.com/price/state/district/?state=${selectedlocation.state}&district=${selectedlocation.district}&fuel=diesel`
          )
          .then((res) => {
            setfuelPrice((prevState) => {
              setfuelPrice({ ...prevState, diesel: res.data });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(selectedlocation);

  return (
    <div className={Styles.container}>
      <p>Select required State and District</p>
      <div className={Styles.optionsContainer}>
        <Autocomplete
          disablePortal
          options={location.state !== null ? location.state : []}
          sx={{ width: "100%", maxWidth: "300px" }}
          renderInput={(params) => <TextField {...params} label="State" />}
          onChange={(event) => setLocationHandler(event, "State")}
        />
        {selectedlocation.state && location.district?.length > 0 ? (
          <Autocomplete
            ref={districtSelector}
            disablePortal
            options={location.district !== null ? location.district : []}
            sx={{ width: "100%", maxWidth: "300px" }}
            renderInput={(params) => <TextField {...params} label="District" />}
            onChange={(event) => setLocationHandler(event, "District")}
          />
        ) : location.district?.length < 1 ? (
          <p>Districts not available! Please choose another state</p>
        ) : null}
      </div>
      {selectedlocation.district?.length > 0 && selectedlocation.state ? (
        <Fuelprice
          price={fuelPrice}
          state={selectedlocation.state}
          district={selectedlocation.district}
        />
      ) : null}
    </div>
  );
};

export default Fuelprices;
