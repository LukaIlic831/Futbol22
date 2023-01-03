import React, { useEffect } from "react";
import image1 from "../../Assetss/image1.png";
import image3 from "../../Assetss/image3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Futbol22GameWon = ({closeGameWon}) => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.futbol22GameFinished = true;
    localStorage.removeItem("countries");
  }, []);
  return (
    <div className="game__won--block">
      <div className="game__won--block-content">
        <div className="game__won--block-close">
          <FontAwesomeIcon
            icon="fa-solid fa-xmark"
            className="x-mark"
            onClick={closeGameWon}
          />
        </div>
        <div className="game__won--block-title">
          <h2>You Won!</h2>
        </div>
        <div className="game__won--block-sub-title">
          <p>
            try our other <span>games</span>
          </p>
        </div>
        <div className="game__won--block-games games__wrapper">
          <div className="game" onClick={() => navigate("/worldcup")}>
            <img src={image1} alt="" className="game__image" />
            <div className="game__overlay"></div>
            <p className="game__text">Futbol22 World Cup</p>
          </div>
          <div className="game" onClick={() => navigate("/guessfootballer")}>
            <img src={image3} alt="" className="game__image" />
            <div className="game__overlay"></div>
            <p className="game__text">GuessTheFootballer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Futbol22GameWon;
