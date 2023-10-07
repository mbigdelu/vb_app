import Player from "./Player";
import Team from "./Team";

const { v4: uuidv4 } = require("uuid");

export default class Game {
  private _id: string;

  team1: Team;
  team2: Team;
  winner;
  Team;

  sets: [];
  team1NumberOfSets: number;
  team2NumberOfSets: number;
  mostValuablePlyer: Player | null;

  totalNumberOfSpikes: number;
  totalNumberOfAceServes: number;
  totalNumberOfBlocks: number;
  totalNumberOfTips: number;
  totalNumberOfErrors: number;

  constructor(team1, team2) {
    this.team1 = team1;
    this.team2 = team2;
    this.totalNumberOfAceServes = 0;
    this.totalNumberOfBlocks = 0;
    this.totalNumberOfErrors = 0;
    this.totalNumberOfSpikes = 0;
    this.team1NumberOfSets = 0;
    this.team2NumberOfSets = 0;
    this.sets = [];
    this.mostValuablePlyer = null;
  }

  calculateMostValuablePlayer() {
    let maxPoints = -1; // Initialize to a negative value
    let mostValuablePlayer = null;

    // Iterate through players in team 1
    for (const player of this.team1.Players) {
      if (player.currentGameOverallNumberOfPoints > maxPoints) {
        maxPoints = player.currentGameOverallNumberOfPoints;
        mostValuablePlayer = player;
      }
    }

    // Iterate through players in team 2 and compare with team 1
    for (const player of this.team2.Players) {
      if (player.currentGameOverallNumberOfPoints > maxPoints) {
        maxPoints = player.currentGameOverallNumberOfPoints;
        mostValuablePlayer = player;
      }
    }

    this.mostValuablePlayer = mostValuablePlayer; // Set the most valuable player
    return mostValuablePlayer;
  }
}
