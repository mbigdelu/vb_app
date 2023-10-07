import { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function PlayersExtraInfoTableGenerator(props) {
  const playerHistoryList = props.data.playerHistory;

  const [tableData, setTableData] = useState(
    [...playerHistoryList].slice(-6).sort((a, b) => {
      const dateA = new Date(`01 ${a.timestamp}`);
      const dateB = new Date(`01 ${b.timestamp}`);
      return dateA - dateB;
    })
  );
  const [showFilters, setShowFilters] = useState(false);

  const handleCloseFilters = () => setShowFilters(false);
  const handleShowFilters = () => setShowFilters(true);

  function onSelectFilter(item) {
    let tempTableData = [...tableData];

    if (tempTableData.includes(item)) {
      const index = tempTableData.indexOf(item);

      tempTableData.splice(index, 1);
    } else {
      tempTableData.push(item);
    }

    tempTableData.sort((a, b) => {
      const dateA = new Date(`01 ${a.timestamp}`);
      const dateB = new Date(`01 ${b.timestamp}`);
      return dateA - dateB;
    });

    setTableData(tempTableData);
  }

  return (
    <>
      <table className="table ">
        <thead className="table-light">
          <tr>
            <th>Success Rate</th>
            {tableData.map((item) => {
              let date = item.timestamp;
              return <th key={item.timestamp}>{date}</th>;
            })}
            <th>
              <FiFilter cursor="pointer" onClick={handleShowFilters} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Overall</th>
            {tableData.map((item) => {
              let data = item.state;
              return (
                <td key={item.state.id + item.timestamp}>
                  {data.percentageOfOverall}
                </td>
              );
            })}
          </tr>
          <tr>
            <th>Spike</th>
            {tableData.map((item) => {
              let data = item.state;
              return (
                <td key={item.state.id + item.timestamp}>
                  {data.percentageOfSuccessfulSpikes}
                </td>
              );
            })}
          </tr>
          <tr>
            <th>Block</th>
            {tableData.map((item) => {
              let data = item.state;
              return (
                <td key={item.state.id + item.timestamp}>
                  {data.percentageOfSuccessfulBlocks}
                </td>
              );
            })}
          </tr>
          <tr>
            <th>Ace Serves</th>
            {tableData.map((item) => {
              let data = item.state;
              return (
                <td key={item.state.id + item.timestamp}>
                  {data.percentageOfAceServes}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <Offcanvas
        className="p-2"
        show={showFilters}
        onHide={handleCloseFilters}
        {...props}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter By Month</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {playerHistoryList.map((item) => {
            return (
              <div class="form-check m-2 mx-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  key={item.timestamp}
                  value={item.timestamp}
                  id={item.timestamp.replace(/\s+/g, "")}
                  onClick={() => onSelectFilter(item)}
                  checked={tableData.includes(item)}
                />
                <label
                  class="form-check-label"
                  for={item.timestamp.replace(/\s+/g, "")}
                >
                  {item.timestamp}{" "}
                </label>
              </div>
            );
          })}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
