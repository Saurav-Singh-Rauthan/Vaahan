import React from "react";
import { HashLink as Link } from "react-router-hash-link";

import Styles from "./Help.module.css";

import img1 from "../../../assests/km_20220728_480p(1).gif";
import img2 from "../../../assests/km_20220728_480p(2).gif";
import img3 from "../../../assests/km_20220728_480p(3).gif";
import img4 from "../../../assests/km_20220728_480p(4).gif";
import img5 from "../../../assests/km_20220728_480p(5).gif";
import img6 from "../../../assests/km_20220728_480p.gif";

const Help = (props) => {
  return (
    <div>
      <div className={Styles.table}>
        <p className={Styles.heading}>Table of contents :</p>
        <ul>
          <li>
            <Link to="/help#dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/help#add-record">Adding Record</Link>
          </li>
          <li>
            <Link to="/help#add-vehicle">Adding Vehicle</Link>
          </li>
          <li>
            <Link to="/help#fuel-price">Checking fuel prices</Link>
          </li>
          <li>
            <Link to="/help#account">
              User account and editing user details
            </Link>
          </li>
          <li>
            <Link to="/help#speed-dial">Speed Dial</Link>
          </li>
        </ul>
      </div>

      <div id="dashboard" className={Styles.anchor}></div>
      <div>
        <div className={Styles.headingCont}>
          <p className={Styles.heading}>Dashboard</p>
          <Link to="/help#top">To Top ⬆️</Link>
        </div>
        <div className={Styles.content1}>
          <img src={img4} alt="img4" />
          <div>
            Dashboard helps to get insight of the vehicle at Link glance. You
            check the following things: Current Month information, Mileage
            comparison with same vehicle records in global record, Radar chart
            for all mileage records for your vehicle,Mileage chart for previous
            50 recordings,Last Trip information, Previous month information
          </div>
        </div>
      </div>

      <div id="add-record" className={Styles.anchor}></div>
      <div>
        <div className={Styles.headingCont}>
          <p className={Styles.heading}>Adding Record</p>
          <Link to="/help#top">To Top ⬆️</Link>
        </div>
        <div className={Styles.content2}>
          <img src={img3} alt="img3" />
          <div>
            To add new Link record for your vehicle perform following steps :
            <ul>
              <li>Select the vehicle for which record is to be added</li>
              <li>
                Fill odometer reading (greater than last odometer reading ...
                check last refuel details)
              </li>
              <li>Fill the amount of fuel filled (in litres)</li>
              <li>Fill the amount spent on refuelling (in rupees)</li>
              <li>
                Click on Submit button after verifying details from summary
                container
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="add-vehicle" className={Styles.anchor}></div>
      <div>
        <div className={Styles.headingCont}>
          <p className={Styles.heading}>Adding Vehicle</p>
          <Link to="/help#top">To Top ⬆️</Link>
        </div>
        <div className={Styles.content1}>
          <img src={img2} alt="img2" />
          <div>
            To add new Link record for your vehicle perform following steps :
            <ul>
              <li>Select the input field</li>
              <li>Start typing the vehicle name</li>
              <li>
                If vehicle is present in global list then select it else add own
                value by mainting the naming convention ( Vehicle name | Model |
                Engine Variant ... eg{" "}
                <span className={Styles.emphasis}>
                  Kia Sonet imt 1.5L diesel
                </span>
                )
              </li>
              <li>
                Click on Add Vehicle button after verifying details from summary
                container
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="fuel-price" className={Styles.anchor}></div>
      <div>
        <div className={Styles.headingCont}>
          <p className={Styles.heading}>Checking Fuel Price</p>
          <Link to="/help#top">To Top ⬆️</Link>
        </div>
        <div className={Styles.content2}>
          <img src={img6} alt="img6" />
          <div>
            To check fuel prices perform following steps :
            <ul>
              <li>
                Select the <span className={Styles.emphasis}>State</span> from
                input field and wait for district input field to appear
              </li>
              <li>
                Select <span className={Styles.emphasis}>District</span>
              </li>
              <li>
                The fuel prices for particular state and district are available
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="account" className={Styles.anchor}></div>
      <div>
        <div className={Styles.headingCont}>
          <p className={Styles.heading}>User Account and Editing Details</p>
          <Link to="/help#top">To Top ⬆️</Link>
        </div>
        <div className={Styles.content1}>
          <img src={img5} alt="img5" />
          <div>
            User can check user details in this page.To edit user details
            perform following steps :
            <ul>
              <li>
                Click the <span className={Styles.emphasis}>Edit Details</span>{" "}
                button
              </li>
              <li>
                edit required details such as{" "}
                <span className={Styles.emphasis}>
                  Username, Preffered State, Preffered District for fuel info
                </span>
              </li>
              <li>
                Click on <span className={Styles.emphasis}>Save Details</span>{" "}
                button to save updated details
              </li>
            </ul>
            User can also logout from account page
          </div>
        </div>
      </div>

      <div id="speed-dial" className={Styles.anchor}></div>
      <div>
        <div className={Styles.headingCont}>
          <p className={Styles.heading}>Speed Dial</p>
          <Link to="#top">To Top ⬆️</Link>
        </div>
        <div className={Styles.content2}>
          <img src={img1} alt="img1" />
          <div>
            quikly navigate to different routes with simple clicks....
            <span className={Styles.emphasis}>
              Home, Dashboard, Fuel prices, Add record, Account pages
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
