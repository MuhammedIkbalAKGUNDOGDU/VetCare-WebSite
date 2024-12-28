import React, { useState } from "react";
import "../styles/landingPage.css";
import MypetProfilButton from "../components/MypetProfilButton.jsx";
import Modal from "../components/mypetmodal.jsx";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetInfo, setSelectedPetInfo] = useState(null);
  const navigate = useNavigate();
  const handlePetClick = (petInfo) => {
    console.log("Pet bilgisi:", petInfo);
    setSelectedPetInfo(petInfo); // Tıklanan pet bilgilerini set et
    setIsModalOpen(true); // Modal'ı aç
  };

  const closeModal = () => {
    setIsModalOpen(false); // Modal'ı kapat
    setSelectedPetInfo(null); // Seçilen bilgiyi temizle
  };

  const pets = [
    {
      ID: 1,
      name: "Karabaş",
      type: "Shiba",
      age: "17 Yaşında",
      lastVetDate: "11.12.2023",
    },
    {
      ID: 2,
      name: "Pamuk",
      type: "Golden Retriever",
      age: "5 Yaşında",
      lastVetDate: "01.01.2024",
    },
    {
      ID: 3,
      name: "Ömer",
      type: "İnsan",
      age: "21 Yaşında",
      lastVetDate: "01.01.2024",
    },

    // Diğer pet bilgilerini buraya ekleyin
  ];

  return (
    <div className="landingPageContainer">
      <div className="landingPageProfileContainer">
        <p className="name">Muhammed İkbal</p>
        <p className="surname">AKGÜNDOĞDU</p>
        <p className="telno">05358249994</p>

        <div onClick={() => navigate("/shop")} className="shopping">
          Alışveriş Yap
        </div>
      </div>
      <div className="landingPageOtherContainer">
        {pets.map((pet, index) => (
          <MypetProfilButton
            onClick={() => handlePetClick(pet)}
            petInfo={pet}
            key={index}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        petInfo={selectedPetInfo}
      />
    </div>
  );
};

export default LandingPage;
