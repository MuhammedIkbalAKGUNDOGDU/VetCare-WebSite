import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/mypetprofil.css";

const VetModal = ({ isOpen, onClose, petInfo }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    petID: petInfo.petID || "",
    ownerID: petInfo.ownerID || "",
    vetID: "",
    date: "",
    time: "",
    description: "",
  });
  const [vets, setVets] = useState([]); // Veteriner listesi için state

  useEffect(() => {
    if (isOpen) {
      const fetchVets = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8081/vet/getIntersectingVetsByStarRate"
          );
          console.log("Veteriner Listesi:", response.data.data);
          setVets(response.data.data); // Gelen veriyi state'e ata
        } catch (error) {
          console.error("Veteriner verileri getirilirken hata oluştu:", error);
        }
      };
      fetchVets();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Dropdown'dan veteriner seçildiğinde vetID güncellenir
  const handleVetSelect = (e) => {
    const selectedVetID = e.target.value;
    setFormData({ ...formData, vetID: selectedVetID });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appointmentResponse = await axios.post(
        "http://localhost:8081/appointment/appointment_register",
        formData
      );

      if (appointmentResponse.data.isSuccess) {
        alert("Appointment successfully registered!");
        console.log(appointmentResponse.data);

        const vetUpdateResponse = await axios.put(
          "http://localhost:8081/pet/update_vetdate",
          {
            petId: formData.petID,
            date: formData.date,
          }
        );

        if (vetUpdateResponse.data.isSuccess) {
          alert("Pet vet date updated successfully!");
          console.log(vetUpdateResponse.data);
        } else {
          alert("Failed to update pet vet date.");
        }
      }
    } catch (error) {
      console.error("Error registering appointment or updating pet:", error);
      alert("An error occurred while processing the appointment.");
    } finally {
      onClose();
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div>
          <button className="closeButton" onClick={onClose}>
            X
          </button>
          <h1 className="text-xl font-bold mb-4">Register Appointment</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="number"
              name="petID"
              placeholder="Pet ID"
              value={formData.petID}
              readOnly
              className="border rounded-lg p-2"
              required
            />
            <input
              type="number"
              name="ownerID"
              placeholder="Owner ID"
              value={formData.ownerID}
              readOnly
              className="border rounded-lg p-2"
              required
            />

            {/* VetID giriş alanı */}
            <input
              type="number"
              name="vetID"
              placeholder="Vet ID (Manuel Giriş)"
              value={formData.vetID}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />

            {/* Veteriner Seçim Dropdown */}
            <select
              name="vetID"
              value={formData.vetID}
              onChange={handleVetSelect}
              className="border rounded-lg p-2"
              required
            >
              <option value="">Veteriner Seç</option>
              {vets.map((vet) => (
                <option key={vet.vetID} value={vet.vetID}>
                  {vet.name} - ⭐ {vet.starRate}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border rounded-lg p-2"
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border rounded-lg p-2"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded-lg p-2"
              rows="4"
              required
            />
            <button type="submit" className="VetButton">
              Randevu Onayla
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VetModal;
