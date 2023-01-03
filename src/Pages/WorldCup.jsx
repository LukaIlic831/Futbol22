import React, { useState, useEffect } from "react";
import axios from "axios";
import WorldCupGameHeader from "../Components/World Cup/WorldCupGameHeader";
import WorldCupFormation from "../Components/World Cup/WorldCupFormation";
import WorldCupGuessBlocks from "../Components/World Cup/WorldCupGuessBlocks";
import WorldCupGameWon from "../Components/World Cup/WorldCupGameWon";
import WorldCupGameRules from "../Components/World Cup/WorldCupGameRules";

const WorldCup = () => {
  const [countries, setCountries] = useState([]);
  const [counter, setCounter] = useState(0);
  const [player, setPlayer] = useState([]);
  const [guessButtonClicked, setGuessButtonClicked] = useState(false);
  const [gameRulesOpen, setGameRulesOpen] = useState(true);
  const [gameWonOpen, setGameWonOpen] = useState(false);
  const [playerInFormation, setPlayerInFormation] = useState(false);

  const playerNotInFormation = (currentPlayer) => {
    let playerCardsBack = document.querySelectorAll(".player__card--box-back");
    if (playerCardsBack.length !== 0) {
      for (let i = 0; i < playerCardsBack.length; i++) {
        if (playerCardsBack[i].innerText === currentPlayer?.display_name) {
          setPlayerInFormation(true);
          return false;
        }
      }
    }
    setPlayerInFormation(false);
    return true;
  };

  const findPlayer = async (value) => {
    await axios
      .get(
        `https://soccer.sportmonks.com/api/v2.0/players/search/${value}?api_token=${process.env.REACT_APP_API_TOKEN}&include=position`
      )
      .then((data) => {
        let currentPlayer = data.data.data.find(
          (item) =>
            item.nationality.toLowerCase() ===
              countries[counter].name.toLowerCase() ||
            (item.nationality.toLowerCase() ===
              countries[counter].country.toLowerCase() &&
              item.fullname.toLowerCase().includes(value.toLowerCase()))
        );
        console.log(currentPlayer)
        setPlayer(currentPlayer);
        setPlayerInFormation(false);
        let playerCards = document.querySelectorAll(".player__card--box-front");
        if (currentPlayer && playerNotInFormation(currentPlayer)) {
          setPlayer(currentPlayer);
          for (let i = 0; i < playerCards.length; i++) {
            playerCards[i].style.backgroundColor = "white";
            playerCards[i].style.cursor = "pointer";
          }
        } else {
          for (let i = 0; i < playerCards.length; i++) {
            playerCards[i].style.backgroundColor = "transparent";
            playerCards[i].style.cursor = "default";
          }
        }
        setGuessButtonClicked(true);
      });
  };

  const fetchCountries = async () => {
    let data = await axios.get("https://worldcupjson.net/teams");
    let countries = [];
    data.data.groups.map((group) =>
      group.teams.map((country) => countries.push(country))
    );
    let randomCountries = [];
    for (let i = 0; i < 11; i++) {
      let random = Math.floor(Math.random() * countries.length);
      randomCountries.push(countries[random]);
    }
    localStorage.worldCupCountries = JSON.stringify(randomCountries);
    setCountries(randomCountries);
  };

  const closeGameRules = () => {
    setGameRulesOpen(false);
  };

  const openGameRules = () => {
    setGameRulesOpen(true);
  };

  const closeGameWon = () => {
    setGameWonOpen(true);
  };

  useEffect(() => {
    if (!localStorage.worldCupCountries) {
      fetchCountries();
    } else {
      let countriesFromLocalStorage = localStorage.getItem("worldCupCountries");
      setCountries(JSON.parse(countriesFromLocalStorage));
    }
  }, []);
  return (
    <div>
      <WorldCupGameHeader openGameRules={openGameRules} />
      {gameRulesOpen && (
        <div className="game__rules--wrapper">
          <WorldCupGameRules closeGameRules={closeGameRules} />
        </div>
      )}
      {(counter == 11) && !gameWonOpen && (
        <div className="game__won--wrapper">
          <WorldCupGameWon closeGameWon={closeGameWon} />
        </div>
      )}
      <WorldCupFormation
        countries={countries}
        counter={counter}
        player={player}
        setCounter={setCounter}
        setPlayer={setPlayer}
        guessButtonClicked={guessButtonClicked}
        setGuessButtonClicked={setGuessButtonClicked}
      />
      <WorldCupGuessBlocks
        countries={countries}
        counter={counter}
        findPlayer={findPlayer}
        guessButtonClicked={guessButtonClicked}
        player={player}
        setGuessButtonClicked={setGuessButtonClicked}
        playerInFormation={playerInFormation}
      />
    </div>
  );
};

export default WorldCup;
