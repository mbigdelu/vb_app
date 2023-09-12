import { useState, useEffect } from "react";

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

function PlayersChartDrawer(props) {
  const [state, setState] = useState(props.data);

  const chartData = state.chartData;

  useEffect(() => {
    setState(props.data);
  }, [props.data]);

  return (
    <LineChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 5,
        right: 10,
        left: 10,
        bottom: 5,
      }}
    >
      <XAxis dataKey="date" />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Legend />
      {state.spikeLine &&
        lineGenerator(
          "percentageOfSuccessfulSpikes",
          "#8884d8",
          "Successful Spikes"
        )}

      {state.serveLine &&
        lineGenerator("percentageOfAceServes", "#82ca9d", "Ace Serves")}

      {state.blockLine &&
        lineGenerator("percentageOfSuccessfulBlocks", "#fc5a03", "Blocks")}
      {state.overallLine &&
        lineGenerator("percentageOfOverall", "#03a1fc", "Overall")}
    </LineChart>
  );
}

function lineGenerator(dataKey, stroke, name) {
  return <Line type="monotone" dataKey={dataKey} stroke={stroke} name={name} />;
}

export default PlayersChartDrawer;
