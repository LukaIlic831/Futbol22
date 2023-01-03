import React, { useState, useEffect } from "react";
import { formations } from "../../Data/formations";
import flags from "../../Data/flags";

const Futbol22Formation = ({
  countries,
  counter,
  player,
  setCounter,
  guessButtonClicked,
  setGuessButtonClicked
}) => {

  const playerCardsFront = document.querySelectorAll(
    ".player__card--box-front"
  );
  const [formation, setFormation] = useState([]);

  const addPlayerInFormation = (event) => {
    if (guessButtonClicked && player) {
      event.currentTarget.style.display = "none";
      event.target.parentNode.innerHTML += `
          <div class ="player__card--box-back futbol22-backgroundColor futbol22-color">
          ${player.display_name}
          <img className="player__card--box-flag" style="width:30px; padding:4px 0" src="${
            flags[countries[counter].extra.fifa]
          }"/>
          </div>`;

      for (let i = 0; i < playerCardsFront.length; i++) {
        playerCardsFront[i].style.backgroundColor = "transparent";
        playerCardsFront[i].style.cursor = "default";
      }

      setCounter((oldCounter) => oldCounter + 1);
      setGuessButtonClicked(false);
    }
  };

  useEffect(() => {
    const randomID = Math.floor(Math.random() * 6);
    if (!localStorage.formation) {
      setFormation(formations.filter((data) => data.id === randomID));
      localStorage.formation = JSON.stringify(
        formations.filter((data) => data.id === randomID)
      );
    } else {
      let formationFromLocalStorage = localStorage.getItem("formation");
      setFormation(JSON.parse(formationFromLocalStorage));
    }
  }, []);
  return (
    <div className="formation__wrapper futbol22-color">
      <div className="position">
        <div className="strikers">
          {formation?.map((data) =>
            data.striker.map((player) => (
              <div className="player__card--box">
                <div
                  className="player__card--box-front futbol22-color"
                  onClick={(event) => addPlayerInFormation(event)}
                >
                  {player}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="position">
        {formation[0]?.sideMidfielders && (
          <div className="side__midfielders">
            {formation?.map((data) =>
              data.sideMidfielders.map((player) => (
                <div className="player__card--box">
                  <div
                    className="player__card--box-front futbol22-color"
                    onClick={(event) => addPlayerInFormation(event)}
                  >
                    {player}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="position">
        {formation[0]?.centralMidfielders && (
          <div className="central__midfielders">
            {formation?.map((data) =>
              data.centralMidfielders.map((player) => (
                <div className="player__card--box">
                  <div
                    className="player__card--box-front futbol22-color"
                    onClick={(event) => addPlayerInFormation(event)}
                  >
                    {player}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="position">
        {formation[0]?.centralDefensiveMidfielders && (
          <div className="central__defensive--midfielders">
            {formation?.map((data) =>
              data.centralDefensiveMidfielders.map((player) => (
                <div className="player__card--box">
                  <div
                    className="player__card--box-front futbol22-color"
                    onClick={(event) => addPlayerInFormation(event)}
                  >
                    {player}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="position">
        {formation[0]?.fullbacks && (
          <div className="fullbacks">
            {formation?.map((data) =>
              data.fullbacks.map((player) => (
                <div className="player__card--box">
                  <div
                    className="player__card--box-front futbol22-color"
                    onClick={(event) => addPlayerInFormation(event)}
                  >
                    {player}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="position">
        <div className="central__defenders">
          {formation?.map((data) =>
            data.centralDefenders.map((player) => (
              <div className="player__card--box">
                <div
                  className="player__card--box-front futbol22-color"
                  onClick={(event) => addPlayerInFormation(event)}
                >
                  {player}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="position">
        <div className="goalkeeper">
          <div className="player__card--box">
            <div
              className="player__card--box-front futbol22-color"
              onClick={(event) => addPlayerInFormation(event)}
            >
              GK
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Futbol22Formation;
