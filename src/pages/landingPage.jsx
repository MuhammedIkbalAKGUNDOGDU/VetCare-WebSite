import React, { useState, useEffect } from "react";
import "../styles/landingPage.css";
import MypetProfilButton from "../components/MypetProfilButton.jsx";
import Modal from "../components/mypetmodal.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LandingPage = () => {
  const [ownerData, setOwnerData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Yeni modal için state
  const [selectedPetInfo, setSelectedPetInfo] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    age: "",
    healthStatus: "Healthy",
    lastVaccinationDate: "",
    vaccinationFreq: "",
    lastVetDate: "",
    vetFreq: "",
    ownerID: { userData }, // Sabit bir ownerID giriyoruz. Giriş yapan kullanıcının ID'si alınabilir.
  });

  useEffect(() => {
    if (userData) {
      setNewPet((prevPet) => ({
        ...prevPet,
        ownerID: userData, // Burada userData doğrudan ownerID'ye atanıyor
      }));
    }
  }, [userData]);

  const navigate = useNavigate();

  const fetchOwnerData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/owner/findOwnerById/${userData}` // ownerID kullanımı
      );
      setOwnerData(response.data.data);
      console.log(response.data.data);
      console.log("ownerID", userData);
    } catch (error) {
      console.error("Veri çekilirken hata oluştu:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchOwnerData();
    }
  }, [userData]);

  // Pet tıklama işlemi
  const handlePetClick = (petInfo) => {
    console.log("Pet bilgisi:", petInfo);
    setSelectedPetInfo(petInfo);
    setIsModalOpen(true);
  };

  // Modal kapatma işlemi
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPetInfo(null);
    window.location.reload(); // Sayfayı tamamen yeniler
  };

  // Petleri çekme işlemi
  useEffect(() => {
    const fetchPetsByOwnerID = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/pet/petsByOwnerID/${userData}`
        );
        console.log("Gelen Pet Bilgileri:", response.data);
        setPets(response.data.data);
      } catch (error) {
        console.error("Hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetsByOwnerID();
  }, []);

  // Formdaki değişiklikleri izleme
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewPet((prevPet) => ({
      ...prevPet,
      [id]: value,
    }));
  };

  // Pet ekleme isteği
  const handleAddPet = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/pet/pet_register",
        newPet
      );
      console.log("Pet başarıyla eklendi:", response.data);
      setIsAddModalOpen(false); // Modalı kapat
      window.location.reload(); // Sayfayı tamamen yeniler
    } catch (error) {
      console.error("Pet eklenirken hata oluştu:", error);
    }
  };

  return (
    <div className="landingPageContainer">
      <div className="landingPageProfileContainer">
        {ownerData ? (
          <>
            <p className="name">{ownerData.name}</p>
            <p className="surname">{ownerData.surname}</p>
            <p className="telno">{ownerData.phoneNumber}</p>
          </>
        ) : (
          <p>Veri yükleniyor...</p>
        )}

        <div
          onClick={() => navigate("/shop")}
          className="bg-orange-500 rounded-xl p-2 font-bold text-white  mt-6 cursor-pointer"
        >
          Alışveriş Yap
        </div>
        <div
          onClick={() => setIsAddModalOpen(true)} // Pet ekleme modalını aç
          className="bg-orange-500 rounded-xl p-2 px-6 font-bold text-white mt-4 cursor-pointer"
        >
          Pet Ekle
        </div>
      </div>

      <div className=" overflow-y-auto max-h-screen	 flex flex-wrap gap-4 justify-start mx-6">
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

      {/* Pet Ekleme Modalı */}
      {isAddModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent p-8 flex-column justify-center align-center">
            <h2 className="text-center font-bold text-xl p-2">Yeni Pet Ekle</h2>
            <div className="flex justify-center">
              <input
                id="name"
                className="p-2 border-2 rounded border-black"
                type="text"
                placeholder="Pet Adı"
                value={newPet.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-center">
              <select
                className="p-2 w-48 border-2 rounded border-black mt-2"
                id="type"
                value={newPet.type}
                onChange={handleInputChange}
              >
                <option value="">Tür Seçin</option>
                <option value="Kedi">Kedi</option>
                <option value="Köpek">Köpek</option>
                <option value="Kuş">Kuş</option>
                <option value="Balık">Balık</option>
                <option value="Kaplumbağa">Kaplumbağa</option>
                <option value="Hamster">Hamster</option>
              </select>
            </div>

            <div className="flex justify-center">
              <input
                className="p-2 border-2 rounded border-black mt-2 "
                id="age"
                type="number"
                placeholder="Yaş"
                value={newPet.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-center">
              <p className="font-bold text-m mt-2 text-center ">
                Son Aşır Tarihi
              </p>
              <input
                id="lastVaccinationDate"
                type="date"
                placeholder="Son Aşı Tarihi"
                value={newPet.lastVaccinationDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-center">
              <p></p>
              <input
                className="p-2 border-2 rounded border-black mt-2"
                id="vaccinationFreq"
                type="number"
                placeholder="Aşı Sıklığı (ay)"
                value={newPet.vaccinationFreq}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-center align-center">
              <p className="font-bold text-m mt-2 text-center">
                Son Veteriner Tarihi
              </p>
              <input
                id="lastVetDate"
                type="date"
                placeholder="Son Veteriner Tarihi"
                value={newPet.lastVetDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-center">
              <p></p>
              <input
                className="p-2 border-2 rounded border-black mt-2"
                id="vetFreq"
                type="number"
                placeholder="Veteriner Sıklığı (ay)"
                value={newPet.vetFreq}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-center">
              {" "}
              <button
                className="ml-2 p-2 mt-2 rounded-lg bg-green-500"
                onClick={handleAddPet}
              >
                Kaydet
              </button>
              <button
                className="ml-2 p-2 mt-2 px-4 rounded-lg bg-red-500"
                onClick={() => setIsAddModalOpen(false)}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
