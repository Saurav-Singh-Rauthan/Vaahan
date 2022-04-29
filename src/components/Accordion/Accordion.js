import React, { useState } from "react";

import Styles from "./Accordian.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";

const Accordian = (props) => {
  const [accOpen, setaccOpen] = useState();

  const changeOpenedHandler = (number) => {
    setaccOpen(number);
  };

  return (
    <div className={Styles.container}>
      {props.data?.map((item) => {
        return (
          <Accordion
            expanded={accOpen === item.id}
            onClick={() => changeOpenedHandler(item.id)}
            sx={{ color: "#75c9b7", background: "#16123f", width: "80%" }}
            key={item.id}
          >
            <AccordionSummary
              expandIcon={<AddIcon sx={{ color: "#75c9b7" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {item.title}
            </AccordionSummary>
            <AccordionDetails>{item.desc}</AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default Accordian;
