import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import flags from "../../Data/flags.js";

const WorldCupGuessBlocks = ({
  countries,
  counter,
  findPlayer,
  guessButtonClicked,
  player,
  playerInFormation,
}) => {
  const input = useRef(null);
  const [givedUp, setgivedUp] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const guessPlayer = async () => {
    if (input.current.value !== "") {
      await findPlayer(input.current.value);
      setInputValue(input.current.value);
      input.current.value = "";
    }
  };

  const onPressEnter = (key) => {
    key === "Enter" && guessPlayer();
  };

  const giveUp = () => {
    setgivedUp(true);
    localStorage.worldCupGameFinished = true;
    localStorage.removeItem("countries");
  };

  return (
    <>
      {givedUp ? (
        <p className="finished__text">You lost. Come back tomorrow to try again.</p>
      ) : counter == 11 || localStorage.worldCupGameFinished ? (
        <p className="finished__text">
          Come back tomorrow to try again.
        </p>
      ) : (
        <div className="blocks__wrapper">
          {countries?.slice(counter, counter + 1).map((item) => (
            <div className="country">
              <img src={flags[item.country]} alt="" />
              <p>{item.name}</p>
            </div>
          ))}
          <div className="search__input--wrapper">
            <div className="search__input">
              <input
                type="text"
                ref={input}
                onKeyUp={(event) => onPressEnter(event.key)}
              />
            </div>
            <div className="search__button" onClick={guessPlayer}>
              <span>Guess</span>
            </div>
            <div className="search__flag" onClick={giveUp}>
              <FontAwesomeIcon icon="fa-solid fa-flag" className="flag" />
            </div>
          </div>
          <div className="search__input--text">
            {guessButtonClicked &&
              !playerInFormation &&
              (player?.display_name ? (
                <p className="search__input--text-para">Did you mean {player.display_name}. His position is {player.position.data.name}</p>
              ) : (
                <p className="search__input--text-para">Can't find {inputValue}</p>
              ))}
            {playerInFormation && (
              <p className="search__input--text-para">{player?.display_name} is already in formation</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WorldCupGuessBlocks;
