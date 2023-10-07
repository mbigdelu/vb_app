import { NavLink } from "react-router-dom";
import "./App.css";
import { BsSearch } from "react-icons/bs";
import SearchAutoComplete from "./PlayerAnalyzer/SearchAutoComplete";
import { useEffect, useState } from "react";
import { getPlayersList } from "./PlayerAnalyzer/FakeDataService/FakePlayerDataFetch.js";
import Pagination from "react-bootstrap/Pagination";

function Test(props) {
  const playersList = [
    { name: "mohammad Bigdelu", number: 3 },
    { name: "ehsan sabettash", number: 8 },
  ];

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
  return (
    <section className="container shadow  rounded-5 mt-5  p-5 mb-5 bg-prim ">
      <div className=" pb-3 row gx-0 justify-content-evenly">
        <div className="col-md-4 ">
          <h4 className="  my-5  ">First Team Information</h4>
          <div className="row mt-3 mb-5">
            <input
              type="text"
              className="form-control shadow"
              id="TeamOnaNameInput"
              placeholder="First Team Name"
              data-path="firstTeamInfo.teamName"
              // onChange={handleInputChange}
            />
          </div>

          <div className="row  mt-5 mb-4">
            <div className="col-sm-6 px-1 mt-2  px-0">
              <input
                type="text"
                className="form-control shadow"
                id="TeamOnaPlayersNameInput"
                placeholder="Player Name"
                data-path="firstTeamInfo.players"
                // onChange={handleInputChange}
              />
            </div>
            <div className="col-sm-6 px-1 mt-2 px-0">
              <input
                type="text"
                className="form-control shadow"
                id="TeamOnaPlayersNumberInput"
                placeholder="Player Number"
                data-path="firstTeamInfo.players"
                // onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row  mt-3">
            <button className="btn btn-outline-secondary ">Add</button>
          </div>
          <div className="row mt-5 pt-3">
            {PlayersNameListGenerator(playersList)}
          </div>
        </div>
        <div className="col-md-4 ">
          <h4 className="  my-5  ">First Team Information</h4>
          <div className="row mt-3 mb-5">
            <input
              type="text"
              className="form-control shadow"
              id="TeamOnaNameInput"
              placeholder="First Team Name"
              data-path="firstTeamInfo.teamName"
              // onChange={handleInputChange}
            />
          </div>

          <div className="row  mt-5 mb-4">
            <div className="col-sm-6 px-1 mt-2  px-0">
              <input
                type="text"
                className="form-control shadow"
                id="TeamOnaPlayersNameInput"
                placeholder="Player Name"
                data-path="firstTeamInfo.players"
                // onChange={handleInputChange}
              />
            </div>
            <div className="col-sm-6 px-1 mt-2 px-0">
              <input
                type="text"
                className="form-control shadow"
                id="TeamOnaPlayersNumberInput"
                placeholder="Player Number"
                data-path="firstTeamInfo.players"
                // onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row  mt-3">
            <button className="btn btn-outline-secondary ">Add</button>
          </div>
          <div className="row mt-5 pt-3 ">
            {PlayersNameListGenerator(playersList)}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-info btn-lg px-5 mt-5">Next</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Test;
