import React, { useState, useEffect } from "react";
import "../styles/landingPage.css";
import axios from "axios";

const LandingPageVet = () => {
  const [appointments, setAppointments] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const vetID = userData; // Örneğin Vet ID 1
  const [ownerData, setOwnerData] = useState(null);

  const fetchOwnerData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/vet/findVetById/${userData}` // ownerID kullanımı
      );
      setOwnerData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Veri çekilirken hata oluştu:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchOwnerData();
    }
  }, [userData]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/vet/listAppointments/${userData}`)
      .then((response) => {
        setAppointments(response.data.data); // API'den dönen veriyi state'e kaydet
        console.log("randevular", response.data.data);
      })
      .catch((error) => {
        console.error("Randevular çekilirken hata oluştu:", error);
      });
  }, []);

  return (
    <div className="landingPageContainer">
      <div className="landingPageProfileContainer">
        {ownerData ? (
          <>
            <p className="telno">Dükkan Adı : {ownerData.shopName}</p>
            <p className="telno">Yıldız Puanı : {ownerData.starRate}</p>
            <p className="telno">Veteriner ID : {ownerData.vetID}</p>
            <p className="font-bold text-xs">E-mail : {ownerData.email}</p>
          </>
        ) : (
          <p>Veri yükleniyor...</p>
        )}
      </div>

      <div className="landingPageOtherContainer">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.appointmentID}
              className="appointmentCard rounded-2xl w-8/12 flex-wrap  mt-10 border-2 shadow-xl border-lime-600 flex-row p-1"
            >
              <div className="flex">
                {" "}
                <p className="mx-5">
                  <strong>Randevu ID:</strong> {appointment.appointmentID}
                </p>
                <p className="mx-5">
                  <strong>Tarih:</strong> {appointment.date}
                </p>
                <p className="mx-5">
                  <strong>Saat:</strong> {appointment.time}
                </p>
                <p className="mx-5">
                  <strong>Sahip Adı:</strong> {appointment.ownerName}
                </p>
                <p className="mx-5">
                  <strong>Pet Adı:</strong> {appointment.petName}
                </p>
              </div>
              <div className="mt-5">
                <p className="mx-5">
                  <strong>Açıklama:</strong> {appointment.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Randevu bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default LandingPageVet;
