import React, { useEffect, useState } from "react";
import { Collapse, ListGroup, ListGroupItem } from "react-bootstrap";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function GameDonePlayerTableGenerator(props) {
  const [tableData, setTableData] = useState({
    tableArray: props.data.Players,
    teamName: props.data.name,
  });

  const [isTableCollapsible, setIsTableCollapsible] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const [openStates, setOpenStates] = useState(
    tableData.tableArray.map(() => false)
  );

  useEffect(() => {
    if (window.innerWidth > 1200) {
      setIsTableCollapsible(false);
    } else setIsTableCollapsible(true);
  }, [window.innerWidth]);

  const toggleOpen = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  const onPlayerClick = (player) => {};

  if (isTableCollapsible) {
    return (
      <div className="container mt-4">
        <h2>{tableData.teamName}</h2>
        <ul className="list-group list-group-flush">
          <ListGroup variant="flush">
            {tableData.tableArray.map((player, index) => {
              return (
                <React.Fragment key={player._id}>
                  <ListGroupItem
                    onClick={() => toggleOpen(index)}
                    className="btn btn-link text-start"
                    aria-controls={`collapse-${player._id}`}
                    aria-expanded={openStates[index]}
                  >
                    <div className="row">
                      <div className="col-sm-8">{player.name}</div>
                      <div className="col-sm-4 text-end">
                        {openStates[index] ? (
                          <AiOutlineRight />
                        ) : (
                          <AiOutlineDown />
                        )}
                      </div>
                    </div>
                  </ListGroupItem>
                  <Collapse in={openStates[index]}>
                    <table className="table" id={`collapse-${player._id}`}>
                      <tbody>
                        <tr>
                          <th className="text-start">Spikes</th>
                          <td>{player.currentGameTotalNumberOfSpikes}</td>
                        </tr>
                        <tr>
                          <th className="text-start">Blocks</th>
                          <td>{player.currentGameTotalNumberOfBlocks}</td>
                        </tr>
                        <tr>
                          <th className="text-start">Ace Serves</th>
                          <td>{player.currentGameTotalNumberOfAceServes}</td>
                        </tr>
                        <tr>
                          <th className="text-start">Errors</th>
                          <td>{player.currentGameTotalNumberOfErrors}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Collapse>
                </React.Fragment>
              );
            })}
          </ListGroup>
        </ul>
      </div>
    );
  } else {
    return (
      <table className={`table   mb-0  ${props.bgColorClass}`}>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Spikes</th>
            <th>Blocks</th>
            <th>Ace Serves</th>
            <th>Errors</th>
          </tr>
          {tableData.tableArray.map((row) => {
            return (
              <tr key={row._id}>
                <td key={row._id} onClick={onPlayerClick.bind(null, row)}>
                  <li className=" list-group-item text-start   p-0">
                    <Link
                      className="text-decoration-none btn btn-link "
                      to={`/player-analyze/${row._id}`}
                    >
                      {row.name}
                    </Link>
                  </li>
                </td>
                <td>{row.currentGameTotalNumberOfSpikes}</td>
                <td>{row.currentGameTotalNumberOfBlocks}</td>
                <td>{row.currentGameTotalNumberOfAceServes}</td>
                <td>{row.currentGameTotalNumberOfErrors}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
