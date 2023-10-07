import React, { PureComponent, useState } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import CustomChartTooltip from "../Functions/CustomCahrtTooltip";

const COLORS = ["#5b38c9", "#e9b4ff", "#7b7485", "#2e869e", "#3fbea7"];

function teamTotalCalculator(playerList, heading) {
  let dataPath = `currentGameTotalNumberOf${heading}`;

  let total = 0;

  playerList.forEach((player) => {
    total += player[dataPath];
  });

  return total;
}

export default function TeamsPieChartDrawer(props) {
  const [chartData, setChartData] = useState([
    { name: "Spike", value: teamTotalCalculator(props.data.Players, "Spikes") },
    { name: "Block", value: teamTotalCalculator(props.data.Players, "Blocks") },
    {
      name: "Ace Serve",
      value: teamTotalCalculator(props.data.Players, "AceServes"),
    },
    { name: "Tip", value: teamTotalCalculator(props.data.Players, "Tips") },
    { name: "Error", value: teamTotalCalculator(props.data.Players, "Errors") },
  ]);
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip content={<CustomChartTooltip />} />
    </PieChart>
  );
}
