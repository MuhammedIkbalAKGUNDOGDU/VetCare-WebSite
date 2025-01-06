import React, { useState } from "react";
import axios from "axios"; // Axios eklendi
import "../styles/modal.css";
import { useNavigate } from "react-router-dom";
import Vetmodal from "./vetmodal";

const Modal = ({ isOpen, onClose, petInfo }) => {
  const navigate = useNavigate();
  const [isvetOpen, setIsvetOpen] = useState(false);
  const [selectedPetID, setSelectedPetID] = useState(null);
  const [petHealthDetails, setPetHealthDetails] = useState(null); // Sağlık bilgisi için state
  const [loading, setLoading] = useState(false); // Yükleme durumu
  const [error, setError] = useState(""); // Hata durumu

  // Pet silme fonksiyonu
  const handleDeletePet = async () => {
    console.log(petInfo.petID);
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

  // Sağlık bilgilerini çekme fonksiyonu
  const fetchPetHealthDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:8081/pet/petHealtDetails/${petInfo.petID}`
      );
      console.log(petHealthDetails);
      if (response.data.isSuccess) {
        setPetHealthDetails(response.data.data);
        console.log("Pet Sağlık Bilgileri:", response.data.data);
      } else {
        setError("Sağlık bilgileri bulunamadı.");
      }
    } catch (error) {
      console.error("Sağlık bilgileri getirilirken hata oluştu:", error);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
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

        <div
          onClick={fetchPetHealthDetails} // Sağlık bilgilerini çeken buton
          className="bg-blue-600 flex justify-center items-center mt-4 rounded-lg py-3 cursor-pointer"
        >
          <p className="text-white font-bold text-xl">
            Hayvan Sağlığını Görüntüle
          </p>
        </div>

        {loading && <p>Yükleniyor...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {petHealthDetails && (
          <div className="mt-4">
            <h3 className="font-bold">Sağlık Bilgileri</h3>
            <p>
              <strong>Sağlık Durumu:</strong> {petHealthDetails.healthStatus}
            </p>
            <p>
              <strong>Son Aşı Tarihi:</strong>{" "}
              {petHealthDetails.lastVaccinationDate}
            </p>
            <p>
              <strong>Veteriner Notları:</strong> {petHealthDetails.vetNotes}
            </p>
          </div>
        )}

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
