import { useState } from "react";
import PlayersChartDrawer from "./PlayersChartDrawer";

function PlayersChartSection(props) {
  const [chartData, setChartData] = useState({
    chartData: props.data,
    overallLine: true,
    spikeLine: false,
    serveLine: false,
    blockLine: false,
  });

  function handleRadioGroupChange(dataPath) {
    setChartData((prevState) => ({
      ...prevState,
      [dataPath]: !prevState[dataPath],
    }));
  }

  return (
    <div className="">
      <div className="row justify-content-md-center py-4 my-3">
        <div className="col-">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            <input
              type="checkbox"
              className="btn-check"
              id="btnCheckOverall"
              autoComplete="off"
              onChange={() => handleRadioGroupChange("overallLine")}
              checked={chartData.overallLine}
            />
            <label class="btn btn-outline-primary" for="btnCheckOverall">
              Overall
            </label>
            <input
              type="checkbox"
              class="btn-check"
              id="btnCheckSpike"
              autocomplete="off"
              onChange={() => handleRadioGroupChange("spikeLine")}
              checked={chartData.spikeLine}
            />
            <label class="btn btn-outline-primary" for="btnCheckSpike">
              Spikes
            </label>
            <input
              type="checkbox"
              class="btn-check"
              id="btnCheckServes"
              autocomplete="off"
              onChange={() => handleRadioGroupChange("serveLine")}
              checked={chartData.serveLine}
            />
            <label class="btn btn-outline-primary" for="btnCheckServes">
              Serves
            </label>
            <input
              type="checkbox"
              class="btn-check"
              id="btnCheckBlocks"
              autocomplete="off"
              onChange={() => handleRadioGroupChange("blockLine")}
              checked={chartData.blockLine}
            />
            <label class="btn btn-outline-primary" for="btnCheckBlocks">
              Blocks
            </label>
          </div>
        </div>
      </div>
      <div className="row justify-content-md-center ">
        <div className="col-md-auto">
          <PlayersChartDrawer data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default PlayersChartSection;
