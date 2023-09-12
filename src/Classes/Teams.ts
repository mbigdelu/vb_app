import Player from "./Player";

class Teams {
  name: string;
  coachName: string;
  Players: Array<typeof Player>;

  private numberOfTotalPoints: number;
  private numberOfTotalErrors: number;

  constructor(name, coachName, Players) {
    this.name = name;
    this.coachName = coachName;
    this.Players = Players;
  }
}

export default Teams;
