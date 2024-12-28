import React from "react";
import "../styles/mypetprofil.css";

const MypetProfilButton = ({ onClick, petInfo }) => {
  return (
    <div onClick={onClick} className="petProfilContainer">
      <div className="myPetProfilPhoto">
        <img src="" alt="" />
      </div>
      <div className="petinnerCont">
        <div className="flexrow spacebetwen">
          <p className="big">{petInfo.name}</p>
          <p>Son Veteriner Tarihi : {petInfo.lastVetDate}</p>
        </div>
        <div className="flexrow">
          <p>{petInfo.age}</p>
          <p>{petInfo.type}</p>
        </div>
      </div>
    </div>
  );
};

export default MypetProfilButton;
