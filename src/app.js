import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

const App = () => {

    const writeJSON = (newData) => {
        console.log(newData);
        axios
          .post('http://localhost:3001/updateJson', newData)
          .then(() => {
            console.log('JSON file updated successfully');
          })
          .catch((error) => {
            console.error('Error updating JSON file:', error);
          });
    };

    window.writeJSON = writeJSON;

    return (
        <div id="main">	
            <div id="title">
                <h2 id="name">Innovation Studio Arcade Webapp Prototype</h2>
                <h3 id="creator">This will be a byline</h3>
            </div>
            <div id="navigation">
                <ul id="game-list"></ul>
            </div>
            <div id="iframe-container">
                <iframe id="my-iframe" scrolling="no" allowtransparency="true" webkitallowfullscreen="true" mozallowfullscreen="true" allow="autoplay; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated" src="" msallowfullscreen="true" frameBorder="0" allowFullScreen={true}></iframe>
            </div>
            <div id="iframe-cover">
                <h1 id="cover-text" className="section">Select Game from Right</h1>
            </div>
        </div>
    );
};

export default App;
