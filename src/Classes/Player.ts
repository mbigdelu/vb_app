export default class Player {
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
  }

  updateData(path: string, value: any) {
    this[path] = value;
  }

  addToHistory() {
    const currentState = { ...this };
    const timestamp = new Date();
    this.playerHistory.push({ state: currentState, timestamp });
  }
}
