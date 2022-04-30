import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Styles from "./Home.module.css";
import Accordian from "../../Accordion/Accordion";
import Fuelprice from "../../Fuelprice/Fuelprice";

const Home = (props) => {
  const [fuelPrice, setfuelPrice] = useState({
    petrol: null,
    diesel: null,
  });

  useEffect(() => {
    axios
      .get(
        "https://api-fuelprices-india.herokuapp.com/price/state/district/?state=Maharashtra&district=Pune&fuel=petrol"
      )
      .then((res) => {
        setfuelPrice((prevState) => {
          setfuelPrice({ ...prevState, petrol: res.data });
        });
        axios
          .get(
            "https://api-fuelprices-india.herokuapp.com/price/state/district/?state=Maharashtra&district=Pune&fuel=diesel"
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
  }, []);

  let accordianData = [
    {
      title: "accordian1",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea beatae reprehenderit dolore dignissimos soluta, vitae vero, repellendus animi nihil consequatur nisi aliquam libero dolor minima illum quasi fuga, dolores repudiandae!",
      id: 1,
    },
    {
      title: "accordian2",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea beatae reprehenderit dolore dignissimos soluta, vitae vero, repellendus animi nihil consequatur nisi aliquam libero dolor minima illum quasi fuga, dolores repudiandae!",
      id: 2,
    },
    {
      title: "accordian3",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea beatae reprehenderit dolore dignissimos soluta, vitae vero, repellendus animi nihil consequatur nisi aliquam libero dolor minima illum quasi fuga, dolores repudiandae!",
      id: 3,
    },
  ];

  return (
    <div className={Styles.container}>
      <Fuelprice
        price={fuelPrice?.diesel && fuelPrice?.petrol ? fuelPrice : null}
        state="Maharashtra"
        district="Pune"
      />
      <p className={Styles.login}>
        Want to configure for your district & city?{" "}
        <Link to="/auth">Sign Up / Sign In</Link>
      </p>
      <h1>About Vaahan</h1>
      <Accordian data={accordianData} />
    </div>
  );
};

export default Home;
