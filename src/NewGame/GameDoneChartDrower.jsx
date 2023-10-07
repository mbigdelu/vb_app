import { useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function playersAVGCalculator(playerList, heading) {
  let dataPath = `currentGameTotalNumberOf${heading}`;

  if (heading === "Overall") {
    dataPath = "currentGameOverallNumberOfPoints";
  }

  let avg = 0;
  let total = 0;

  playerList.forEach((player) => {
    total += player[dataPath];
  });

  avg = (total / playerList.length).toFixed(1);

  return total;
}

export default function GameDoneChartDrawer(props) {
  const [chartData, setChartData] = useState([
    {
      name: "Spike",
      team1: playersAVGCalculator(props.data.team1.Players, "Spikes"),
      team2: playersAVGCalculator(props.data.team2.Players, "Spikes"),
    },
    {
      name: "Blocks",
      team1: playersAVGCalculator(props.data.team1.Players, "Blocks"),
      team2: playersAVGCalculator(props.data.team2.Players, "Blocks"),
    },
    {
      name: "Ace Serves",
      team1: playersAVGCalculator(props.data.team1.Players, "AceServes"),
      team2: playersAVGCalculator(props.data.team2.Players, "AceServes"),
    },
    {
      name: "Tips",
      team1: playersAVGCalculator(props.data.team1.Players, "Tips"),
      team2: playersAVGCalculator(props.data.team2.Players, "Tips"),
    },
    {
      name: "Errors",
      team1: playersAVGCalculator(props.data.team1.Players, "Errors"),
      team2: playersAVGCalculator(props.data.team2.Players, "Errors"),
    },
  ]);

  return (
    <BarChart width={500} height={400} data={chartData}>
      <XAxis dataKey="name" />
      <YAxis domain={[0, 100]} hide />

      <Tooltip />
      <Legend />
      <Bar dataKey="team1" name={props.data.team1.name} fill="#8884d8" />
      <Bar dataKey="team2" name={props.data.team2.name} fill="#82ca9d" />
    </BarChart>
  );
}
