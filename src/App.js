import React, { useState, useEffect, useRef } from "react";
import NasaPhoto from "./Components/NasaPhoto";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [showDescription, setShowDescription] = useState(false);
  const descriptionRef = useRef(null);

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

  const handleScroll = (e) => {
    const descriptionElement = descriptionRef.current;
    if (descriptionElement && e.target !== descriptionElement) {
      descriptionElement.scrollTop += e.deltaY;
      e.preventDefault();
    }
  };

  return (
    <div className="App" onWheel={handleScroll}>
      {data && (
        <div className="photo-container">
          <div className={`photo-wrapper-container ${showDescription ? 'shift-left' : ''}`}>
            <div className="photo-wrapper">
              <NasaPhoto photo={data} />
            </div>
          </div>
          <div
            ref={descriptionRef}
            className={`description-wrapper ${showDescription ? "open" : ""}`}
          >
            <div className="description">
              <h2>{data.title}</h2>
              <p>{data.explanation}</p>
            </div>
          </div>
          <div className="info-button-container">
            <button className="info-button" onClick={toggleDescription}>i</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
