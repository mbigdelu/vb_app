import Teams from "../Classes/Teams.ts";
import Player from "../Classes/Player.ts";

export default function teamsToObject(teamInfo) {
  const teamPlayers = [
    new Player(teamInfo.playerOneName, 1),
    new Player(teamInfo.playerTwoName, 2),
    new Player(teamInfo.playerThreeName, 3),
    new Player(teamInfo.playerFourName, 4),
    new Player(teamInfo.playerFiveName, 5),
    new Player(teamInfo.playerSixName, 6),
  ];

  const team = new Teams(teamInfo.teamName, "", teamPlayers);


  return team;
}
