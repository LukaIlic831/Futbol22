import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const WorldCupGameHeader = ({openGameRules}) => {
    const navigate = useNavigate();
  return (
    <header className="game__header">
      <div className="game__header--icons">
        <div className="game__header--icon" onClick={openGameRules}>
          <FontAwesomeIcon icon="fa-solid fa-circle-info"/>
        </div>
      </div>
      <div className="game__header--logo header__logo" onClick={() => navigate("/")}>
        <p className="game__header--logo-text header__logo--text">Futbol</p>
        <span>22</span>
      </div>
    </header>
  );
};

export default WorldCupGameHeader;
