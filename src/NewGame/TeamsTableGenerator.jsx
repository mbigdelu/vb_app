import { useState } from "react";

function teamAVGCalculator(playersList, dataPath, toFixed) {
  let total = 0;
  let avg = 0;

  playersList.forEach((player) => {
    total += player[dataPath];
  });

  avg = (total / playersList.length).toFixed(toFixed);

  return avg;
}

export default function TeamsTableGenerator(props) {
  const [tableData, setTableData] = useState(props.data);

  return (
    <table class="table table-borderless mb-5">
      <thead>
        <tr>
          <th></th>
          <th scope="col">{tableData.team1.name}</th>
          <th scope="col">{tableData.team2.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="my-3">
          <th className="text-start" scope="row">
            Coach
          </th>
          <td>{tableData.team1.coach}</td>
          <td>{tableData.team2.coach}</td>
        </tr>
        <tr>
          <th className="text-start" scope="row">
            AVG Age
          </th>
          <td>{teamAVGCalculator(tableData.team1.Players, "age", 1)}</td>
          <td>{teamAVGCalculator(tableData.team2.Players, "age", 1)}</td>
        </tr>
        <tr>
          <th className="text-start" scope="row">
            AVG Height
          </th>
          <td>{teamAVGCalculator(tableData.team1.Players, "height", 0)}</td>
          <td>{teamAVGCalculator(tableData.team2.Players, "height", 0)}</td>
        </tr>
        <tr>
          <th className="text-start" scope="row">
            AVG Jump
          </th>
          <td>{teamAVGCalculator(tableData.team1.Players, "jump", 0)}</td>
          <td>{teamAVGCalculator(tableData.team2.Players, "jump", 0)}</td>
        </tr>
        <tr>
          <th className="text-start" scope="row">
            AVG Block Jump
          </th>
          <td>{teamAVGCalculator(tableData.team1.Players, "blockJump", 0)}</td>
          <td>{teamAVGCalculator(tableData.team2.Players, "blockJump", 0)}</td>
        </tr>
        <tr>
          <th className="text-start" scope="row">
            AVG Reach
          </th>
          <td>
            {teamAVGCalculator(tableData.team1.Players, "highestReach", 0)}
          </td>
          <td>
            {teamAVGCalculator(tableData.team2.Players, "highestReach", 0)}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
