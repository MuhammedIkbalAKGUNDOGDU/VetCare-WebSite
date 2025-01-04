import React, { useState } from "react";
import axios from "axios";
import "../styles/mypetprofil.css";

const VetModal = ({ isOpen, onClose, petInfo }) => {
  if (!isOpen) return null; // Modal kapalıysa render edilmez

  const [formData, setFormData] = useState({
    petID: petInfo.petID || "",
    ownerID: petInfo.ownerID || "", // Pet sahibinin ID'si
    vetID: "",
    date: "",
    time: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Randevu oluşturma ve pet güncelleme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Randevu kaydetme isteği
      const appointmentResponse = await axios.post(
        "http://localhost:8081/appointment/appointment_register",
        formData
      );

      if (appointmentResponse.data.isSuccess) {
        alert("Appointment successfully registered!");
        console.log(appointmentResponse.data);
        // Randevu başarılıysa, pet'in veteriner tarihini güncelle
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
          try {
            const notification = await axios.get( //bunun datasını yazdırmak lazım aşşağıya
              "http://localhost:8081/api/notifications"
            );
            console.log("selamlar", notification.data);
          } catch (error) {
            console.error("Error registering notification", error);
          }
        } else {
          alert("Failed to update pet vet date.");
        }
      }
    } catch (error) {
      console.error("Error registering appointment or updating pet:", error);
      alert("An error occurred while processing the appointment.");
    } finally {
      onClose(); // Modalı kapat
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
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
            readOnly // Kullanıcı tarafından değiştirilemez
            className="border rounded-lg p-2"
            required
          />
          <input
            type="number"
            name="ownerID"
            placeholder="Owner ID"
            value={formData.ownerID}
            readOnly // Kullanıcı tarafından değiştirilemez
            className="border rounded-lg p-2"
            required
          />
          <input
            type="number"
            name="vetID"
            placeholder="Vet ID"
            value={formData.vetID}
            onChange={handleChange}
            className="border rounded-lg p-2"
            required
          />
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
  );
};

export default VetModal;
