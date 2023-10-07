import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Height", value: 10, amount: 50 },
  { name: "Category B", value: 15, amount: 50 },
  { name: "Category C", value: 8, amount: 50 },
  { name: "Category D", value: 20, amount: 50 },
];

function teamAVGCalculator(playersList, dataPath, toFixed) {
  let total = 0;
  let avg = 0;

  playersList.forEach((player) => {
    total += player[dataPath];
  });

  avg = (total / playersList.length).toFixed(toFixed);

  return avg;
}

const GameDoneBarChartDrawer = (props) => {
  const data = props.data;
  const [chartData, setChartData] = useState([
    {
      name: "Avg Age",
      team1: teamAVGCalculator(data.team1.Players, "age", 1),
      team2: teamAVGCalculator(data.team2.Players, "age", 1),
    },
    {
      name: "Avg Height",
      team1: teamAVGCalculator(data.team1.Players, "height", 0),
      team2: teamAVGCalculator(data.team2.Players, "height", 0),
    },
    {
      name: "Avg Height",
      team1: teamAVGCalculator(data.team1.Players, "height", 0),
      team2: teamAVGCalculator(data.team2.Players, "height", 0),
    },
    {
      name: "Avg Height",
      team1: teamAVGCalculator(data.team1.Players, "height", 0),
      team2: teamAVGCalculator(data.team2.Players, "height", 0),
    },
    {
      name: "Avg Height",
      team1: teamAVGCalculator(data.team1.Players, "height", 0),
      team2: teamAVGCalculator(data.team2.Players, "height", 0),
    },
  ]);

  return (
    <BarChart width={400} height={300} data={chartData} layout="vertical">
      <XAxis type="number" hide domain={[0, 300]} />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="team1" label={data.team1.name} fill="#8884d8" />
      <Bar dataKey="team2" label={data.team2.name} fill="#000000" />
    </BarChart>
  );
};

export default GameDoneBarChartDrawer;
