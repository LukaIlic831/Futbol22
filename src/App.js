import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Futbol22 from "./Pages/Futbol22";
import GuessTheFootballer from "./Pages/GuessTheFootballer";
import Home from "./Pages/Home";
import WorldCup from "./Pages/WorldCup";

function App() {
  const date = new Date().toLocaleDateString();
  const hasOneDayPassed = () => {
    if (localStorage.date !== date) {
      localStorage.clear();
         localStorage.date = date;
    }
  };

  useEffect(() => {
    hasOneDayPassed();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/worldcup" element={<WorldCup />}></Route>
        <Route path="/futbol22" element={<Futbol22 />}></Route>
        <Route path="/guessfootballer" element={<GuessTheFootballer />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
