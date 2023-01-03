import React, { useState } from "react";
import GuessFootballerBlock from "../Components/Guess Footballer/GuessFootballerBlock";
import GuessFootballerHeader from "../Components/Guess Footballer/GuessFootballerHeader";
import GuessFootballerRules from "../Components/Guess Footballer/GuessFootballerRules";

const GuessTheFootballer = () => {
  const [gameRulesOpen, setGameRulesOpen] = useState(true);

  const closeGameRules = () => {
    setGameRulesOpen(false);
  };

  const openGameRules = () => {
    setGameRulesOpen(true);
  };

  return (
    <>
      {gameRulesOpen && (
        <div className="game__rules--wrapper">
          <GuessFootballerRules closeGameRules={closeGameRules} />
        </div>
      )}
      <GuessFootballerHeader openGameRules={openGameRules} />
      <div className="guess-footballer__wrapper">
        <GuessFootballerBlock />
      </div>
    </>
  );
};

export default GuessTheFootballer;
