import Team from "../Classes/Team.ts";
import Player from "../Classes/Player.ts";

export default function teamsToObject(teamInfo) {
  const teamPlayers = [];

  for (let player in teamInfo.players) {
    teamPlayers.push(new Player(player.name, player.number));
  }

  const team = new Team(teamInfo.teamName, teamPlayers);

  return team;
}
