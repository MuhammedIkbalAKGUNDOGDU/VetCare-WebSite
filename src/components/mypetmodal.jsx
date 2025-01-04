import React, { useState } from "react";
import axios from "axios"; // Axios eklendi
import "../styles/modal.css";
import { useNavigate } from "react-router-dom";
import Vetmodal from "./vetmodal";

const Modal = ({ isOpen, onClose, petInfo }) => {
  const navigate = useNavigate();
  const [isvetOpen, setIsvetOpen] = useState(false);
  const [selectedPetID, setSelectedPetID] = useState(null);

  // Pet silme fonksiyonu
  const handleDeletePet = async () => {
    const confirmDelete = window.confirm(
      `${petInfo.name} isimli hayvanı silmek istediğinizden emin misiniz?`
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:8081/pet/pet_delete/${petInfo.petID}`
        );
        console.log("Hayvan silindi:", response.data);
        alert("Hayvan başarıyla silindi.");
        onClose(); // Modalı kapat
        navigate("/"); // Silme işleminden sonra anasayfaya yönlendir
      } catch (error) {
        console.error("Hayvan silinirken hata oluştu:", error);
        alert("Hayvan silinemedi. Lütfen tekrar deneyin.");
      }
    }
  };

  const handlePetClick = (petInfo) => {
    console.log("Pet bilgisi:", petInfo);
    setSelectedPetID(petInfo);
    setIsvetOpen(true);
  };

  const closeModal = () => {
    setIsvetOpen(false);
    setSelectedPetID(null);
  };

  if (!isOpen) return null;

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
        <p>Son Aşı Tarihi: {petInfo.lastVaccinationDate}</p>

        <div onClick={handlePetClick} className="VetButton">
          Veteriner Randevu al
        </div>

        <div className="bg-blue-600 flex justify-center items-center mt-4 rounded-lg py-3 cursor-pointer">
          <p className="text-white font-bold text-xl">
            Hayvan Sağlığını Görüntüle{" "}
          </p>
        </div>

        <div
          onClick={handleDeletePet} // Silme fonksiyonunu tetikleyen buton
          className="bg-red-600 flex justify-center items-center mt-4 rounded-lg py-3 cursor-pointer"
        >
          <p className="text-white font-bold text-xl">Hayvanı Sil</p>
        </div>
      </div>

      <Vetmodal isOpen={isvetOpen} onClose={closeModal} petInfo={petInfo} />
    </div>
  );
};

export default Modal;
