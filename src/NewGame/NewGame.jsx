import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import NewGameSetUp from "./NewGameSetUp";
import NewGameRun from "./NewGameRun";
import teamsToObject from "../Functions/TeamsToObject";
import ScrollToTop from "../Functions/ScrollToTop";
import { getPlayersList } from "../PlayerAnalyzer/FakeDataService/FakePlayerDataFetch.js";
import NewGameDone from "./NewGameDone";

function NewGame(props) {
  const [state, setState] = useState({
    numberOfPoints: 0,
    numberOfSets: 0,
    firstTeamInfo: {},
    secondTeamInfo: {},
  });

  const [gameObj, setGameObj] = useState({});

  const navigate = useNavigate();

  function handleStateChange(newState) {
    setState(newState);
  }

  function handleIsGameDone(gameObj) {
    setGameObj(gameObj);
    navigate("/new-game/done");
  }
  return (
    <div id="NewGamePage" className="container-xl  pt-5">
      <div className="container-xl pt-5">
        <ScrollToTop />
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
                gameIsDone={handleIsGameDone}
              />
            }
          />
          <Route path="/done" element={<NewGameDone gameObj={fakeGameObj} />} />
        </Routes>
      </div>
      <div className="container  py-5">
        <p></p>
      </div>{" "}
      <div className="container  py-5">
        <p></p>
      </div>
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

  const playersList = getPlayersList();
  const fakeFromData = {
    numberOfPoints: 10,
    numberOfSets: 2,
    team1: {
      name: "Team One",
      Players: [
        playersList[0],
        playersList[1],
        playersList[2],
        playersList[3],
        playersList[4],
        playersList[5],
      ],
    },
    team2: {
      name: "Team Two",
      Players: [
        playersList[6],
        playersList[7],
        playersList[8],
        playersList[9],
        playersList[10],
        playersList[11],
      ],
    },
  };

  return fakeFromData;
}

export default NewGame;

const fakeGameObj = {
  mostValuablePlayer: {
    _id: "1",
    age: 23,
    blockJump: 81,
    currentCoach: "Coach 1",
    currentGameOverallNumberOfPoints: 24,
    currentGameTotalNumberOfAceServes: 10,
    currentGameTotalNumberOfBlocks: 5,
    currentGameTotalNumberOfErrors: 11,
    currentGameTotalNumberOfPoints: 35,
    currentGameTotalNumberOfSpikes: 15,
    currentGameTotalNumberOfTips: 5,
    currentTeam: "Team 1",
    height: 188,
    highestReach: 241,
    name: "Mohammad Bigdelu",
    nation: "Canada",
    number: 1,
  },
  sets: [
    { teamOnePoints: 25, teamTwoPoints: 23 },
    { teamOnePoints: 25, teamTwoPoints: 20 },
    { teamOnePoints: 22, teamTwoPoints: 25 },
    { teamOnePoints: 26, teamTwoPoints: 28 },
    { teamOnePoints: 25, teamTwoPoints: 21 },
  ],

  team1: {
    name: "Team One",
    coach: "Mehdi Rezaii",
    Players: [
      {
        _id: "1",
        age: 23,
        blockJump: 81,
        currentCoach: "Coach 1",
        currentGameOverallNumberOfPoints: 24,
        currentGameTotalNumberOfAceServes: 10,
        currentGameTotalNumberOfBlocks: 5,
        currentGameTotalNumberOfErrors: 11,
        currentGameTotalNumberOfPoints: 35,
        currentGameTotalNumberOfSpikes: 15,
        currentGameTotalNumberOfTips: 5,
        currentTeam: "Team 1",
        height: 188,
        highestReach: 241,
        name: "Mohammad Bigdelu",
        nation: "Canada",
        number: 1,
      },
      {
        _id: "2",
        age: 28,
        blockJump: 75,
        currentCoach: "Coach 1",
        currentGameOverallNumberOfPoints: 15,
        currentGameTotalNumberOfAceServes: 3,
        currentGameTotalNumberOfBlocks: 3,
        currentGameTotalNumberOfErrors: 2,
        currentGameTotalNumberOfPoints: 17,
        currentGameTotalNumberOfSpikes: 7,
        currentGameTotalNumberOfTips: 4,
        currentTeam: "Team 1",
        height: 185,
        highestReach: 231,
        name: "Sasan Jafarzadeh",
        nation: "Canada",
        number: 2,
      },
      {
        _id: "3",
        age: 25,
        blockJump: 84,
        currentCoach: "Coach 1",
        currentGameOverallNumberOfPoints: 20,
        currentGameTotalNumberOfAceServes: 3,
        currentGameTotalNumberOfBlocks: 5,
        currentGameTotalNumberOfErrors: 3,
        currentGameTotalNumberOfPoints: 23,
        currentGameTotalNumberOfSpikes: 12,
        currentGameTotalNumberOfTips: 3,
        currentTeam: "Team 1",
        height: 192,
        highestReach: 248,
        name: "Ehsan Sabettash",
        nation: "Canada",
        number: 3,
      },
      {
        _id: "4",
        age: 23,
        blockJump: 72,
        currentCoach: "Coach 1",
        currentGameOverallNumberOfPoints: 18,
        currentGameTotalNumberOfAceServes: 5,
        currentGameTotalNumberOfBlocks: 5,
        currentGameTotalNumberOfErrors: 2,
        currentGameTotalNumberOfPoints: 20,
        currentGameTotalNumberOfSpikes: 8,
        currentGameTotalNumberOfTips: 2,
        currentTeam: "Team 1",
        height: 188,
        highestReach: 241,
        name: "Sama Sepehrirad",
        nation: "Canada",
        number: 4,
      },
      {
        _id: "5",
        age: 29,
        blockJump: 65,
        currentCoach: "Coach 1",
        currentGameOverallNumberOfPoints: 15,
        currentGameTotalNumberOfAceServes: 2,
        currentGameTotalNumberOfBlocks: 4,
        currentGameTotalNumberOfErrors: 3,
        currentGameTotalNumberOfPoints: 18,
        currentGameTotalNumberOfSpikes: 8,
        currentGameTotalNumberOfTips: 4,
        currentTeam: "Team 1",
        height: 178,
        highestReach: 221,
        name: "Parisa Sarlak",
        nation: "Canada",
        number: 5,
      },
      {
        _id: "6",
        age: 26,
        blockJump: 71,
        currentCoach: "Coach 1",
        currentGameOverallNumberOfPoints: 20,
        currentGameTotalNumberOfAceServes: 5,
        currentGameTotalNumberOfBlocks: 8,
        currentGameTotalNumberOfErrors: 5,
        currentGameTotalNumberOfPoints: 25,
        currentGameTotalNumberOfSpikes: 10,
        currentGameTotalNumberOfTips: 2,
        currentTeam: "Team 1",
        height: 168,
        highestReach: 221,
        name: "Behzad Ramezani",
        nation: "Canada",
        number: 6,
      },
    ],
  },

  team2: {
    name: "Team Two",
    coach: "Iraj Khaleghi",
    Players: [
      {
        _id: "7",
        age: 22,
        blockJump: 85,
        currentCoach: "Coach 2",
        currentGameOverallNumberOfPoints: 20,
        currentGameTotalNumberOfAceServes: 8,
        currentGameTotalNumberOfBlocks: 7,
        currentGameTotalNumberOfErrors: 4,
        currentGameTotalNumberOfPoints: 24,
        currentGameTotalNumberOfSpikes: 9,
        currentGameTotalNumberOfTips: 3,
        currentTeam: "Team 2",
        height: 178,
        highestReach: 249,
        name: "Alireza Dinakani",
        nation: "Canada",
        number: 1,
      },
      {
        _id: "8",
        age: 20,
        blockJump: 72,
        currentCoach: "Coach 2",
        currentGameOverallNumberOfPoints: 18,
        currentGameTotalNumberOfAceServes: 5,
        currentGameTotalNumberOfBlocks: 9,
        currentGameTotalNumberOfErrors: 2,
        currentGameTotalNumberOfPoints: 20,
        currentGameTotalNumberOfSpikes: 8,
        currentGameTotalNumberOfTips: 5,
        currentTeam: "Team 2",
        height: 181,
        highestReach: 240,
        name: "Nima Khanli",
        nation: "Canada",
        number: 2,
      },
      {
        _id: "9",
        age: 30,
        blockJump: 88,
        currentCoach: "Coach 2",
        currentGameOverallNumberOfPoints: 24,
        currentGameTotalNumberOfAceServes: 7,
        currentGameTotalNumberOfBlocks: 6,
        currentGameTotalNumberOfErrors: 1,
        currentGameTotalNumberOfPoints: 25,
        currentGameTotalNumberOfSpikes: 9,
        currentGameTotalNumberOfTips: 1,
        currentTeam: "Team 2",
        height: 168,
        highestReach: 244,
        name: "Hossein Shey",
        nation: "Canada",
        number: 3,
      },
      {
        _id: "10",
        age: 26,
        blockJump: 74,
        currentCoach: "Coach 2",
        currentGameOverallNumberOfPoints: 19,
        currentGameTotalNumberOfAceServes: 6,
        currentGameTotalNumberOfBlocks: 8,
        currentGameTotalNumberOfErrors: 3,
        currentGameTotalNumberOfPoints: 22,
        currentGameTotalNumberOfSpikes: 9,
        currentGameTotalNumberOfTips: 4,
        currentTeam: "Team 2",
        height: 181,
        highestReach: 235,
        name: "Mehrdad Ramezani",
        nation: "Canada",
        number: 4,
      },
      {
        _id: "11",
        age: 23,
        blockJump: 81,
        currentCoach: "Coach 2",
        currentGameOverallNumberOfPoints: 17,
        currentGameTotalNumberOfAceServes: 4,
        currentGameTotalNumberOfBlocks: 5,
        currentGameTotalNumberOfErrors: 3,
        currentGameTotalNumberOfPoints: 19,
        currentGameTotalNumberOfSpikes: 9,
        currentGameTotalNumberOfTips: 2,
        currentTeam: "Team 2",
        height: 178,
        highestReach: 221,
        name: "Mehdi Yousefi",
        nation: "Canada",
        number: 5,
      },
      {
        _id: "12",
        age: 19,
        blockJump: 61,
        currentCoach: "Coach 2",
        currentGameOverallNumberOfPoints: 19,
        currentGameTotalNumberOfAceServes: 8,
        currentGameTotalNumberOfBlocks: 10,
        currentGameTotalNumberOfErrors: 4,
        currentGameTotalNumberOfPoints: 23,
        currentGameTotalNumberOfSpikes: 12,
        currentGameTotalNumberOfTips: 0,
        currentTeam: "Team 2",
        height: 188,
        highestReach: 241,
        name: "Ela Jahanbakhs",
        nation: "Canada",
        number: 6,
      },
    ],
  },

  team1NumberOfSets: 3,

  team2NumberOfSets: 2,

  totalNumberOfAceServes: 35,
  totalNumberOfBlocks: 45,
  totalNumberOfErrors: 20,
  totalNumberOfSpikes: 100,
  totalNumberOfTips: 30,

  winner: {
    name: "Team One",
    Players: [
      {
        _id: "64a974a0-098f-4913-b464-1",
        age: 23,
        blockJump: 81,
        currentCoach: "Coach 1",
        currentGameOverallNumberOfPoints: 24,
        currentGameTotalNumberOfAceServes: 10,
        currentGameTotalNumberOfBlocks: 5,
        currentGameTotalNumberOfErrors: 11,
        currentGameTotalNumberOfPoints: 35,
        currentGameTotalNumberOfSpikes: 15,
        currentGameTotalNumberOfTips: 5,
        currentTeam: "Team 1",
        height: 188,
        highestReach: 241,
        name: "Mohammad Bigdelu",
        nation: "Canada",
        number: 1,
      },
      {
        _id: "64a974a0-098f-4913-b464-2",
        age: 28,
        blockJump: 75,
        currentCoach: "Coach 1",
        currentGameOverallNumberOfPoints: 15,
        currentGameTotalNumberOfAceServes: 3,
        currentGameTotalNumberOfBlocks: 3,
        currentGameTotalNumberOfErrors: 2,
        currentGameTotalNumberOfPoints: 17,
        currentGameTotalNumberOfSpikes: 7,
        currentGameTotalNumberOfTips: 4,
        currentTeam: "Team 1",
        height: 185,
        highestReach: 231,
        name: "Sasan Jafarzadeh",
        nation: "Canada",
        number: 2,
      },
      {
        _id: "64a974a0-098f-4913-b464-3",
        age: 25,
        blockJump: 84,
        currentCoach: "Coach 1",
        currentGameOverallNumberOfPoints: 20,
        currentGameTotalNumberOfAceServes: 3,
        currentGameTotalNumberOfBlocks: 5,
        currentGameTotalNumberOfErrors: 3,
        currentGameTotalNumberOfPoints: 23,
        currentGameTotalNumberOfSpikes: 12,
        currentGameTotalNumberOfTips: 3,
        currentTeam: "Team 1",
        height: 192,
        highestReach: 248,
        name: "Ehsan Sabettash",
        nation: "Canada",
        number: 3,
      },
      {
        _id: "64a974a0-098f-4913-b464-4",
        age: 23,
        blockJump: 72,
        currentCoach: "Coach 1",
        currentGameOverallNumberOfPoints: 18,
        currentGameTotalNumberOfAceServes: 5,
        currentGameTotalNumberOfBlocks: 5,
        currentGameTotalNumberOfErrors: 2,
        currentGameTotalNumberOfPoints: 20,
        currentGameTotalNumberOfSpikes: 8,
        currentGameTotalNumberOfTips: 2,
        currentTeam: "Team 1",
        height: 188,
        highestReach: 241,
        name: "Sama Sepehrirad",
        nation: "Canada",
        number: 4,
      },
      {
        _id: "64a974a0-098f-4913-b464-5",
        age: 29,
        blockJump: 65,
        currentCoach: "Coach 1",
        currentGameOverallNumberOfPoints: 15,
        currentGameTotalNumberOfAceServes: 2,
        currentGameTotalNumberOfBlocks: 4,
        currentGameTotalNumberOfErrors: 3,
        currentGameTotalNumberOfPoints: 18,
        currentGameTotalNumberOfSpikes: 8,
        currentGameTotalNumberOfTips: 4,
        currentTeam: "Team 1",
        height: 178,
        highestReach: 221,
        name: "Parisa Sarlak",
        nation: "Canada",
        number: 5,
      },
      {
        _id: "64a974a0-098f-4913-b464-6",
        age: 26,
        blockJump: 71,
        currentCoach: "Coach 1",
        currentGameOverallNumberOfPoints: 20,
        currentGameTotalNumberOfAceServes: 5,
        currentGameTotalNumberOfBlocks: 8,
        currentGameTotalNumberOfErrors: 5,
        currentGameTotalNumberOfPoints: 25,
        currentGameTotalNumberOfSpikes: 10,
        currentGameTotalNumberOfTips: 2,
        currentTeam: "Team 1",
        height: 168,
        highestReach: 221,
        name: "Behzad Ramezani",
        nation: "Canada",
        number: 6,
      },
    ],
  },
};
