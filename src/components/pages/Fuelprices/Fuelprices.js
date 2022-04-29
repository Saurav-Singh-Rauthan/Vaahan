import React, { useState, useEffect } from "react";
import axios from "axios";

import Styles from "./Fuelprices";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Fuelprice from "../../Fuelprice/Fuelprice";

const Fuelprices = (props) => {
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
      setselectedlocation((prevState) => {
        return {
          ...prevState,
          state: event.target.innerText,
        };
      });
    } else {
      setselectedlocation((prevState) => {
        return {
          ...prevState,
          district: event.target.innerText,
        };
      });
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

  return (
    <div>
      fuel prices here
      <Autocomplete
        disablePortal
        options={location.state !== null ? location.state : []}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="State" />}
        onChange={(event) => setLocationHandler(event, "State")}
      />
      {selectedlocation.state && location.district?.length > 0 ? (
        <Autocomplete
          disablePortal
          options={location.district !== null ? location.district : []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="District" />}
          onChange={(event) => setLocationHandler(event, "District")}
        />
      ) : (
        <p>District not available</p>
      )}
      <button onClick={fetchPriceHandler}>Fetch Price</button>
      {selectedlocation.district && selectedlocation.state ? (
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
