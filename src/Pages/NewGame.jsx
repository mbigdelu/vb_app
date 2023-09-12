import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { NavLink, Route, Routes } from "react-router-dom";
import NewGameSetUp from "../NewGame/NewGameSetUp";
import NewGameRun from "../NewGame/NewGameRun";
import teamsToObject from "../Functions/TeamsToObject";

function NewGame(props) {
  const [state, setState] = useState({
    numberOfPoints: 0,
    numberOfSets: 0,
    firstTeamInfo: {
      teamName: "",
      playerOneName: "",
      playerTwoName: "",
      playerThreeName: "",
      playerFourName: "",
      playerFiveName: "",
      playerSixName: "",
    },
    secondTeamInfo: {
      teamName: "",
      playerOneName: "",
      playerTwoName: "",
      playerThreeName: "",
      playerFourName: "",
      playerFiveName: "",
      playerSixName: "",
    },
  });

  function handleStateChange(newState) {
    setState(newState);
  }
  return (
    <div>
      <Routes>
        <Route
          path="/setup"
          element={
            <NewGameSetUp data={state} changeState={handleStateChange} />
          }
        />
        <Route
          path="/run"
          element={
            <NewGameRun
              gameData={dataConvertorForRunGame(state)}
              changeState={handleStateChange}
            />
          }
        />
      </Routes>
    </div>
  );
}

function dataConvertorForRunGame(data) {
  let formData = {};
  let teamOne = teamsToObject(data.firstTeamInfo);
  let teamTwo = teamsToObject(data.secondTeamInfo);

  formData.teamOne = teamOne;
  formData.teamTwo = teamTwo;
  formData.numberOfPoints = parseInt(data.numberOfPoints);
  formData.numberOfSets = parseInt(data.numberOfSets);

  const fakeFromData = {
    numberOfPoints: 5,
    numberOfSets: 2,
    teamOne: {
      name: "Team One",
      Players: [
        { name: "T1player1", number: 1 },
        { name: "T1player2", number: 2 },
        { name: "T1player3", number: 3 },
        { name: "T1player4", number: 4 },
        { name: "T1player5", number: 5 },
        { name: "T1player6", number: 6 },
      ],
    },
    teamTwo: {
      name: "Team Two",
      Players: [
        { name: "T2player1", number: 1 },
        { name: "T2player2", number: 2 },
        { name: "T2player3", number: 3 },
        { name: "T2player4", number: 4 },
        { name: "T2player5", number: 5 },
        { name: "T2player6", number: 6 },
      ],
    },
  };

  return fakeFromData;
}

export default NewGame;
