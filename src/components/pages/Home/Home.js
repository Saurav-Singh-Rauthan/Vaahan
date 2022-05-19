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
      title: "What is Vaahan? 🤔",
      desc: "A website for storing details related to your vehicle's mileage and performance just by entering your fuelling details. Get monthly details like : amount spent on fuelling, average mileage after every refill, compare mileage with similar vehicles",
      id: 1,
    },
    {
      title: "How to use this website? 👀",
      desc: "Go to the help section of the website (❔) to know about how to operate the site",
      id: 2,
    },
    {
      title: "Is my shared data safe? 😥",
      desc: "Yes!😄 the data that you'll provide is safe.",
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
        Want to configure for your district & state?{" "}
        <Link to="/auth">Sign Up / Sign In</Link>
      </p>
      <h1>About Vaahan</h1>
      <Accordian data={accordianData} />
    </div>
  );
};

export default Home;
