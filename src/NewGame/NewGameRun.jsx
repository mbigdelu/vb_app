import React, { useState, useEffect } from "react";
import Game from "../Classes/Game.ts";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function NewGameRun(props) {
  const [gameData, setGameData] = useState({
    isAlerted: false,
    lastPointTeam: 0,
    playersBlockShow: false,
    actsBlockShow: false,
    isGameDone: false,

    teamOneSets: 0,
    teamTwoSets: 0,
    teamOnePoints: 0,
    teamTwoPoints: 0,
    ...props.gameData,
    pointedTeam: {},
    selectedAct: "",
    selectedPlayer: {},
    gameObj: new Game(props.gameData.team1, props.gameData.team2),
  });
  const [fakeErrorMakerCount, setFakeErrorMakerCount] = useState(1);

  const listOfActs = ["Spike", "Serve", "Block", "Error", "Tip"];

  function handleLastPointTeam(id) {
    let lastPointTeam = 0;
    if (id === "teamOneBtn") lastPointTeam = 1;
    if (id === "teamTwoBtn") lastPointTeam = 2;

    return lastPointTeam;
  }

  function handleActsChange(act) {
    let tempData = { ...gameData };
    tempData.selectedAct = act;
    setGameData(tempData);
  }

  function handlePlayersChange(player) {
    let tempData = { ...gameData };
    tempData.selectedPlayer = player;
    setGameData(tempData);
  }

  function handleUpdatePlayerData(data) {
    let tempGameData = { ...data };
    tempGameData.selectedPlayer.currentGameTotalNumberOfPoints++;
    tempGameData.selectedPlayer.currentGameOverallNumberOfPoints++;

    switch (tempGameData.selectedAct) {
      case "Spike":
        tempGameData.selectedPlayer.currentGameTotalNumberOfSpikes++;
        break;
      case "Block":
        tempGameData.selectedPlayer.currentGameTotalNumberOfBlocks++;
        break;
      case "Serve":
        tempGameData.selectedPlayer.currentGameTotalNumberOfAceServes++;
        break;
      case "Serve":
        tempGameData.selectedPlayer.currentGameTotalNumberOfTips++;
        break;
      case "Error":
        tempGameData.selectedPlayer.currentGameTotalNumberOfErrors++;
        tempGameData.selectedPlayer.currentGameOverallNumberOfPoints++;
        break;

      default:
        break;
    }

    return tempGameData;
  }

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress]);

  function handleKeyPress(event) {
    let tempGameData = { ...gameData };

    switch (event.key) {
      case "a" || "A":
        tempGameData.selectedAct = "Spike";
        break;
      case "s" || "S":
        tempGameData.selectedAct = "Serve";
        break;
      case "d" || "D":
        tempGameData.selectedAct = "Block";
        break;
      case "f" || "F":
        tempGameData.selectedAct = "Error";
        break;
      case "g" || "G":
        tempGameData.selectedAct = "Tip";
        break;
      case "g" || "G":
        tempGameData.selectedAct = "Tip";
        break;

      default:
        break;
    }

    setGameData(tempGameData);
  }

  function handleUpdateGameDataPoints(data) {
    let tempGameData = { ...data };

    switch (tempGameData.selectedAct) {
      case "Spike":
        tempGameData.gameObj.totalNumberOfSpikes++;
        break;
      case "Block":
        tempGameData.gameObj.totalNumberOfBlocks++;
        break;
      case "Serve":
        tempGameData.gameObj.totalNumberOfAceServes++;
        break;
      case "Error":
        tempGameData.gameObj.totalNumberOfErrors++;
        break;
      case "Tip":
        tempGameData.gameObj.totalNumberOfTips++;
        break;

      default:
        break;
    }
    return tempGameData;
  }
  const handleSaveClick = (e) => {
    let tempOffData = { ...gameData };
    let tempData = { ...gameData };
    tempOffData = handleUpdatePlayerData(gameData);
    tempOffData = handleUpdateGameDataPoints(gameData);

    tempData.actsBlockShow = false;
    tempData.playersBlockShow = false;
    tempData.pointedTeam = {};

    tempOffData.selectedAct = "";
    tempOffData.selectedPlayer = {};

    setGameData(tempData);
    setGameData(tempOffData);
  };

  const handleClick = (e) => {
    let tempGameData = { ...gameData };

    switch (e.target.id) {
      case "teamOneBtn":
        tempGameData.pointedTeam = tempGameData.gameObj.team1;
        break;
      case "teamTwoBtn":
        tempGameData.pointedTeam = tempGameData.gameObj.team2;
        break;

      default:
        tempGameData.pointedTeam = {};
        break;
    }

    let tempFakeErrorMakerCount = fakeErrorMakerCount;
    tempFakeErrorMakerCount++;

    tempGameData[e.target.dataset.path]++;

    if (isLastPoint(tempGameData)) {
      tempGameData = writeSetInToGameObj(tempGameData);

      tempGameData = updateSets(tempGameData);
      if (isLastSet(tempGameData)) {
        tempGameData = handleGameIsDone(tempGameData);
      }
    }

    const lastPointTeam = handleLastPointTeam(e.target.id);

    tempGameData.lastPointTeam = lastPointTeam;
    tempGameData.playersBlockShow = true;
    tempGameData.actsBlockShow = true;

    setGameData(tempGameData);
    setGameData(tempGameData);
  };

  function handleGameIsDone(date) {
    gameData.gameObj.calculateMostValuablePlayer();
    const tempGameData = { ...date };
    props.gameIsDone(gameData.gameObj);

    tempGameData.isGameDone = true;

    if (tempGameData.teamOneSets > tempGameData.teamTwoSets)
      tempGameData.gameObj.winner = gameData.team1;
    else tempGameData.gameObj.winner = gameData.team2;

    return tempGameData;
  }

  function writeSetInToGameObj(data) {
    let tempGameData = { ...data };

    tempGameData.gameObj.sets.push({
      teamOnePoints: tempGameData.teamOnePoints,
      teamTwoPoints: tempGameData.teamTwoPoints,
    });

    return tempGameData;
  }

  function updateSets(data) {
    let tempGameData = { ...data };

    if (tempGameData.teamOnePoints > tempGameData.teamTwoPoints) {
      tempGameData.teamOneSets++;
      tempGameData.gameObj.team1NumberOfSets++;
    } else {
      tempGameData.teamTwoSets++;
      tempGameData.gameObj.team2NumberOfSets++;
    }

    tempGameData.teamOnePoints = 0;
    tempGameData.teamTwoPoints = 0;

    return tempGameData;
  }

  function isLastPoint(data) {
    isLastPoint = false;

    if (
      data.teamOnePoints >= data.numberOfPoints ||
      data.teamTwoPoints >= data.numberOfPoints
    ) {
      if (Math.abs(data.teamOnePoints - data.teamTwoPoints) >= 2) {
        isLastPoint = true;
      }
    } else isLastPoint = false;

    return isLastPoint;
  }

  function isLastSet(data) {
    isLastSet = false;

    if (
      data.teamOneSets === data.numberOfSets ||
      data.teamTwoSets === data.numberOfSets
    ) {
      isLastSet = true;
    }

    return isLastSet;
  }

  function playersRender(data) {
    let players = [];
    if (data.lastPointTeam === 1 && data.selectedAct !== "Error")
      players = data.gameObj.team1.Players;
    if (data.lastPointTeam === 1 && data.selectedAct === "Error")
      players = data.gameObj.team2.Players;
    if (data.lastPointTeam === 2 && data.selectedAct === "Error")
      players = data.gameObj.team1.Players;
    if (data.lastPointTeam === 2 && data.selectedAct !== "Error")
      players = data.gameObj.team2.Players;

    if (window.innerWidth > 991) {
      return (
        <div
          class="btn-group mt-3 shadow"
          role="acts"
          aria-label="Basic radio toggle button group"
          name="actsRadioGroup"
        >
          {players.map((player) => (
            <React.Fragment>
              <input
                type="radio"
                className="btn-check"
                name="playerRadioGroup"
                id={` player-${player.number} `}
                autoComplete="off"
                checked={player == gameData.selectedPlayer}
                onClick={() => handlePlayersChange(player)}
              />
              <label
                className="btn btn-outline-primary"
                key={player.number}
                for={` player-${player.number} `}
              >
                {player.name}{" "}
              </label>
            </React.Fragment>
          ))}
        </div>
      );
    } else if (window.innerWidth > 440) {
      const firstPlayersArray = players.slice(0, 3);
      const secondPlayersArray = players.slice(3, 6);

      return (
        <React.Fragment>
          <div
            class="btn-group mt-3"
            role="acts"
            aria-label="Basic radio toggle button group"
            name="actsRadioGroup"
          >
            {firstPlayersArray.map((player) => (
              <React.Fragment>
                <input
                  type="radio"
                  className="btn-check"
                  name="playerRadioGroup"
                  id={` player-${player.number} `}
                  autoComplete="off"
                  checked={player == gameData.selectedPlayer}
                  onClick={() => handlePlayersChange(player)}
                />
                <label
                  className="btn btn-outline-primary"
                  key={player.number}
                  for={` player-${player.number} `}
                >
                  {player.name}{" "}
                </label>
              </React.Fragment>
            ))}
          </div>

          <div
            class="btn-group mt-1"
            role="acts"
            aria-label="Basic radio toggle button group"
            name="actsRadioGroup"
          >
            {secondPlayersArray.map((player) => (
              <React.Fragment>
                <input
                  type="radio"
                  className="btn-check"
                  name="playerRadioGroup"
                  id={` player-${player.number} `}
                  autoComplete="off"
                  checked={player == gameData.selectedPlayer}
                  onClick={() => handlePlayersChange(player)}
                />
                <label
                  className="btn btn-outline-primary"
                  key={player.number}
                  for={` player-${player.number} `}
                >
                  {player.name}{" "}
                </label>
              </React.Fragment>
            ))}
          </div>
        </React.Fragment>
      );
    } else {
      const firstPlayersArray = players.slice(0, 2);
      const secondPlayersArray = players.slice(2, 4);
      const thirdPlayersArray = players.slice(4, 6);
      return (
        <React.Fragment>
          <div
            class="btn-group mt-1"
            role="acts"
            aria-label="Basic radio toggle button group"
            name="actsRadioGroup"
          >
            {firstPlayersArray.map((player) => (
              <React.Fragment>
                <input
                  type="radio"
                  className="btn-check"
                  name="playerRadioGroup"
                  id={` player-${player.number} `}
                  autoComplete="off"
                  checked={player == gameData.selectedPlayer}
                  onClick={() => handlePlayersChange(player)}
                />
                <label
                  className="btn btn-outline-primary"
                  key={player.number}
                  for={` player-${player.number} `}
                >
                  {player.name}{" "}
                </label>
              </React.Fragment>
            ))}
          </div>
          <div
            class="btn-group mt-1"
            role="acts"
            aria-label="Basic radio toggle button group"
            name="actsRadioGroup"
          >
            {secondPlayersArray.map((player) => (
              <React.Fragment>
                <input
                  type="radio"
                  className="btn-check"
                  name="playerRadioGroup"
                  id={` player-${player.number} `}
                  autoComplete="off"
                  checked={player == gameData.selectedPlayer}
                  onClick={() => handlePlayersChange(player)}
                />
                <label
                  className="btn btn-outline-primary"
                  key={player.number}
                  for={` player-${player.number} `}
                >
                  {player.name}{" "}
                </label>
              </React.Fragment>
            ))}
          </div>
          <div
            class="btn-group mt-1"
            role="acts"
            aria-label="Basic radio toggle button group"
            name="actsRadioGroup"
          >
            {thirdPlayersArray.map((player) => (
              <React.Fragment>
                <input
                  type="radio"
                  className="btn-check"
                  name="playerRadioGroup"
                  id={` player-${player.number} `}
                  autoComplete="off"
                  checked={player == gameData.selectedPlayer}
                  onClick={() => handlePlayersChange(player)}
                />
                <label
                  className="btn btn-outline-primary"
                  key={player.number}
                  for={` player-${player.number} `}
                >
                  {player.name}{" "}
                </label>
              </React.Fragment>
            ))}
          </div>
        </React.Fragment>
      );
    }
  }

  function actsRender(actsList) {
    if (window.innerWidth > 422) {
      return (
        <div
          class="btn-group mt-3 shadow"
          role="acts"
          aria-label="Basic radio toggle button group"
          name="actsRadioGroup"
        >
          {actsList.map((act) => (
            <React.Fragment>
              <input
                type="radio"
                className="btn-check"
                name="actsRadioGroup"
                id={` ${act} `}
                autoComplete="off"
                checked={act == gameData.selectedAct}
                onClick={() => handleActsChange(act)}
              />
              <label
                className="btn btn-outline-primary"
                key={act}
                for={` ${act} `}
              >
                {act}{" "}
              </label>
            </React.Fragment>
          ))}
        </div>
      );
    } else {
      const firstActsArray = actsList.slice(0, 2);
      const secondActsArray = actsList.slice(2, 4);
      return (
        <React.Fragment>
          <div
            class="btn-group mt-3"
            role="acts"
            aria-label="Basic radio toggle button group"
            name="actsRadioGroup"
          >
            {firstActsArray.map((act) => (
              <React.Fragment>
                <input
                  type="radio"
                  className="btn-check"
                  name="actsRadioGroup"
                  id={` ${act} `}
                  autoComplete="off"
                  checked={act == gameData.selectedAct}
                  onClick={() => handleActsChange(act)}
                />
                <label
                  className="btn btn-outline-primary"
                  key={act}
                  for={` ${act} `}
                >
                  {act}{" "}
                </label>
              </React.Fragment>
            ))}
          </div>
          <div
            class="btn-group mt-3"
            role="acts"
            aria-label="Basic radio toggle button group"
            name="actsRadioGroup"
          >
            {secondActsArray.map((act) => (
              <React.Fragment>
                <input
                  type="radio"
                  className="btn-check"
                  name="actsRadioGroup"
                  id={` ${act} `}
                  autoComplete="off"
                  checked={act == gameData.selectedAct}
                  onClick={() => handleActsChange(act)}
                />
                <label
                  className="btn btn-outline-primary"
                  key={act}
                  for={` ${act} `}
                >
                  {act}{" "}
                </label>
              </React.Fragment>
            ))}
          </div>
        </React.Fragment>
      );
    }
  }

  return (
    <div>
      <div
        className="container vh-100 mt-5 "
        id="gameBox"
        hidden={gameData.isGameDone}
      >
        <div className="container mt-5 p-5  rounded-5 inside-shadow  bg-prim ">
          <div className="d-flex justify-content-between">
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="button-tooltip" {...props}>
                  You can switch between acts using keys a, s, d, f, and g
                </Tooltip>
              }
            >
              <Button variant="invisible">
                <AiOutlineInfoCircle size={25} className="ms-3" />
              </Button>
            </OverlayTrigger>

            <h1 className="r">MATCH</h1>
            <AiOutlineInfoCircle size={25} className="invisible me-3" />
          </div>

          <div className="container">
            <div className="row justify-content-center"></div>
            <div className="m-5 row justify-content-md-center">
              <div className="col-md-auto">
                <button
                  className={`btn ${
                    gameData.pointedTeam.name === gameData.team1.name
                      ? "btn-primary"
                      : "btn-outline-primary"
                  } btn-lg shadow-lg`}
                  id="teamOneBtn"
                  data-path="teamOnePoints"
                  onClick={handleClick}
                >
                  {gameData.team1.name}
                </button>
              </div>
              <div className="col-md-auto">
                <div className="row">
                  <div className="col">
                    <h2>{gameData.teamOnePoints}</h2>
                  </div>
                  <div className="col-md-auto">
                    <div className="row">
                      <div className="col-md-auto">
                        <h5 className="text-success">{gameData.teamOneSets}</h5>
                      </div>
                      <div className="col-md-auto"></div>
                      <div className="col-md-auto">
                        <h5 className="text-success">{gameData.teamTwoSets}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-auto">
                    <h2>{gameData.teamTwoPoints}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-auto">
                <button
                  className={`btn ${
                    gameData.pointedTeam.name === gameData.team2.name
                      ? "btn-primary"
                      : "btn-outline-primary"
                  } btn-lg shadow-lg`}
                  id="teamTwoBtn"
                  data-path="teamTwoPoints"
                  onClick={handleClick}
                >
                  {gameData.team2.name}
                </button>
              </div>
            </div>
          </div>
          <div
            className={`container ${
              !gameData.actsBlockShow ? "re-invisible" : "re-visible"
            }`}
          >
            <div className="mt-5">
              <h3>How the point was deployed?</h3>
            </div>

            {actsRender(listOfActs)}
          </div>
          <div
            className={`container ${
              !gameData.playersBlockShow ? "re-invisible" : "re-visible"
            }`}
          >
            <div className="mt-5">
              <h3>
                {gameData.selectedAct == "Error"
                  ? "Who Lost The Point?"
                  : "Who Got The Point?"}
              </h3>
            </div>

            {playersRender(gameData)}
          </div>
          <div
            className={`container mt-5 ${
              !(gameData.selectedPlayer.name && gameData.selectedAct)
                ? "re-invisible"
                : "re-visible"
            }`}
          >
            <div class="d-grid gap-2 col-6 mx-auto ">
              <button
                class="btn   btn-outline-success mx-5 shadow"
                type="button"
                onClick={() => handleSaveClick()}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container  py-5">
        <p></p>
      </div>
      <div className="container  py-5">
        <p></p>
      </div>
      <div className="container  py-5">
        <p></p>
      </div>
    </div>
  );
}

export default NewGameRun;
