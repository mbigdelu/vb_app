import React, { useState } from "react";

function NewGameRun(props) {
  const [gameData, setGameData] = useState({
    lastPointTeam: 0,
    playersBlockShow: false,
    actsBlockShow: false,
    isGameDone: false,
    winner: "",
    teamOneSets: 0,
    teamTwoSets: 0,
    teamOnePoints: 0,
    teamTwoPoints: 0,
    ...props.gameData,
  });

  const [offGameData, setOffGameData] = useState({
    selectedAct: "",
    selectedPlayer: {},
  });

  const listOfActs = ["Spike", "Serve", "Block", "Error"];

  function handleLastPointTeam(id) {
    let lastPointTeam = 0;
    if (id === "teamOneBtn") lastPointTeam = 1;
    if (id === "teamTwoBtn") lastPointTeam = 2;

    return lastPointTeam;
  }

  function handleActsChange(act) {
    let tempData = { ...offGameData };
    tempData.selectedAct = act;
    setOffGameData(tempData);
  }

  function handlePlayersChange(player) {
    let tempData = { ...offGameData };
    tempData.selectedPlayer = player;
    setOffGameData(tempData);
  }

  const handleSaveClick = (e) => {
    let tempOffData = { ...offGameData };
    let tempData = { ...gameData };

    tempData.actsBlockShow = false;
    tempData.playersBlockShow = false;

    tempOffData.selectedAct = "";
    tempOffData.selectedPlayer = {};

    setGameData(tempData);
    setOffGameData(tempOffData);
  };

  const handleClick = (e) => {
    let tempGameData = { ...gameData };

    tempGameData[e.target.dataset.path]++;

    if (isLastPoint(tempGameData)) {
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
  };

  function handleGameIsDone(date) {
    const tempGameData = { ...date };

    tempGameData.isGameDone = true;

    if (tempGameData.teamOneSets > tempGameData.teamTwoSets)
      tempGameData.winner = gameData.teamOne.name;
    else tempGameData.winner = gameData.teamTwo.name;

    return tempGameData;
  }

  function updateSets(data) {
    let tempGameData = { ...data };

    if (tempGameData.teamOnePoints > tempGameData.teamTwoPoints)
      tempGameData.teamOneSets++;
    else tempGameData.teamTwoSets++;

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
    if (data.lastPointTeam === 1) players = data.teamOne.Players;
    if (data.lastPointTeam === 2) players = data.teamTwo.Players;

    return players.map((player) => (
      <React.Fragment>
        <input
          type="radio"
          className="btn-check"
          name="playerRadioGroup"
          id={` player-${player.number} `}
          autoComplete="off"
          checked={player == offGameData.selectedPlayer}
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
    ));
  }

  function actsRender(actsList) {
    return actsList.map((act) => (
      <React.Fragment>
        <input
          type="radio"
          className="btn-check"
          name="actsRadioGroup"
          id={` ${act} `}
          autoComplete="off"
          checked={act == offGameData.selectedAct}
          onClick={() => handleActsChange(act)}
        />
        <label className="btn btn-outline-primary" key={act} for={` ${act} `}>
          {act}{" "}
        </label>
      </React.Fragment>
    ));
  }

  return (
    <div>
      <div className="container" id="gameBox" hidden={gameData.isGameDone}>
        <h1>Game Run page</h1>
        <div className="container">
          <div className="m-5 row justify-content-md-center">
            <div className="col-md-auto">
              <button
                className="btn btn-primary btn-lg"
                id="teamOneBtn"
                data-path="teamOnePoints"
                onClick={handleClick}
              >
                {gameData.teamOne.name}
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
                      <h5>{gameData.teamOneSets}</h5>
                    </div>
                    <div className="col-md-auto"></div>
                    <div className="col-md-auto">
                      <h5>{gameData.teamTwoSets}</h5>
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
                className="btn btn-primary btn-lg"
                id="teamTwoBtn"
                data-path="teamTwoPoints"
                onClick={handleClick}
              >
                {gameData.teamTwo.name}
              </button>
            </div>
          </div>
        </div>
        <div className="container " hidden={!gameData.actsBlockShow}>
          <div className="mt-5">
            <h3>How the point was deployed?</h3>
          </div>
          <div
            class="btn-group mt-3"
            role="acts"
            aria-label="Basic radio toggle button group"
            name="actsRadioGroup"
          >
            {actsRender(listOfActs)}
          </div>
        </div>
        <div className="container" hidden={!gameData.playersBlockShow}>
          <div className="mt-5">
            <h3>Who got the point?</h3>
          </div>
          <div
            class="btn-group  mt-3"
            role="players"
            aria-label="Basic radio toggle button group"
            name="playersRadioGroup"
          >
            {playersRender(gameData)}
          </div>
        </div>
        <div
          className="container mt-5"
          hidden={!(offGameData.selectedPlayer.name && offGameData.selectedAct)}
        >
          <div class="d-grid gap-2 col-6 mx-auto">
            <button
              class="btn   btn-outline-success mx-5"
              type="button"
              onClick={() => handleSaveClick()}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
      <div className="container" id="gameDoneBox" hidden={!gameData.isGameDone}>
        <h1>The Winner is {gameData.winner}</h1>
      </div>
    </div>
  );
}

export default NewGameRun;
