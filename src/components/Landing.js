import React from "react";
import circledright2 from '../images/circledright2.png';
import { Link } from "react-router-dom";


export const Landing = () => {
    return (
        <>
            <div className="container-landing">
                <div className="description">
                    <p><strong>Find your perfect trip</strong>, designed by insiders who know and love their cities</p>
                </div>
                <div className="start-browsing" >
                    <h6 ><strong>Want to build your own MYtinerary?</strong></h6>
                    <Link to="/cities">
                        <img src={circledright2} alt="Circled Right" />
                    </Link>
                </div>
            </div>
        </>
    );
};