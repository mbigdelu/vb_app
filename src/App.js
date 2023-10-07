import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./custom.scss";
import "@testing-library/jest-dom";

import { Route, Routes } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import NewGame from "./NewGame/NewGame";
import PlayerPage from "./PlayerAnalyzer/PlayerPage";
import Test from "./Test";
import HomePage from "./Pages/HomePage/HomePage";
import CustomNavbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./Functions/ScrollToTop";
import { useEffect, useState } from "react";

import Player from "./PlayerAnalyzer/Player";
import Games from "./Games";

function App() {
  const [isScreenLarge, setIsScreenLarge] = useState(
    window.innerWidth > 992 ? true : false
  );

  useEffect(() => {
    setIsScreenLarge(window.innerWidth > 992 ? true : false);
  }, [isScreenLarge]);
  return (
    <div className="App">
      <CustomNavbar data={isScreenLarge} />

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login message={"Login Page"} />} />
        <Route path="/games" element={<Games />} />
        <Route path="/new-game/*" element={<NewGame />} />
        <Route exact path="/player-analyze" element={<Player />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/player-analyze/*" element={<PlayerPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
