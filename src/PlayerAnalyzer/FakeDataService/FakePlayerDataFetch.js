import Player from "../../Classes/Player.ts";
let playersList = [];

function arrayCreator() {
  const maxPercentage = 90;
  const minPercentage = 40;
  for (let i = 1; i <= 10; i++) {
    const player = new Player(`Player ${i}`, i);

    // Fill all variables with sample data
    player.age = Math.floor(Math.random() * 10 + 20); // Random age between 20 and 29
    player.nation = ["USA", "Canada", "Brazil", "France", "Germany"][
      Math.floor(Math.random() * 5)
    ];
    player.position = ["Setter", "Middle Blocker ", "Power Spiker", "Libero"][
      Math.floor(Math.random() * 4)
    ];
    player.picture = `player${i}.jpg`; // Assuming image files are named player1.jpg, player2.jpg, etc.
    player.currentTeam = `Team ${i}`;
    player.currentCoach = `Coach ${i}`;
    player.height = Math.floor(Math.random() * 30 + 160); // Random height between 160 and 189 cm
    player.weight = Math.floor(Math.random() * 50 + 50); // Random weight between 50 and 99 kg
    player.highestReach = Math.floor(Math.random() * 50 + 200); // Random highest reach between 200 and 249 cm
    player.blockJump = Math.floor(Math.random() * 50 + 50); // Random block jump between 50 and 99 cm
    player.spikeJump = Math.floor(Math.random() * 50 + 100); // Random spike jump between 100 and 149 cm
    player.percentageOfSuccessfulBlocks = (
      Math.random() * (maxPercentage - minPercentage + 1) +
      minPercentage
    ).toFixed(1);
    player.percentageOfSuccessfulSpikes = (
      Math.random() * (maxPercentage - minPercentage + 1) +
      minPercentage
    ).toFixed(1);
    player.percentageOfAceServes = (
      Math.random() * (maxPercentage - minPercentage + 1) +
      minPercentage
    ).toFixed(1);
    player.percentageOfPassedSpikes = (
      Math.random() * (maxPercentage - minPercentage + 1) +
      minPercentage
    ).toFixed(1);
    player.percentageOfPassedServes = (
      Math.random() * (maxPercentage - minPercentage + 1) +
      minPercentage
    ).toFixed(1);

    let baseDate = new Date("2020-01-01T00:00:00");
    // Add 6 different objects to playerHistory with unique data values
    for (let j = 1; j <= 12; j++) {
      const newDate = new Date(baseDate);
      newDate.setMonth(newDate.getMonth() + j);

      // Add the new date to the playerHistory along with the player's state
      const historyEntry = {
        state: { ...player },
        timestamp:
          newDate.toLocaleString("default", { month: "short" }) +
          newDate.getFullYear(),
      };

      // Modify some properties to make them different
      historyEntry.state.age += Math.floor(Math.random() * 5) - 2; // Add or subtract up to 2 years
      historyEntry.state.height += Math.floor(Math.random() * 20) - 10; // Add or subtract up to 10 cm
      historyEntry.state.weight += Math.floor(Math.random() * 10) - 5; // Add or subtract up to 5 kg
      historyEntry.state.blockJump += Math.floor(Math.random() * 10) - 5; // Add or subtract up to 5 cm
      historyEntry.state.spikeJump += Math.floor(Math.random() * 10) - 5; // Add or subtract up to 5 cm
      historyEntry.state.percentageOfSuccessfulBlocks = (
        Math.random() * (maxPercentage - minPercentage + 1) +
        minPercentage
      ).toFixed(1);
      historyEntry.state.percentageOfSuccessfulSpikes = (
        Math.random() * (maxPercentage - minPercentage + 1) +
        minPercentage
      ).toFixed(1);
      historyEntry.state.percentageOfAceServes = (
        Math.random() * (maxPercentage - minPercentage + 1) +
        minPercentage
      ).toFixed(1);
      historyEntry.state.percentageOfPassedSpikes = (
        Math.random() * (maxPercentage - minPercentage + 1) +
        minPercentage
      ).toFixed(1);
      historyEntry.state.percentageOfPassedServes = (
        Math.random() * (maxPercentage - minPercentage + 1) +
        minPercentage
      ).toFixed(1);

      historyEntry.state.percentageOfOverall = (
        (parseFloat(historyEntry.state.percentageOfAceServes) +
          parseFloat(historyEntry.state.percentageOfSuccessfulSpikes) +
          parseFloat(historyEntry.state.percentageOfSuccessfulBlocks)) /
        3
      ).toFixed(1);

      player.playerHistory.push(historyEntry);
    }

    playersList.push(player);
  }
}

function getPlayersList() {
  arrayCreator();
  return playersList;
}

function getPlayer() {
  arrayCreator();
  return playersList[0];
}

function setPlayersList(players) {
  playersList = players;
}

export { getPlayersList, setPlayersList, getPlayer };
