import React from "react";

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
            <a href="#dashboard">Dashboard</a>
          </li>
          <li>
            <a href="#add-record">Adding Record</a>
          </li>
          <li>
            <a href="#add-vehicle">Adding Vehicle</a>
          </li>
          <li>
            <a href="#fuel-price">Checking fuel prices</a>
          </li>
          <li>
            <a href="#account">User account and editing user details</a>
          </li>
          <li>
            <a href="#speed-dial">Speed Dial</a>
          </li>
        </ul>
      </div>

      <div id="dashboard" className={Styles.anchor}></div>
      <div>
        <div className={Styles.headingCont}>
          <p className={Styles.heading}>Dashboard</p>
          <a href="#top">To Top ⬆️</a>
        </div>
        <div className={Styles.content1}>
          <img src={img4} alt="img4" />
          <div>
            Dashboard helps to get insight of the vehicle at a glance. You check
            the following things: Current Month information, Mileage comparison
            with same vehicle records in global record, Radar chart for all
            mileage records for your vehicle,Mileage chart for previous 50
            recordings,Last Trip information, Previous month information
          </div>
        </div>
      </div>

      <div id="add-record" className={Styles.anchor}></div>
      <div>
        <div className={Styles.headingCont}>
          <p className={Styles.heading}>Adding Record</p>
          <a href="#top">To Top ⬆️</a>
        </div>
        <div className={Styles.content2}>
          <img src={img3} alt="img3" />
          <div>
            To add new a record for your vehicle perform following steps :
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
          <a href="#top">To Top ⬆️</a>
        </div>
        <div className={Styles.content1}>
          <img src={img2} alt="img2" />
          <div>
            To add new a record for your vehicle perform following steps :
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
          <a href="#top">To Top ⬆️</a>
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
          <a href="#top">To Top ⬆️</a>
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
          <a href="#top">To Top ⬆️</a>
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
