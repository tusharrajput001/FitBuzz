import React from "react";
import './FrontPage.css'
import Navbar from '../Navbar/Navbar'
import JourneyBox from '../Journey/JourneyBox'

const FrontPage = () => {
    return(
        <div className="front-page">
            <div className="navbar-container">
                <Navbar/>
            </div>
            <div className="threejs">

            </div>
            <div className="journey-box">
                <JourneyBox/>
            </div>
        </div>

    )
}

export default FrontPage;