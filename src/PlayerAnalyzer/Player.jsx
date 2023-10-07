import PlayerSearch from "./PlayerSearch";
import { getPlayersList } from "./FakeDataService/FakePlayerDataFetch.js";
import { useEffect, useState } from "react";
import { BiSolidDownArrow, BiDownArrow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function Player(props) {
  const [playersList, setPlayersList] = useState(getPlayersList());
  const [clickedColumn, setClickedColumn] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    team: [],
    nationality: [],
    position: [],
    age: { min: 0, max: 100 },
    height: { min: 0, max: 350 },
  });

  const navigate = useNavigate();

  const handleCloseFilters = () => setShowFilters(false);
  const handleShowFilters = () => setShowFilters(true);

  function sortBy(path, direction) {
    let tempList = [...playersList];
    tempList.sort((a, b) => {
      if (a[path] < b[path]) {
        return -direction;
      }
      if (a[path] > b[path]) {
        return direction;
      }
      return 0;
    });

    setPlayersList(tempList);
  }

  function applyFilters() {
    let filteredPlayers = [...getPlayersList()];

    if (selectedFilters.team.length > 0) {
      filteredPlayers = filteredPlayers.filter((player) =>
        selectedFilters.team.includes(player.currentTeam)
      );
    }

    if (selectedFilters.nationality.length > 0) {
      filteredPlayers = filteredPlayers.filter((player) =>
        selectedFilters.nationality.includes(player.nation)
      );
    }
    if (selectedFilters.position.length > 0) {
      filteredPlayers = filteredPlayers.filter((player) =>
        selectedFilters.position.includes(player.position)
      );
    }
    if (selectedFilters.height.min > 0 || selectedFilters.height.max < 350) {
      filteredPlayers = filteredPlayers.filter(
        (player) =>
          player.height > selectedFilters.height.min &&
          player.height < selectedFilters.height.max
      );
    }
    if (selectedFilters.age.min > 0 || selectedFilters.age.max < 350) {
      filteredPlayers = filteredPlayers.filter(
        (player) =>
          player.age > selectedFilters.age.min &&
          player.age < selectedFilters.age.max
      );
    }

    setPlayersList(filteredPlayers);
  }

  useEffect(() => {
    applyFilters();
    setCurrentPage(1);
  }, [selectedFilters]);

  function onSelectFilter(path, name) {
    let tempSelectedFilters = { ...selectedFilters };

    if (tempSelectedFilters[path].includes(name)) {
      const index = tempSelectedFilters[path].indexOf(name);

      tempSelectedFilters[path].splice(index, 1);
    } else {
      tempSelectedFilters[path].push(name);
    }

    setSelectedFilters(tempSelectedFilters);
  }

  function handleSortClick(sortCol) {
    sortCol === clickedColumn ? sortBy(sortCol, -1) : sortBy(sortCol, 1);

    sortCol === clickedColumn
      ? setClickedColumn("")
      : setClickedColumn(sortCol);

    setCurrentPage(1);
  }

  function handlePlayerClick(player) {
    navigate(`/player-analyze/${player._id}`);
  }

  function handleRangeChange(e, path, boundary) {
    let value = e.target.value.replace(/\s/g, "");
    let tempSelectedFilters = { ...selectedFilters };

    tempSelectedFilters[path][boundary] = value.substring(0, 3);

    setSelectedFilters(tempSelectedFilters);
  }

  const totalPages = Math.ceil(playersList.length / playersPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = playersList.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );

  return (
    <div className="container mb-5">
      <div className="container  py-5">
        <p></p>
      </div>
      <PlayerSearch />

      <div className="container  py-5">
        <p></p>
      </div>
      <div
        className="container-sm rounded-5 shadow p-3 bg-prim p-5"
        id="players-table"
      >
        <div className="row mb-4">
          <div className="col d-flex">
            <Button
              variant="primary"
              onClick={handleShowFilters}
              className="me-2"
            >
              Filters
            </Button>
          </div>
          <div className="col d-flex justify-content-end">
            <Button variant="primary">Add</Button>
          </div>
        </div>
        <table class="table table-hover ">
          <thead>
            <tr>
              <th className="text-start" scope="col">
                Name {columnIconGenerator("name")}
              </th>
              <th scope="col">
                Team
                {columnIconGenerator("currentTeam")}
              </th>
              <th scope="col">
                Nation
                {columnIconGenerator("nation")}
              </th>
              <th scope="col">
                position
                {columnIconGenerator("position")}
              </th>
              <th scope="col">
                Height
                {columnIconGenerator("height")}
              </th>
              <th scope="col">
                Age
                {columnIconGenerator("age")}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPlayers.map((player) => {
              return (
                <tr
                  key={player._id}
                  id={player._id}
                  className="player-table-row "
                  onClick={() => handlePlayerClick(player)}
                >
                  <th className="text-start ">{player.name}</th>
                  <td>{player.currentTeam}</td>
                  <td>{player.nation}</td>
                  <td>{player.position}</td>
                  <td>{player.height}</td>
                  <td>{player.age}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="container p-3 mt-5">
          <nav aria-label="Page navigation example ">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <button
                  class="page-link"
                  aria-label="Previous"
                  onClick={() => setCurrentPage(pageNumbers[0])}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {pageNumbers.map((pageNumber) => (
                <li className="page-item">
                  <button
                    className={`page-link ${
                      currentPage === pageNumber ? "active" : ""
                    }`}
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                </li>
              ))}

              <li class="page-item">
                <button
                  class="page-link"
                  aria-label="Next"
                  onClick={() =>
                    setCurrentPage(pageNumbers[pageNumbers.length - 1])
                  }
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="container  py-5">
        <p></p>
      </div>
      <>
        <Offcanvas
          className="p-2"
          show={showFilters}
          onHide={handleCloseFilters}
          {...props}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="p-3 ">
              <h5 className=" bold mb-4">Filter By Team</h5>

              {getFilterItemList("currentTeam", "team")}
            </div>
            <div className="p-3">
              <h5 className=" bold mb-4">Filter By Nation</h5>
              {getFilterItemList("nation", "nationality")}
            </div>
            <div className="p-3">
              <h5 className=" bold mb-4">Filter By Position</h5>
              {getFilterItemList("position", "position")}
            </div>
            <div className="p-3">
              <h5 className=" bold mb-4">Filter By Height</h5>
              <div className="row px-3 ">
                <div class="col form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="minHeight"
                    placeholder="Min"
                    value={selectedFilters.height.min}
                    onChange={(e) => handleRangeChange(e, "height", "min")}
                  />
                  <label for="minHeight">Min</label>
                </div>
                <div class="col form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="maxHeight"
                    placeholder="Max"
                    value={selectedFilters.height.max}
                    onChange={(e) => handleRangeChange(e, "height", "max")}
                  />
                  <label for="maxHeight">Max</label>
                </div>
              </div>
            </div>
            <div className="p-3">
              <h5 className=" bold mb-4">Filter By Age</h5>
              <div className="row px-3 ">
                <div class="col form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="minAge"
                    placeholder="Min"
                    value={selectedFilters.age.min}
                    onChange={(e) => handleRangeChange(e, "age", "min")}
                  />
                  <label for="minAge">Min</label>
                </div>
                <div class="col form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="maxAge"
                    placeholder="Max"
                    value={selectedFilters.age.max}
                    onChange={(e) => handleRangeChange(e, "age", "max")}
                  />
                  <label for="maxAge">Max</label>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    </div>
  );

  function columnIconGenerator(column) {
    return clickedColumn === column ? (
      <BiSolidDownArrow
        cursor="pointer"
        onClick={() => handleSortClick(column)}
      />
    ) : (
      <BiDownArrow cursor="pointer" onClick={() => handleSortClick(column)} />
    );
  }

  function getFilterItemList(path, filterPath) {
    const players = [...getPlayersList()];

    const counts = {};

    for (const player of players) {
      const name = player[path];

      if (!counts[name]) {
        counts[name] = 1;
      } else {
        counts[name] += 1;
      }
    }

    const namesWithCounts = Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }));

    return namesWithCounts.map((item) => {
      return (
        <div class="form-check m-2 mx-4">
          <input
            class="form-check-input"
            type="checkbox"
            key={item.name}
            value={item.name}
            id={item.name.replace(/\s+/g, "")}
            onClick={() => onSelectFilter(filterPath, item.name)}
            checked={selectedFilters[filterPath].includes(item.name)}
          />
          <label class="form-check-label" for={item.name.replace(/\s+/g, "")}>
            {item.name}{" "}
            <span class="badge bg-primary rounded-pill mx-2">{item.count}</span>
          </label>
        </div>
      );
    });
  }
}
