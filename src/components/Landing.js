import React from "react";
import { Link } from "react-router-dom";
import travel from "../assets/images/travel.jpg";
import MYtineraryLogo from "../assets/images/MYtineraryLogo.png";
import circledright2 from "../assets/images/circledright2.png";

export const Landing = () => {
  return (
    <>
      <div className="container">
        <div className="container_logo">
          <img src={MYtineraryLogo} alt="myItinerary" />
        </div>
        <div className="container_photo">
          <img className="travel" src={travel} alt="travel" />
          <p>
            <strong>Find your perfect trip</strong>, designed by insiders who
            know and love their cities.
            <br />   <br />
            <strong>Want to build your own MYtinerary? </strong>
            <br />
            <h5><strong>Click Here</strong></h5>
            <Link to="/cities">
            <img className="circle" src={circledright2} alt="Circled Right" />
          </Link>
          </p>
         
        </div>
      </div>
    </>
  );
};
