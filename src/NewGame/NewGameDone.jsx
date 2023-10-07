import { useRef, useState, useEffect } from "react";
import GameDonePlayerTableGenerator from "./GameDonePlayerTableGenerator";
import GameDoneChartDrawer from "./GameDoneChartDrower";
import TeamsPieChartDrawer from "./TeamsPieChartDrawer";
import GameDoneBarChartDrawer from "./GameDoneBarChartDrawer";
import TeamsTableGenerator from "./TeamsTableGenerator";
import { MotionAnimate } from "react-motion-animate";

const numberToWords = require("number-to-words");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function teamNameClassGenerator(team, winner) {
  let className = "fs-2 d-inline";

  if (team.name === winner.name) {
    className += " text-success";
  } else {
    className += " text-danger";
  }

  return className;
}

export default function NewGameDone(props) {
  const [state, setState] = useState({ gameObj: props.gameObj });

  return (
    <div className="container-xl">
      <div className="container-xl bg-prim my-5 p-5  rounded-5 inside-shadow">
        <div className=" row justify-content-md-center">
          <div className="col-md-4 mb5">
            <p
              className={teamNameClassGenerator(
                state.gameObj.team1,
                state.gameObj.winner
              )}
            >
              {state.gameObj.team1.name}
            </p>
          </div>
          <div className="col-md-4 mb-5 bg-primary text-white rounded-3">
            {" "}
            <p className="px-3 py-2  d-inline fs-2 ">
              {state.gameObj.team1NumberOfSets}
            </p>
            <p className="px-1  d-inline fs-2 ">-</p>
            <p className="px-3 py-2  d-inline fs-2 ">
              {state.gameObj.team2NumberOfSets}
            </p>
          </div>
          <div className="col-md-4 mb5">
            <p
              className={teamNameClassGenerator(
                state.gameObj.team2,
                state.gameObj.winner
              )}
            >
              {state.gameObj.team2.name}
            </p>
          </div>
        </div>
        <div className="row justify-content-md-center mb-5">
          {state.gameObj.sets.map((set, i) => {
            return (
              <div className="col-md-2">
                <p className="px-2 mx-4  fs-4">
                  {capitalizeFirstLetter(numberToWords.toOrdinal(i + 1))}
                  {"  "}
                  Set
                </p>
                <p className="px-1  d-inline fs-4">{set.teamOnePoints}</p>
                <p className="px-1  d-inline fs-4">-</p>
                <p className="px-1  d-inline fs-4">{set.teamTwoPoints}</p>
              </div>
            );
          })}
        </div>
        <div className="row justify-content-center mt-5 pt-3">
          <div className="col-md-4 text-start">
            <p className=" fs-4  text-secondary">MVB</p>
          </div>
          <div className="col-md-4 text-end">
            {" "}
            <p className=" fs-4  text-secondary">
              {state.gameObj.mostValuablePlayer.name}
            </p>
          </div>
        </div>
        <div className="row justify-content-center  pt-1">
          <div className="col-md-4 ">
            <p className=" fs-4  text-secondary text-start">Total Spikes</p>
          </div>
          <div className="col-md-4 ">
            {" "}
            <p className=" fs-4  text-secondary text-end">
              {state.gameObj.totalNumberOfSpikes}
            </p>
          </div>
        </div>
        <div className="row justify-content-center  pt-1">
          <div className="col-md-4 ">
            <p className=" fs-4  text-secondary text-start">Total Blocks</p>
          </div>
          <div className="col-md-4 ">
            {" "}
            <p className=" fs-4  text-secondary text-end">
              {state.gameObj.totalNumberOfBlocks}
            </p>
          </div>
        </div>
        <div className="row justify-content-center  pt-1">
          <div className="col-md-4 ">
            <p className=" fs-4  text-secondary text-start">Total Ace Serves</p>
          </div>
          <div className="col-md-4 ">
            {" "}
            <p className=" fs-4  text-secondary text-end">
              {state.gameObj.totalNumberOfAceServes}
            </p>
          </div>
        </div>
        <div className="row justify-content-center  pt-1">
          <div className="col-md-4 ">
            <p className=" fs-4  text-secondary text-start">Total Errors</p>
          </div>
          <div className="col-md-4 ">
            {" "}
            <p className=" fs-4  text-secondary text-end">
              {state.gameObj.totalNumberOfErrors}
            </p>
          </div>
        </div>

        <div className="row justify-content-around my-5 pt-3 shadow rounded-3 bg-white ">
          <div className="col-md-6 ">
            <GameDonePlayerTableGenerator data={state.gameObj.team1} />
          </div>
          <div className="col-md-6 ">
            <GameDonePlayerTableGenerator data={state.gameObj.team2} />
          </div>
        </div>
        <div className="row justify-content-around my-5 py-3 bg-light shadow rounded-3 ">
          <div className="col-md-6  ">
            <div className="d-inline-block ">
              <GameDoneChartDrawer data={state.gameObj} />
            </div>
          </div>
          <div className="col-md-6 align-self-end mt-5">
            <TeamsTableGenerator data={state.gameObj} />
          </div>
        </div>
        <div className="row justify-content-around my-5 py-3 bg-light shadow rounded-3 ">
          <div className="col-md-6  ">
            <div className="d-inline-block p-2 ">
              <h4 className="mb-5">Team One</h4>

              <TeamsPieChartDrawer data={state.gameObj.team1} />
            </div>
          </div>
          <div className="col-md-6  ">
            <div className="d-inline-block p-2">
              <h4 className="mb-5">Team Two</h4>

              <TeamsPieChartDrawer data={state.gameObj.team2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
