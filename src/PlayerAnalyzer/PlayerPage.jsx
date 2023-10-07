import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import CircularJSON from "circular-json";

import {
  getPlayersList,
  setPlayersList,
  getPlayer,
} from "./FakeDataService/FakePlayerDataFetch.js";
import PlayersChartSection from "./PlayersChartSection";
import image from "../Images/image.jpg";
import TableGenerator from "./PlayerTableGenerator";
import PlayerSearch from "./PlayerSearch";
import PlayersExtraInfoTableGenerator from "./PlayersExtraInfoTableGenerator.jsx";

export default function PlayerPage() {
  const [playersList, setPlayersList] = useState({
    playersList: getPlayersList(),
  });
  const [currentPlayerID, setCurrentPlayerID] = useState(
    window.location.pathname.split("/")[2]
  );

  const navigate = useNavigate();

  const player = playersList.playersList.find(
    (item) => item._id == currentPlayerID
  );

  const [state, setState] = useState({ playerData: player });

  useEffect(() => {
    setCurrentPlayerID(window.location.pathname.split("/")[2]);
  }, [window.location]);

  useEffect(() => {
    if (!player) {
      navigate("/not-found");
    }
  }, [player, navigate]);

  if (!player) {
    return null;
  }

  return (
    <div className="container container-sm">
      <div className="container  py-5">
        <p></p>
      </div>
      <PlayerSearch />
      <div class="container mt-5 pt-3  ">
        <div class="row my-5">
          <div class="col-md-6 mb-3">
            <div className="mt-5 py-5 d-inline-block">
              <p className="fs-2 text-start text-prim p-4">
                {state.playerData.name}
              </p>
              <p className="fs-4 text-start mb-0 text-prim px-5">
                {state.playerData.nation}
              </p>
              <p className="fs-4 text-start mb-0 text-prim px-5">
                {state.playerData.age}
              </p>
              <p className="fs-4 text-start text-prim px-5">
                {state.playerData.position}
              </p>
            </div>
          </div>
          <div class="col-md-6 mb-5 mt-5 py-5">
            <div className="d-inline-block w-50 rounded-circle border border-primary border-5">
              <img
                src={image}
                className="shadow-inside rounded-circle mx-auto d-block img-fluid player-image shadow"
              />
            </div>
          </div>
        </div>
        <div className="row  p-0 rounded-4 justify-content-center bg-prim">
          <div class="col-md-6 p-4 pb-0 m-0  rounded-start-4 bg-light shadow">
            <div className=" ">
              <TableGenerator
                data={tableDataGenerator(state.playerData)}
                bgColorClass="table-light"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div>
              <PlayersChartSection
                data={chartDataGenerator(state.playerData)}
              />
            </div>
          </div>
          <div className="container mt-5 pt-3">
            <PlayersExtraInfoTableGenerator data={player} />
          </div>
        </div>
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

function chartDataGenerator(data) {
  let chartData = data.playerHistory.map((playerHistory) => {
    return {
      percentageOfAceServes: playerHistory.state.percentageOfAceServes,
      percentageOfSuccessfulSpikes:
        playerHistory.state.percentageOfSuccessfulSpikes,
      percentageOfSuccessfulBlocks:
        playerHistory.state.percentageOfSuccessfulBlocks,
      percentageOfOverall: playerHistory.state.percentageOfOverall,

      date: playerHistory.timestamp,
    };
  });
  return chartData;
}

function tableDataGenerator(data) {
  const tableData = [];
  tableData.push({ name: "Current Team", value: data.currentTeam });
  tableData.push({ name: "Current Coach", value: data.currentCoach });
  tableData.push({ name: "Current Number", value: data.number });
  tableData.push({ name: "Height", value: data.height });
  tableData.push({ name: "Weight", value: data.weight });
  tableData.push({ name: "Highest Reach", value: data.highestReach });
  tableData.push({ name: "Block Jump", value: data.blockJump });
  tableData.push({ name: "Spike Jump", value: data.spikeJump });
  tableData.push({
    name: "% Ace Serves",
    value: data.percentageOfAceServes,
  });
  tableData.push({
    name: "% Passed Serves",
    value: data.percentageOfPassedServes,
  });
  tableData.push({
    name: "% Passed Spikes",
    value: data.percentageOfPassedSpikes,
  });
  tableData.push({
    name: "% Successful Blocks",
    value: data.percentageOfSuccessfulBlocks,
  });
  tableData.push({
    name: "% Successful Spikes",
    value: data.percentageOfSuccessfulSpikes,
  });

  return tableData;
}
