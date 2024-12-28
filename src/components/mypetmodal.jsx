import React, { useState } from "react";
import "../styles/modal.css";
import { useNavigate } from "react-router-dom";
import Vetmodal from "./vetmodal";
const Modal = ({ isOpen, onClose, petInfo }) => {
  const navigate = useNavigate(); // `useNavigate` doğru şekilde çağırıldı
  const [isvetOpen, setIsvetOpen] = useState(false);
  const [selectedPetID, setSelectedPetID] = useState(null);

  const handlePetClick = (petInfo) => {
    console.log("Pet bilgisi:", petInfo);
    setSelectedPetID(petInfo); // Tıklanan pet bilgilerini set et
    setIsvetOpen(true); // Modal'ı aç
  };

  const closeModal = () => {
    setIsvetOpen(false); // Modal'ı kapat
    setSelectedPetID(null); // Seçilen bilgiyi temizle
  };
  if (!isOpen) return null; // Modal kapalıysa hiçbir şey render edilmez

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          X
        </button>
        <h2>{petInfo.name}</h2>
        <p>Tür: {petInfo.type}</p>
        <p>Yaş: {petInfo.age}</p>
        <p>Son Veteriner Tarihi: {petInfo.lastVetDate}</p>
        <p>Son Aşı Tarihi: {petInfo.lastVetDate}</p>
        <div onClick={handlePetClick} className="VetButton">
          Veteriner Randevu al
        </div>
      </div>
      <Vetmodal isOpen={isvetOpen} onClose={closeModal} petInfo={petInfo.ID} />
    </div>
  );
};

export default Modal;
