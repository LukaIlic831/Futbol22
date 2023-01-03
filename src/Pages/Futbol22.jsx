import React, { useEffect, useRef, useState} from "react";
import axios from "axios";
import Futbol22Formation from "../Components/Futbol22/Futbol22Formation";
import Futbol22GameHeader from "../Components/Futbol22/Futbol22GameHeader";
import Futbol22GameRules from "../Components/Futbol22/Futbol22GameRules";
import Futbol22GameWon from "../Components/Futbol22/Futbol22GameWon";
import Futbol22GuessBlocks from "../Components/Futbol22/Futbol22GuessBlocks";

const Futboll22 = () => {
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
        `https://soccer.sportmonks.com/api/v2.0/players/search/${value}?api_token=${process.env.REACT_APP_API_TOKEN}`
      )
      .then((data) => {

        let currentPlayer = data.data.data.find(
          (item) =>
            item.nationality.toLowerCase() ===
              countries[counter].name.toLowerCase() ||
            (item.nationality.toLowerCase() ===
              countries[counter].extra.fifa?.toLowerCase() &&
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
    await axios
      .get(
        `https://soccer.sportmonks.com/api/v2.0/countries?api_token=${process.env.REACT_APP_API_TOKEN}`
      )
      .then((data) => {
        let randomCountries = [];
        let allCountries = data.data.data.filter(country => country.extra);
        for (let i = 0; i < 11; i++) {
          let random = Math.floor(Math.random() * allCountries.length);
          randomCountries.push(allCountries[random]);
        }
        localStorage.countries = JSON.stringify(randomCountries);
        setCountries(randomCountries);
      });
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
    if (!localStorage.countries) {
      fetchCountries();
    } else {
      let countriesFromLocalStorage = localStorage.getItem("countries");
      setCountries(JSON.parse(countriesFromLocalStorage));
    }

  }, []);
  return (
    <>
      <Futbol22GameHeader openGameRules={openGameRules} />
      {gameRulesOpen && (
        <div className="game__rules--wrapper">
          <Futbol22GameRules closeGameRules={closeGameRules} />
        </div>
      )}
      {(counter == 11) & !gameWonOpen && (
        <div className="game__won--wrapper">
          <Futbol22GameWon closeGameWon={closeGameWon} />
        </div>
      )}
      <Futbol22Formation
        countries={countries}
        counter={counter}
        player={player}
        setCounter={setCounter}
        setPlayer={setPlayer}
        guessButtonClicked={guessButtonClicked}
        setGuessButtonClicked={setGuessButtonClicked}
      />
      <Futbol22GuessBlocks
        countries={countries}
        counter={counter}
        findPlayer={findPlayer}
        guessButtonClicked={guessButtonClicked}
        player={player}
        setGuessButtonClicked={setGuessButtonClicked}
        playerInFormation={playerInFormation}
      />
    </>
  );
};

export default Futboll22;
