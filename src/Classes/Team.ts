import Player from "./Player";

const { v4: uuidv4 } = require("uuid");

export default class Team {
  private _id: string;

  name: string;
  coachName: string;
  Players: Array<typeof Player>;

  private numberOfTotalPoints: number;
  private numberOfTotalErrors: number;

  constructor(name, Players) {
    this._id = uuidv4();
    this.name = name;
    this.Players = Players;
    this.coachName = "coach";
  }
}
