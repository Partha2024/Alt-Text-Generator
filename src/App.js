import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
    const [value, setValue] = useState("");
    const [output, setOutput] = useState(false);
    const [url, setUrl] = useState(null);

    const handleChange = (e) => {
        setValue(e.target.value)        
    }

    useEffect(() => {
        setUrl(value)
    })

    const handleDescribe = async () => {
        const request = new XMLHttpRequest();
            request.open('POST', 'https://centralindia.api.cognitive.microsoft.com/vision/v1.0/describe?maxCandidates=1&language=en', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('Ocp-Apim-Subscription-Key', 'd8ffd08850a446b583631e408e010990');//Confidencial🔐
            request.send(JSON.stringify({ "url": value }));
            request.onload = function () {

                var resp = request.responseText;
                const data = JSON.parse(resp)
                setOutput(data.description.captions[0].text)
                console.log(data.description.captions[0].text); 

            };request.onerror = function (error) {
                console.log("error");
                console.log(error);
            };
    }

    return (
        <div className="container">

            <div id='urlDiv'>
                <input className="urlBox" type="text" value={value} onChange={handleChange} placeholder={"Enter Link Here"} /> 
                { <button className="btn" onClick={handleDescribe}>🔍</button> }
            </div>

            <div className="frame">
                { url ? <img src={value} alt="Unable to load image" className="image" /> : <h1>Enter Image Link</h1> }
            </div>

            { output && <div className="alt">{output}</div> }
            

        </div>
    );
}