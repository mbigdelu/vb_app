const { v4: uuidv4 } = require("uuid");

export default class Player {
  private _id: string;

  name: String;
  number: number;
  age: number;
  nation: String;
  position: String;
  picture: String;

  currentTeam: String;
  currentCoach: String;
  height: number;
  weight: number;
  highestReach: number;
  blockJump: number;
  spikeJump: number;

  currentGameTotalNumberOfSpikes: number;
  currentGameTotalNumberOfBlocks: number;
  currentGameTotalNumberOfAceServes: number;
  currentGameTotalNumberOfErrors: number;
  currentGameTotalNumberOfPoints: number;
  currentGameOverallNumberOfPoints: number;
  currentGameTotalNumberOfTips: number;

  private numberOfAceServes: number;
  private numberOfAttemptToBlocks: number;
  private numberOfBeingBlocks: number;
  private numberOfBlocks: number;
  private numberOfErrors: number;
  private numberOfReceivedSpikes: number;
  private numberOfServes: number;
  private numberOfSpikes: number;
  private numberOfSuccessfulReceives: number;
  private numberOfSuccessfulSpikes: number;
  private numberOfUnSuccessfulReceives: number;
  private numberOfUnSuccessfulServes: number;

  private numberOfSetsPlayed: number;
  private numberOfGamesPlayed: number;

  private percentageOfSuccessfulBlocks: number;
  private percentageOfSuccessfulSpikes: number;
  private percentageOfAceServes: number;
  private percentageOfPassedSpikes: number;
  private percentageOfPassedServes: number;
  private percentageOfOverall: number;

  private playerHistory: Array<{ state: Player; timestamp: Date }> = [];

  constructor(name, number) {
    this.name = name;
    this.number = number;
    // this._id = uuidv4();

    this.currentGameTotalNumberOfSpikes = 0;
    this.currentGameTotalNumberOfBlocks = 0;
    this.currentGameTotalNumberOfTips = 0;
    this.currentGameTotalNumberOfAceServes = 0;
    this.currentGameTotalNumberOfErrors = 0;
    this.currentGameTotalNumberOfPoints = 0;
    this.currentGameOverallNumberOfPoints = 0;
  }

  updateData(path: string, value: any) {
    this[path] = value;
  }

  addToHistory() {
    const currentState = { ...this };
    const timestamp = new Date();
    this.playerHistory.push({ state: currentState, timestamp });
  }

  toJSON() {
    return {
      ...this,
      playerHistory: this.playerHistory.map((entry) => ({
        state: { ...entry.state },
        timestamp: entry.timestamp,
      })),
    };
  }
}
