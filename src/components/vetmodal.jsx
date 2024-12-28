import React, { useState } from "react";
import axios from "axios";
import "../styles/mypetprofil.css";

const vetmodal = ({ isOpen, onClose, petInfo }) => {
  if (!isOpen) return null; // Modal kapalıysa hiçbir şey render edilmez

  const [formData, setFormData] = useState({
    petID: petInfo.ID || "",
    ownerID: "",
    vetID: "",
    date: "",
    time: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/appointment/appointment_register",
        formData
      );
      alert("Appointment successfully registered!");
      console.log(response.data);
    } catch (error) {
      console.error("Error registering appointment:", error);
      alert("An error occurred while registering the appointment.");
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
            readOnly // Kullanıcı tarafından düzenlenemez
            className="border rounded-lg p-2"
            required
          />
          <input
            type="number"
            name="ownerID"
            placeholder="Owner ID"
            value={formData.ownerID}
            readOnly // Kullanıcı tarafından düzenlenemez
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

export default vetmodal;
