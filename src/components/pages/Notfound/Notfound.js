import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Styles from "./Notfound.module.css";
import notfoundimg from "../../../assests/undraw_page_not_found_re_e9o6.svg";

const Notfound = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={Styles.container}>
      <img src={notfoundimg} alt="Page not found" className={Styles.img} />
      <p>The page you're looking for doesn't exist</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Notfound;
