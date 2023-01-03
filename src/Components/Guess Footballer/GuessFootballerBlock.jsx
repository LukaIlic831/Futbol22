import React, { useState, useEffect, useRef }  from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img from "../../Assetss/player.png";
import ball from "../../Assetss/ball.png";
import axios from "axios";

const GuessFootballerBlock = () => {
  const inputValue = useRef(null);
  const inputPlayerNameValue = useRef(null);
  const [balls, setBalls] = useState([{ ball }, { ball }, { ball }]);
  const [questions, setQuestions] = useState([]);
  const [player, setPlayer] = useState([]);
  const [attempts, setAttempts] = useState(3);
  const [questionCounter, setQuestionCounter] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [checkIfItIsTaller, setCheckIfItIsTaller] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [playerImage, setPlayerImage] = useState("");
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [givedUp, setgivedUp] = useState(false);
  const year = new Date().getFullYear();

  const selectQuestion = (value) => {
    setSelectedAnswer(true);
    if (value === "Is he from") {
      setInputPlaceholder("Enter country name");
    } else if (value === "Is he ___ years old") {
      setInputPlaceholder("Enter years");
    } else if (value === "Is he taller than ___ cm") {
      setInputPlaceholder("Enter the height");
      setCheckIfItIsTaller(true);
    } else if (value === "Is he shorter than ___ cm") {
      setInputPlaceholder("Enter the height");
      setCheckIfItIsTaller(false);
    } else if (value === "Is he heavier than ___ kg") {
      setInputPlaceholder("Enter the weight");
    } else {
      setInputPlaceholder("Attacker, defender...");
    }
  };

  const askQuestion = () => {
    if (inputValue.current.value !== "" && questionCounter > 0) {
      if (inputPlaceholder === "Enter country name") {
        inputValue.current.value.toLowerCase() ==
        player.nationality.toLowerCase()
          ? setQuestions([
              ...questions,
              {
                question: `Is he from ${inputValue.current.value}?`,
                answer: true,
              },
            ])
          : setQuestions([
              ...questions,
              {
                question: `Is he from ${inputValue.current.value}?`,
                answer: false,
              },
            ]);
      } else if (inputPlaceholder === "Enter years") {
        const playerAge =
          year -
          Number(
            player.birthdate.slice(
              player.birthdate.length - 4,
              player.birthdate.length
            )
          );
        playerAge === Number(inputValue.current.value)
          ? setQuestions([
              ...questions,
              {
                question: `Is he ${inputValue.current.value} years old?`,
                answer: true,
              },
            ])
          : setQuestions([
              ...questions,
              {
                question: `Is he ${inputValue.current.value} years old?`,
                answer: false,
              },
            ]);
      } else if (inputPlaceholder === "Attacker, defender...") {
        player.position.data.name.toLowerCase() ===
        inputValue.current.value.toLowerCase()
          ? setQuestions([
              ...questions,
              {
                question: `Is his position ${inputValue.current.value}?`,
                answer: true,
              },
            ])
          : setQuestions([
              ...questions,
              {
                question: `Is his position ${inputValue.current.value}?`,
                answer: false,
              },
            ]);
      } else if (inputPlaceholder === "Enter the height") {
        let height = player.height.replace("cm", "");

        checkIfItIsTaller
          ? Number(height) > Number(inputValue.current.value)
            ? setQuestions([
                ...questions,
                {
                  question: `Is he taller than ${inputValue.current.value} cm?`,
                  answer: true,
                },
              ])
            : setQuestions([
                ...questions,
                {
                  question: `Is he taller than ${inputValue.current.value} cm?`,
                  answer: false,
                },
              ])
          : Number(height) < Number(inputValue.current.value)
          ? setQuestions([
              ...questions,
              {
                question: `Is he shorter than ${inputValue.current.value} cm?`,
                answer: true,
              },
            ])
          : setQuestions([
              ...questions,
              {
                question: `Is he shorter than ${inputValue.current.value} cm?`,
                answer: false,
              },
            ]);
      } else {
        let weight = player.weight.replace("kg", "");
        Number(inputValue.current.value) < Number(weight)
          ? setQuestions([
              ...questions,
              {
                question: `Is he heavier than ${inputValue.current.value} kg?`,
                answer: true,
              },
            ])
          : setQuestions([
              ...questions,
              {
                question: `Is he heavier than ${inputValue.current.value} kg?`,
                answer: false,
              },
            ]);
      }

      setQuestionCounter((oldCounter) => oldCounter - 1);
      inputValue.current.value = "";
    }
  };

  const getRandomPlayer = async () => {
    const randomNumber = Math.floor(Math.random() * 10000);
    await axios
      .get(
        `https://soccer.sportmonks.com/api/v2.0/players/${randomNumber}?api_token=${process.env.REACT_APP_API_TOKEN}&include=position`
      )
      .then((data) => {
        setPlayer(data.data.data);
        localStorage.player = JSON.stringify(data.data.data);
      })
      .catch(
        (error) =>
          error.message === "Request failed with status code 403" &&
          getRandomPlayer()
      );
  };

  const guessPlayer = () => {
    if (inputPlayerNameValue.current.value !== "") {
      if (
        player.display_name.toLowerCase() ===
        inputPlayerNameValue.current.value.toLowerCase()
      ) {
        setGameWon(true);
        setWrongAnswer(false);
        setPlayerImage(player.image_path);
        localStorage.playerImage = player.image_path;
        localStorage.playerGuessFinished = true;
        setQuestionCounter(0);
      } else {
        setWrongAnswer(true);
        setAttempts((oldCounter) => oldCounter - 1);
      }
      inputPlayerNameValue.current.value = "";
      if (attempts === 1) {
        setPlayerImage(player.image_path);
        localStorage.playerImage = player.image_path;
        localStorage.playerGuessFinished = true;
        setQuestionCounter(0);
      }
    }
  };

  const onPressEnter = (key) => {
    key === "Enter" && guessPlayer();
  };

  const giveUp = () => {
    setgivedUp(true);
    localStorage.playerGuessFinished = true;
    setPlayerImage(player.image_path);
    localStorage.playerImage = player.image_path;
    setQuestionCounter(0);
  };

  useEffect(() => {
    if (!localStorage.player) {
      getRandomPlayer();
    } else {
      let playerFromLocalStorage = localStorage.getItem("player");
      setPlayer(JSON.parse(playerFromLocalStorage));
    }

    localStorage.playerGuessFinished && setQuestionCounter(0)
  }, []);

  return (
    <div className="guess-footballer__block">
      <div className="guess-footballer__attempts">
        {!localStorage.playerGuessFinished &&
          balls
            .slice(0, attempts)
            .map((ball) => (
              <img
                src={ball.ball}
                alt=""
                className="guess-footballer__attempt"
              />
            ))}
      </div>
      <figure className="guess-footballer--img">
        {!localStorage.playerImage ? (
          playerImage ? (
            <img src={playerImage} alt="" />
          ) : (
            <img src={img} alt="" />
          )
        ) : (
          <img src={localStorage.playerImage} alt="" />
        )}
      </figure>
      <div className="guess-footballer__questions">
        <div className="guess-footballer__select">
          <select
            defaultValue="Select a question"
            onChange={(event) => selectQuestion(event.target.value)}
          >
            <option disabled value="Select a question">
              Select a question
            </option>
            <option value="Is he from">Is he from</option>
            <option value="Is he ___ years old">Is he ___ years old</option>
            <option value="Is his position">Is his position ___</option>
            <option value="Is he taller than ___ cm">
              Is he taller than ___ cm
            </option>
            <option value="Is he shorter than ___ cm">
              Is he shorter than ___ cm
            </option>
            <option value="Is he heavier than ___ kg">
              Is he heavier than ___ kg
            </option>
          </select>
          {selectedAnswer && (
            <input
              type="text"
              className="guess-footballer__input"
              placeholder={inputPlaceholder}
              ref={inputValue}
            />
          )}
        </div>
        <div className="guess-footballer__button">
          <span onClick={askQuestion}>Ask Question</span>
        </div>
      </div>
      <div className="guess-footballer__questions--left">
        <h2>You have {questionCounter} questions left:</h2>
      </div>
      <div className="guess-footballer__questions--wrapper">
        {questions &&
          questions.map((question) => (
            <div className="guess-footballer__question">
              <p>{question.question}</p>
              {question.answer ? (
                <span className="right-answer">Yes</span>
              ) : (
                <span className="wrong-answer">No</span>
              )}
            </div>
          ))}
      </div>
      {!localStorage.playerGuessFinished || gameWon ? (
        attempts !== 0 && !givedUp && !gameWon ? (
          <div className="guess-footballer__input--wrapper">
            <div className="search__input">
              <input
                type="text"
                ref={inputPlayerNameValue}
                onKeyUp={(event) => onPressEnter(event.key)}
              />
            </div>
            <div className="search__button">
              <span onClick={guessPlayer}>Guess</span>
            </div>
            <div className="search__flag" onClick={giveUp}>
              <FontAwesomeIcon icon="fa-solid fa-flag" className="flag" />
            </div>
          </div>
        ) : gameWon ? (
          <div className="guess-footballer__answer">
            You Won. It is {player.display_name}.
          </div>
        ) : (
          <div className="guess-footballer__answer">
            You Lost. The answer was {player.display_name}. Come back tomorrow
            to try again.
          </div>
        )
      ) : givedUp || attempts === 0 ? (
        <div className="guess-footballer__answer">
          You Lost. The answer was {player.display_name}. Come back tomorrow to
          try again.
        </div>
      ) : (
        <div className="guess-footballer__answer">
          Come back tomorrow to try again.
        </div>
      )}
    </div>
  );
};

export default GuessFootballerBlock;
