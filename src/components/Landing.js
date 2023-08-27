import React from "react";
import MYtineraryLogo from '../images/MYtineraryLogo.png';
import circledright2 from '../images/circledright2.png';
import homeIcon from '../images/homeIcon.png';
import { Link } from "react-router-dom";

export const Landing = () => {

    return (
        <>
            <img className="Myitinary" src={MYtineraryLogo} alt="MYtinerary Logo" />
            <p><strong>Find your perfect trip</strong>, designed by insiders who know and love their cities</p>
            <h1>START BROWSING</h1>
            <Link to="/cities">
                <img src={circledright2} alt="Circled Right" />
            </Link>
            <h5>Want to build your own MYtinerary?</h5>
            <h5><a href="#">Login</a></h5>
            <h5><a href="#">Create Account</a></h5>
            <img src={homeIcon} alt="Home Icon" />
        </>
    );
};