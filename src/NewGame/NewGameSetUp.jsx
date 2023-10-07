import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../CSS/NewGameSetUp.css";
import { Link } from "react-router-dom";

import ToastMaker from "../Functions/ToastMaker";

function NewGameSetUp(props) {
  const [formData, setFormData] = useState({
    numberOfPoints: 0,
    numberOfSets: 0,
    isFormReadyForSubmit: false,
    addPlayersNeedsError: false,
    submitFormNeedsError: false,
    tooManyPlayersError: false,
    submitFormErrorText: "",
    firstTeamInfo: {
      teamName: "",
      currentPlayerName: "",

      currentPlayerNumber: null,
      players: [],
    },
    secondTeamInfo: {
      teamName: "",
      currentPlayerName: "",

      currentPlayerNumber: null,
      players: [],
    },
  });
  const alertText =
    "The number should be between 0 and 99 and the name should be at least one character";

  function handleErrorClose(path) {
    let tempFormData = { ...formData };

    tempFormData[path] = false;

    setFormData(tempFormData);
  }

  useEffect(() => {
    let ready = false;
    let tempFormData = { ...formData };

    if (
      tempFormData.firstTeamInfo.teamName.length > 3 &&
      tempFormData.secondTeamInfo.teamName.length > 3 &&
      tempFormData.firstTeamInfo.players.length === 6 &&
      tempFormData.secondTeamInfo.players.length === 6 &&
      formData.numberOfPoints &&
      formData.numberOfSets &&
      Number(formData.numberOfPoints)
    ) {
      ready = true;
    }

    tempFormData.isFormReadyForSubmit = ready;

    setFormData(tempFormData);
  }, [
    formData.firstTeamInfo.teamName,
    formData.secondTeamInfo.teamName,
    formData.firstTeamInfo.currentPlayerName,
    formData.firstTeamInfo.currentPlayerNumber,
    formData.secondTeamInfo.currentPlayerName,
    formData.secondTeamInfo.currentPlayerNumber,
    formData.numberOfPoints,
    formData.numberOfSets,
  ]);

  function handleAddPlayerClick(teamPath) {
    let tempFormData = { ...formData };
    let playerObj = {};

    switch (teamPath) {
      case "firstTeam":
        if (
          tempFormData.firstTeamInfo.currentPlayerName.length < 1 ||
          !Number(tempFormData.firstTeamInfo.currentPlayerNumber) ||
          String(tempFormData.firstTeamInfo.currentPlayerNumber).length > 2
        ) {
          tempFormData.addPlayersNeedsError = true;
          break;
        } else {
          playerObj = {
            name: formData.firstTeamInfo.currentPlayerName,
            number: Number(formData.firstTeamInfo.currentPlayerNumber),
          };
          tempFormData.firstTeamInfo.currentPlayerName = "";
          tempFormData.firstTeamInfo.currentPlayerNumber = "";
          if (tempFormData.firstTeamInfo.players.length < 6) {
            tempFormData.firstTeamInfo.players.push(playerObj);
          } else {
            tempFormData.tooManyPlayersError = true;
          }
          break;
        }

      case "secondTeam":
        if (
          tempFormData.secondTeamInfo.currentPlayerName.length < 1 ||
          !Number(tempFormData.secondTeamInfo.currentPlayerNumber) ||
          String(tempFormData.secondTeamInfo.currentPlayerNumber).length > 2
        ) {
          tempFormData.addPlayersNeedsError = true;
          break;
        } else {
          playerObj = {
            name: formData.secondTeamInfo.currentPlayerName,
            number: Number(formData.secondTeamInfo.currentPlayerNumber),
          };
          tempFormData.secondTeamInfo.currentPlayerName = "";
          tempFormData.secondTeamInfo.currentPlayerNumber = "";
          if (tempFormData.secondTeamInfo.players.length < 6) {
            tempFormData.secondTeamInfo.players.push(playerObj);
          } else {
            tempFormData.tooManyPlayersError = true;
          }
          break;
        }

      default:
        break;
    }

    setFormData(tempFormData);
  }

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
    let tempFormData = { ...formData };
    if (
      formData.firstTeamInfo.teamName.length < 3 ||
      formData.secondTeamInfo.teamName.length < 3
    ) {
      tempFormData.submitFormNeedsError = true;
      tempFormData.submitFormErrorText = "Both Teams should have Proper Names";

      setFormData(tempFormData);
    }
    if (
      formData.firstTeamInfo.players.length < 6 ||
      formData.secondTeamInfo.players.length < 6
    ) {
      tempFormData.submitFormNeedsError = true;
      tempFormData.submitFormErrorText = "Both Teams should have Six Players";

      setFormData(tempFormData);
    }

    if (
      formData.numberOfPoints ||
      formData.numberOfSets ||
      !Number(formData.numberOfPoints)
    ) {
      tempFormData.submitFormNeedsError = true;
      tempFormData.submitFormErrorText =
        "Number of Sets and Points Cannot be empty";

      setFormData(tempFormData);
    } else {
      props.changeState(formData);
    }
  }

  return (
    <div className="container container-md  p-5 shadow  bg-prim rounded-5 mt-5">
      <h1 className="text-prim my-5 text-secondary">Match Setup</h1>
      {/* Sets and Points details */}
      <div className="row mt-3 mb-4 pt-3 justify-content-evenly">
        {/* Sets Select Section */}
        <div className="col-sm-4 mt-2 ">
          <select
            class="form-select shadow"
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
        <div className="col-sm-4 mt-2">
          <div class="mb-3 row">
            <div class="col">
              <input
                type="Number shadow"
                class="form-control shadow"
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

      <section className="container   rounded-5 mt-5  p-5 mb-5 bg-prim position-relative">
        {formData.addPlayersNeedsError && (
          <ToastMaker
            show={formData.addPlayersNeedsError}
            text={alertText}
            errorClose={handleErrorClose}
            position="top-start"
            closePath="addPlayersNeedsError"
          />
        )}
        {formData.submitFormNeedsError && (
          <ToastMaker
            show={formData.submitFormNeedsError}
            text={formData.submitFormErrorText}
            errorClose={handleErrorClose}
            closePath="submitFormNeedsError"
            position="bottom-center"
            timer={15000}
          />
        )}
        {formData.tooManyPlayersError && (
          <ToastMaker
            show={formData.tooManyPlayersError}
            text="Each Team Should Only Have Six Players"
            errorClose={handleErrorClose}
            closePath="tooManyPlayersError"
            position="top-left"
            timer={8000}
          />
        )}

        <div className=" pb-3 row gx-0 justify-content-evenly">
          <div className="col-md-4 ">
            <h4 className="  my-5  ">
              {formData.firstTeamInfo.teamName
                ? formData.firstTeamInfo.teamName
                : "First Team Information"}
            </h4>
            <div className="row mt-3 mb-5">
              <input
                type="text"
                className="form-control shadow"
                id="TeamOnaNameInput"
                placeholder="First Team Name"
                data-path="firstTeamInfo.teamName"
                onChange={handleInputChange}
              />
            </div>

            <div className="row  mt-5 mb-4">
              <div className="col-sm-8 px-1 mt-2  px-0">
                <input
                  type="text"
                  className="form-control shadow"
                  id="TeamOnaPlayersNameInput"
                  placeholder="Player Name"
                  data-path="firstTeamInfo.currentPlayerName"
                  value={formData.firstTeamInfo.currentPlayerName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-4 px-1 mt-2 px-0">
                <input
                  type="text"
                  className="form-control shadow"
                  id="TeamOnaPlayersNumberInput"
                  placeholder="Number"
                  data-path="firstTeamInfo.currentPlayerNumber"
                  value={formData.firstTeamInfo.currentPlayerNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row  mt-3 ">
              <button
                onClick={() => handleAddPlayerClick("firstTeam")}
                className="btn btn-outline-info  "
              >
                Add
              </button>
            </div>
            <div className="row mt-5 pt-3">
              {PlayersNameListGenerator(formData.firstTeamInfo.players)}
            </div>
          </div>
          {/* Second Team Info */}
          <div className="col-md-4 ">
            <h4 className="  my-5  ">
              {formData.secondTeamInfo.teamName
                ? formData.secondTeamInfo.teamName
                : "Second Team Information"}
            </h4>
            <div className="row mt-3 mb-5">
              <input
                type="text"
                className="form-control shadow"
                id="TeamTwoNameInput"
                placeholder="Second Team Name"
                data-path="secondTeamInfo.teamName"
                onChange={handleInputChange}
              />
            </div>

            <div className="row  mt-5 mb-4">
              <div className="col-sm-8 px-1 mt-2  px-0">
                <input
                  type="text"
                  className="form-control shadow"
                  id="TeamTwoPlayersNameInput"
                  placeholder="Player Name"
                  data-path="secondTeamInfo.currentPlayerName"
                  value={formData.secondTeamInfo.currentPlayerName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-4 px-1 mt-2 px-0">
                <input
                  type="text"
                  className="form-control shadow"
                  id="TeamTwoPlayersNumberInput"
                  placeholder="Number"
                  data-path="secondTeamInfo.currentPlayerNumber"
                  value={formData.secondTeamInfo.currentPlayerNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row  mt-3">
              <button
                onClick={() => handleAddPlayerClick("secondTeam")}
                className="btn btn-outline-info "
              >
                Add
              </button>
            </div>
            <div className="row mt-5 pt-3 ">
              {PlayersNameListGenerator(formData.secondTeamInfo.players)}
            </div>
          </div>
        </div>
      </section>

      {/* Next Step BTN Section */}

      <Link
        to={formData.isFormReadyForSubmit ? "/new-game/run" : null}
        className="text-decoration-none "
      >
        <div class="d-grid gap-2 col-6 mx-auto my-5 ">
          <button
            class="btn btn-outline-secondary  shadow"
            type="button"
            onClick={handleClick}
          >
            Next Step
          </button>
        </div>
      </Link>
      <div className="container  py-5">
        <p></p>
      </div>
    </div>
  );
}

function PlayersNameListGenerator(playersList) {
  let jsx = [];

  for (let i = 0; i < 6; i++) {
    if (playersList[i]) {
      jsx.push(
        <p className="visible ">
          {playersList[i].name}
          <span class=" ms-5 badge bg-secondary rounded-pill ">
            {playersList[i].number}
          </span>
        </p>
      );
    } else {
      jsx.push(
        <p className="invisible ">
          .<span class=" ms-5 badge bg-secondary rounded-pill ">.</span>
        </p>
      );
    }
  }
  return jsx;
}

export default NewGameSetUp;
