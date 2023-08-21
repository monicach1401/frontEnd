import React from "react";
import MYtineraryLogo from '../images/MYtineraryLogo.png';
import circledright2 from '../images/circledright2.png';
import homeIcon from '../images/homeIcon.png';

export const Landing = () => {
    return (
        <>
            <div className="d-flex flex-column bd-highlight mb-3">
                <div className="Myitinary"><img className="Myitinary" src={MYtineraryLogo} alt="MYtinerary Logo" /></div>
                <div className="description">
                    <h5><strong>Find your perfect trip</strong>, designed by insiders who know and love their cities</h5>
                    <div className="start-browsing">
                        <h1>START BROWSING</h1>
                       <img src={circledright2} alt="Circled Right" />
                    </div>
                </div>
                <div className="options">
                    <h5>Want to build your own MYtinerary?</h5>
                    <h5><a href="#">Login</a></h5>
                    <h5><a href="#">Create Account</a></h5>
                </div>
            </div>
            <div className="home-icon"><img src={homeIcon} alt="Home Icon" /></div>
        </>
    );
};