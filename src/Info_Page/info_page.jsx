import React, { useState } from 'react';
import './info_page.css'

import home_icon from "./home_icon.png";

const InformationPage = ({data, setPlayActive, setCarouselActive}) => {
        const [isStarted, setIsStarted] = useState(false);
        const handleClick = () => {
          setIsStarted(true);
          // Perform any additional actions when the button is clicked
        };
    return(
        <div className ="InformationPage">
            <div className="text">
                <div className="title">
                    <h1>{data.title}</h1>
                    <div className ="paragraph">
                        <p>{data.description}</p>
                    </div>
                </div>

                <div className="mechanics">
                    <div className ="subheading">
                        <h3>Mechanics</h3>
                    </div>
                    <div className ="paragraph">
                        <p>{data.mechanics}</p>
                    </div>
                </div>

                <div className="aesthetics">
                    <div className ="subheading">
                        <h3>Genre and Aesthetics</h3>
                    </div>
                    <div className ="paragraph">
                        <p>{data.aesthetics}</p>
                    </div>
                </div>

                <div className="background">
                    <div className ="subheading">
                        <h3>Background</h3>
                    </div>
                    <div className ="paragraph">
                        <p>{data.background}</p>
                    </div>
                </div>
            </div>

            <div className="image-div">
                <img className="image1" src={data.main_image} alt="main image" />
                <div className ="start-button">
                    <button onClick={setPlayActive}>
                        play
                    </button>
                </div>
                <div className ="home-button-info">
                    <button onClick={setCarouselActive}>
                        <img src={home_icon} alt="home icon" />
                    </button>
                </div>
            </div>
            <div className ="next-button">
                <button onClick={handleClick}>
                    Next: Author Information
                </button>
            </div>
        </div>
    );
}
export default InformationPage;
