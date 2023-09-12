import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../CSS/NewGameSetUp.css";
import { Link } from "react-router-dom";

const data = {};

function NewGameSetUp(props) {
  const [formData, setFormData] = useState({
    numberOfPoints: 0,
    numberOfSets: 0,
    firstTeamInfo: {
      teamName: "",
      playerOneName: "",
      playerTwoName: "",
      playerThreeName: "",
      playerFourName: "",
      playerFiveName: "",
      playerSixName: "",
    },
    secondTeamInfo: {
      teamName: "",
      playerOneName: "",
      playerTwoName: "",
      playerThreeName: "",
      playerFourName: "",
      playerFiveName: "",
      playerSixName: "",
    },
  });

  function handleInputChange(e) {
    const path = e.target.dataset.path;
    const value = e.target.value;
    const parts = path.split(".");
    let updatedFormData = { ...formData };

    let nestedProperty = updatedFormData;
    for (let i = 0; i < parts.length - 1; i++) {
      nestedProperty = nestedProperty[parts[i]];
    }

    nestedProperty[parts[parts.length - 1]] = value;

    setFormData(updatedFormData);
  }

  function handelSelectChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      numberOfSets: e.target.value,
    }));
  }

  function handleClick() {
    props.changeState(formData);
  }

  const PlayerInputs = (team, prefix, playersList) => {
    const players = playersList;

    return players.map((player, index) => {
      <div class="col" key={index}>
        <input
          type="text"
          class="form-control"
          id="Team${team}Player${player}Input"
          placeholder="Player ${player} Name"
          data-path="${firstTeamInfo}.player${player}Name"
          onChange={handleInputChange}
        />
      </div>;
    });
  };

  return (
    <div className="container container-md">
      {/* Sets and Points details */}
      <div className="row my-5 justify-content-md-center">
        {/* Sets Select Section */}
        <div className="col">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handelSelectChange}
          >
            <option selected>Select the Number of Sets</option>
            <option value="1">1 Sets</option>
            <option value="2">2 Sets out of 3 Sets</option>
            <option value="3">3 Sets out of 5 Sets</option>
          </select>
        </div>
        {/* Point Input Section  */}
        <div className="col">
          <div class="mb-3 row">
            <div class="col">
              <input
                type="Number"
                class="form-control"
                id="PointNumber"
                placeholder="Number of Points in Each Set"
                data-path="numberOfPoints"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team One Form */}

      <h3 className="mb-5">First Team Information</h3>

      <div className="container">
        <div class="mb-3 row justify-content-md-center">
          <div class="col">
            <input
              type="text"
              class="form-control"
              id="TeamOneInput"
              placeholder="First Team Name"
              data-path="firstTeamInfo.teamName"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          {PlayerInputs("One", "firstTeamInfo", ["One", "Two"])}
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="TeamOnaPlayerOneInput"
              placeholder="Player One Name"
              data-path="firstTeamInfo.playerOneName"
              onChange={handleInputChange}
            />
          </div>

          <div className="col">
            <input
              type="text"
              className="form-control"
              id="TeamOnaPlayerTwoInput"
              placeholder="Player Two Name"
              data-path="firstTeamInfo.playerTwoName"
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="TeamOnaPlayerThreeInput"
              placeholder="Player Three Name"
              data-path="firstTeamInfo.playerThreeName"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="TeamOnaPlayerFourInput"
              placeholder="Player Four Name"
              data-path="firstTeamInfo.playerFourName"
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="TeamOnaPlayerFiveInput"
              placeholder="Player Five Name"
              data-path="firstTeamInfo.playerFiveName"
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="TeamOnaPlayerSixInput"
              placeholder="Player Six Name"
              data-path="firstTeamInfo.playerSixName"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <h3 className="mb-3 mt-5">Second Team Information</h3>

      <div className="container">
        <div class="mb-3 row justify-content-md-center">
          <div class="col">
            <input
              type="text"
              class="form-control"
              id="TeamTwoInput"
              placeholder="Second Team Name"
              data-path="secondTeamInfo.teamName"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="TeamOnaPlayerOneInput"
              placeholder="Player One Name"
              data-path="secondTeamInfo.playerOneName"
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="TeamOnaPlayerTwoInput"
              placeholder="Player Two Name"
              data-path="secondTeamInfo.playerTwoName"
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="TeamOnaPlayerThreeInput"
              placeholder="Player Three Name"
              data-path="secondTeamInfo.playerThreeName"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="TeamOnaPlayerFourInput"
              placeholder="Player Four Name"
              data-path="secondTeamInfo.playerFourName"
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="TeamOnaPlayerFiveInput"
              placeholder="Player Five Name"
              data-path="secondTeamInfo.playerFiveName"
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="TeamOnaPlayerSixInput"
              placeholder="Player Six Name"
              data-path="secondTeamInfo.playerSixName"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Next Step BTN Section */}

      <Link to={{ pathname: "/new-game/run", state: data }}>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn btn-primary" type="button" onClick={handleClick}>
            Next Step
          </button>
        </div>
      </Link>
    </div>
  );
}

export default NewGameSetUp;
