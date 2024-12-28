import React from "react";
import "../styles/mypetprofil.css";

const vetmodal = ({ isOpen, onClose, petInfo }) => {
  if (!isOpen) return null; // Modal kapalıysa hiçbir şey render edilmez

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          X
        </button>
        <h2>{petInfo}</h2>

        <div className="VetButton">Randevu Onayla</div>
      </div>
    </div>
  );
};

export default vetmodal;
