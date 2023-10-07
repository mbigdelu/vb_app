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

  const [sizes, setSizes] = useState({ width: 500, height: 300 });

  useEffect(() => {
    if (window.innerWidth > 534) {
      setSizes({ width: 500, height: 300 });
    }
    if (window.innerWidth < 534) {
      setSizes({ width: 400, height: 240 });
    }

    if (window.innerWidth < 434) {
      setSizes({ width: 300, height: 180 });
    }
  }, [window.innerWidth]);

  useEffect(() => {
    setState(props.data);
  }, [props.data]);

  return (
    <LineChart width={sizes.width} height={sizes.height} data={chartData}>
      <XAxis dataKey="date" />
      {/* <YAxis domain={[0, 100]} /> */}
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
