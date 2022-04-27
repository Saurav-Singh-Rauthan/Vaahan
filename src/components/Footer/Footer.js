import React from "react";

import Styles from "./Footer.module.css";

const Footer = (props) => {
  return (
    <div className={Styles.container}>
      <div>
        © 2022{" "}
        <a
          className={Styles.link}
          href="https://github.com/Saurav-Singh-Rauthan"
          target={"_"}
        >
          Saurav Singh Rauthan
        </a>
      </div>
    </div>
  );
};

export default Footer;
