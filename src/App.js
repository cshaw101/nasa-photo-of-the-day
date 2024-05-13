// App.js
import React, { useState, useEffect } from "react";
import NasaPhoto from "./Components/NasaPhoto";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="App">
      {data && (
        <div className="photo-container">
          <div className={`photo-wrapper-container ${showDescription ? 'shift-left' : ''}`}>
            <div className="photo-wrapper">
              <NasaPhoto photo={data} />
            </div>
            <button onClick={toggleDescription} className="toggle-button">
              {showDescription ? "Hide Details" : "Show Details"}
            </button>
          </div>
          <div
            className={`description-wrapper ${
              showDescription ? "open" : ""
            }`}
          >
            <div className="description">
              <h2>{data.title}</h2>
              <p>{data.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;
