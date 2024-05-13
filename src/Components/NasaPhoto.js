// NasaPhoto.js
import React from "react";

const NasaPhoto = ({ photo }) => {
    return (
        <div className="nasa-photo-wrapper">
            <img src={photo.hdurl} alt={photo.title} />
        </div>
    );
}

export default NasaPhoto;
