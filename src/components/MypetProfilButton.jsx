import React from "react";
import "../styles/mypetprofil.css";
import defaultImg from "../assets/images/pp.webp";
import catImg from "../assets/images/kedi.webp";
import dogImg from "../assets/images/kopekk.jpg";
import birdImg from "../assets/images/kuş.webp";
import fishImg from "../assets/images/balık.jfif";
import turtleImg from "../assets/images/kampulbağa.jpg";
import hamsterImg from "../assets/images/hamster.jpg";

const getPetImage = (type) => {
  const petImages = {
    Kedi: catImg,
    Köpek: dogImg,
    Kuş: birdImg,
    Balık: fishImg,
    Kaplumbağa: turtleImg,
    Hamster: hamsterImg,
  };

  return petImages[type] || defaultImg;
};

const MypetProfilButton = ({ onClick, petInfo }) => {
  return (
    <div onClick={onClick} className="petProfilContainer">
      <div className="myPetProfilPhoto rounded-full">
        <img
          className="rounded-full overflow-hidden w-full h-full"
          src={getPetImage(petInfo.type)}
          alt={petInfo.type}
        />
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
