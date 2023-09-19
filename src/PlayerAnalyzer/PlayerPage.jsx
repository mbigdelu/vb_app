import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getPlayersList,
  setPlayersList,
  getPlayer,
} from "../PlayerAnalyzer/FakeDataService/FakePlayerDataFetch";
import PlayersChartSection from "./PlayersChartSection";
import image from "../Images/image.jpg";
import TableGenerator from "./TableGenerator";

export default function PlayerPage() {
  const [state, setState] = useState({ playerData: getPlayer() });

  console.log(state.playerData);

  return (
    <div className="container container-sm">
      <div class="container mt-5 pt-3  px-5">
        <div class="row ">
          <div class="col-md-6 mb-0">
            <div>
              <p className="fs-2 text-start">Mohammad Bigdelu</p>
              <p className="fs-4 text-start mb-0">{state.playerData.nation}</p>
              <p className="fs-4 text-start mb-0">{state.playerData.age}</p>
              <p className="fs-4 text-start">{state.playerData.position}</p>
            </div>
          </div>
          <div class="col-md-6 mb-5">
            <div className="container w-50">
              <img
                src={image}
                class="rounded-circle mx-auto d-block img-fluid"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div>
              <TableGenerator data={tableDataGenerator(state.playerData)} />
            </div>
          </div>
          <div class="col-md-6">
            <div>
              <PlayersChartSection
                data={chartDataGenerator(state.playerData)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h2>Players Extra Information section</h2>
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
