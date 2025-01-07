import React from "react";
import "../styles/mypetprofil.css";
import porpfil from "../assets/images/pp.webp";

const MypetProfilButton = ({ onClick, petInfo }) => {
  return (
    <div onClick={onClick} className="petProfilContainer">
      <div className="myPetProfilPhoto rounded-full">
        <img className="rounded-full overflow-hidden" src={porpfil} alt="" />
      </div>
      <div className="petinnerCont">
        <div className="flexrow spacebetwen">
          <p className="big">{petInfo.name}</p>
          <p>Son Veteriner Tarihi : {petInfo.lastVetDate}</p>
        </div>
        <div className="flexrow">
          <p>Yaş : {petInfo.age}</p>
          <p>Tür : {petInfo.type}</p>
        </div>
      </div>
    </div>
  );
};

export default MypetProfilButton;
