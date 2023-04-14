import "./styles.css";
import styled from "styled-components";
import Code from "./components/Code";
import UpgradesShop from "./components/UpgradesShop";
import BuildingsShop from "./components/BuildingsShop";
import Controls from "./components/Controls.js";
import { useState } from "react";
import { UPGRADES } from "./data/Upgrades";
import { BUILDINGS } from "./data/Buildings";
import { PROGRAMS } from "./data/Programs";

/* Constants */
const TYPING_UPGRADES = [
  "typing1",
  "typing2",
  "typing3",
  "typing4",
  "typing5",
  "typing6"
];
// How many lines you need to write to get each bonus
const LINE_BONUS_UPGRADES = {
  bonus1: 20,
  bonus2: 40,
  bonus3: 60,
  bonus4: 80,
  bonus5: 100,
  bonus6: 120
};
// Total number of buildings needed to get each upgrade
const DEBUG_UPGRADES = {
  bug1: 10,
  bug2: 20,
  bug3: 30,
  bug4: 40,
  bug5: 50,
  bug6: 60
};
// Number of a specific building needed to unlock each upgrade
const BUILDING_UNLOCK_COUNTS = [1, 10, 15, 20, 25, 30];

export default function App() {
  // Lifetime stats
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [programsShipped, setProgramsShipped] = useState(0);

  // Progression
  const [bugs, setBugs] = useState(0);
  const [money, setMoney] = useState(0);
  const [upgradesUnlocked, setUpgradesUnlocked] = useState([
    //...Object.keys(UPGRADES)
  ]);
  const [upgradesPurchased, setUpgradesPurchased] = useState([]);
  const [buildingCounts, setBuildingCounts] = useState({
    coffee: 0,
    variable: 0,
    function: 0,
    html: 0,
    css: 0,
    react: 0
  });

  // Code editor state, lifted up so other components can clear it
  const [codeDisplay, setCodeDisplay] = useState({
    contents: "",
    linesOffScreen: 0,
    programIndex: 0,
    programCharacterIndex: 0
  });

  // Current news message
  const [newsMessage, setNewsMessage] = useState(
    generateNews(
      totalRevenue,
      programsShipped,
      buildingCounts,
      upgradesPurchased
    )
  );

  // Add an upgrade to the store
  function unlockUpgrade(upgradeId) {
    if (
      upgradesPurchased.includes(upgradeId) ||
      upgradesUnlocked.includes(upgradeId)
    ) {
      return;
    }

    // Multiple upgrades can be unlocked in a
    // single upgrade, so queue the updates
    setUpgradesUnlocked((currentList) => {
      // Add to list
      const newList = [...currentList, upgradeId];

      // Sort list by price
      newList.sort((a, b) => {
        const priceA = UPGRADES[a].price ?? 0;
        const priceB = UPGRADES[b].price ?? 0;
        return priceA - priceB;
      });

      return newList;
    });
  }

  // If the player has the current upgrade or has enough money
  // it, unlock the next one.
  function updateUpgradeTier(tierList, currentMoney) {
    for (let i = 0; i < tierList.length; ++i) {
      const upgradeId = tierList[i];
      const upgrade = UPGRADES[upgradeId];
      if (
        currentMoney >= upgrade.price ||
        countPurchasedUpgrades(upgradeId) > 0
      ) {
        unlockUpgrade(upgradeId);
      } else {
        unlockUpgrade(upgradeId);
        break;
      }
    }
  }

  // Counts how many of the given upgrade IDs are purchased
  function countPurchasedUpgrades(...upgradeList) {
    return upgradesPurchased.filter((upgradeId) =>
      upgradeList.includes(upgradeId)
    ).length;
  }

  // Purchase a building
  function onPurchaseBuilding(building, price) {
    let newCount = buildingCounts[building.id] + 1;

    // Unlock building-specific upgrades
    for (let i = 0; i < BUILDING_UNLOCK_COUNTS.length; ++i) {
      if (
        i < building.upgrades.length &&
        newCount >= BUILDING_UNLOCK_COUNTS[i]
      ) {
        unlockUpgrade(building.upgrades[i]);
      } else {
        break;
      }
    }

    const newBuildingCounts = {
      ...buildingCounts,
      [building.id]: newCount
    };

    // Unlock based on total building count
    const totalBuildingCount = Object.values(newBuildingCounts).reduce(
      (a, b) => a + b,
      0
    );
    for (const upgradeId in DEBUG_UPGRADES) {
      if (totalBuildingCount >= DEBUG_UPGRADES[upgradeId]) {
        unlockUpgrade(upgradeId);
      }
    }

    // Update state
    setBuildingCounts(newBuildingCounts);
    setMoney(money - price);
  }

  // Only one upgrade can be purchased at a time,
  // so normal mutation can be used here
  function onPurchaseUpgrade(id) {
    const upgrade = UPGRADES[id];

    // Remove it from upgradesUnlocked
    if (upgradesUnlocked.includes(id)) {
      setUpgradesUnlocked(
        upgradesUnlocked.filter((upgradeId) => upgradeId !== id)
      );
    }

    // Add it to upgradesPurchased
    if (!upgradesPurchased.includes(id)) {
      const newList = [...upgradesPurchased, id];
      // Sort by id, which should group similar upgrades
      newList.sort((a, b) => a.localeCompare(b));
      setUpgradesPurchased(newList);
    }

    setMoney(money - upgrade.price);
  }

  // When a line of code is added
  function onAddLine() {
    // Calculate total chance to generate a bug
    const baseBugChance = 0.05;
    // Chance to generate a bug increases the longer a program is
    const compoundingBugChance = 0.02 * bugs;
    // Chance to generate a bug increases the more bugs there are
    const longProgramBugChance = 0.001 * linesOfCode;
    // Chance is reduced by having bug upgrades
    const numBugUpgrades = countPurchasedUpgrades(
      "bug1",
      "bug2",
      "bug3",
      "bug4",
      "bug5",
      "bug6"
    );
    const multiplier = 1 - 0.05 * numBugUpgrades;
    let totalChance =
      (baseBugChance + compoundingBugChance + longProgramBugChance) *
      multiplier;

    // Random chance to double bugs when using ChatGPT
    if (upgradesPurchased.includes("chatgpt") && Math.random() < 0.1) {
      totalChance *= 2;
    }

    // If totalChance > 1, break it into individual (at most 90%)
    // chances to generate a bug. Allows multiple bugs to be generated
    // per line.
    const MAX_INDIVIDUAL_CHANCE = 0.9;
    let newBugs = 0;
    do {
      const individualChance = Math.min(MAX_INDIVIDUAL_CHANCE, totalChance);
      if (Math.random() < individualChance) {
        newBugs += 1;
      }
      totalChance -= individualChance;
    } while (totalChance > 0);

    // Update bug count
    setBugs(bugs + newBugs);
  }

  // When the user types anything
  function onType(event, newCodeDisplay) {
    const newLinesOfCode =
      newCodeDisplay.linesOffScreen +
      newCodeDisplay.contents.split("\n").length -
      1;
    const linesAdded = newLinesOfCode - linesOfCode;

    // Call onAddLine for every line added
    for (let i = 0; i < linesAdded; ++i) {
      onAddLine();
    }
    setCodeDisplay(newCodeDisplay);
    // Typing automatically scrolls the window,
    // so there's not need to actually cancel the event
    // event.preventDefault();
  }

  // When the "Ship It!" button is pressed
  function onShipProgram() {
    // Unlock upgrades based on line length
    for (const upgradeId in LINE_BONUS_UPGRADES) {
      const lineCountNeeded = LINE_BONUS_UPGRADES[upgradeId];
      if (linesOfCode >= lineCountNeeded) {
        unlockUpgrade(upgradeId);
      }
    }

    // Update money
    const newMoney = money + profit;
    setMoney(newMoney);
    updateUpgradeTier(TYPING_UPGRADES, newMoney);

    // Update total revenue
    const newTotalRevenue = totalRevenue + profit;
    setTotalRevenue(newTotalRevenue);
    if (newTotalRevenue >= UPGRADES["chatgpt"].price / 2) {
      unlockUpgrade("chatgpt");
    }

    // Update total programs shipped
    const newProgramsShipped = programsShipped + 1;
    setProgramsShipped(newProgramsShipped);

    // Generate a news message
    setNewsMessage(
      generateNews(
        newTotalRevenue,
        newProgramsShipped,
        buildingCounts,
        upgradesPurchased
      )
    );

    resetProgram();
  }

  function resetProgram() {
    // Select a program different than the previous one
    let nextProgramIndex;
    do {
      nextProgramIndex = Math.floor(Math.random() * PROGRAMS.length);
    } while (nextProgramIndex === codeDisplay.programIndex);

    // Reset code editor
    setCodeDisplay({
      contents: "",
      linesOffScreen: 0,
      programIndex: nextProgramIndex,
      programCharacterIndex: 0
    });
    setBugs(0);
  }

  // Calculate lines of code
  const linesOnScreen = codeDisplay.contents.split("\n").length - 1;
  const linesOfCode = linesOnScreen + codeDisplay.linesOffScreen;

  // Calculate typing speed
  const typingSpeed =
    (1 + countPurchasedUpgrades(...TYPING_UPGRADES)) *
    (upgradesPurchased.includes("chatgpt") ? 2 : 1);

  // Calculate profit per line
  let profitPerLine = 0.01;
  for (const building of BUILDINGS) {
    const bonusPerBuilding =
      building.baseBonus *
      (1 + 0.2 * countPurchasedUpgrades(...building.upgrades));
    const numOfBuilding = buildingCounts[building.id];
    profitPerLine += numOfBuilding * bonusPerBuilding;
  }

  // Apply bug penalty
  const numberOfBugsPenalty = Math.pow(0.98, bugs);
  const percentageOfBugsPenalty = 1 - bugs / Math.max(linesOfCode, 1);
  const numDebugUpgrades = countPurchasedUpgrades(
    "variableDebug",
    "functionDebug",
    "coffeeDebug",
    "htmlDebug",
    "cssDebug",
    "reactDebug"
  );
  const upgradeMultiplier = 1 / (1 - 0.05 * numDebugUpgrades);
  const bugPenaltyMultiplier =
    numberOfBugsPenalty * percentageOfBugsPenalty * upgradeMultiplier;

  // Apply long program bonus
  let longProgramBonusMultiplier = 1;
  for (const upgradeId in LINE_BONUS_UPGRADES) {
    const lineCountNeeded = LINE_BONUS_UPGRADES[upgradeId];
    if (
      upgradesPurchased.includes(upgradeId) &&
      linesOfCode >= lineCountNeeded
    ) {
      longProgramBonusMultiplier += 0.2;
    }
  }

  // Calculate total profit
  const profit = Math.max(
    linesOfCode *
      profitPerLine *
      bugPenaltyMultiplier *
      longProgramBonusMultiplier,
    0
  );

  return (
    <Wrapper>
      <Game>
        <MainWindow>
          <Controls
            linesOfCode={linesOfCode}
            bugs={bugs}
            bugMultiplier={bugPenaltyMultiplier}
            bonusMultiplier={longProgramBonusMultiplier}
            money={money}
            profit={profit}
            profitPerLine={profitPerLine}
            totalRevenue={totalRevenue}
            programsShipped={programsShipped}
            onShipProgram={onShipProgram}
          ></Controls>
          <Code
            codeDisplay={codeDisplay}
            typingSpeed={typingSpeed}
            onType={onType}
          ></Code>
          <News>{newsMessage}</News>
        </MainWindow>
        <SideWindow>
          <ShopHeader>Store</ShopHeader>
          <UpgradesShop
            money={money}
            upgradesUnlocked={upgradesUnlocked}
            upgradesPurchased={upgradesPurchased}
            onPurchaseUpgrade={onPurchaseUpgrade}
          ></UpgradesShop>
          <BuildingsShop
            money={money}
            totalRevenue={totalRevenue}
            buildingCounts={buildingCounts}
            upgradesPurchased={upgradesPurchased}
            onPurchaseBuilding={onPurchaseBuilding}
          ></BuildingsShop>
        </SideWindow>
      </Game>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  box-sizing: border-box;
`;

const Game = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  --header-height: 75px;

  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

const MainWindow = styled.section`
  flex: 2;
  flex-shrink: 1;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const SideWindow = styled.section`
  flex: 1;
  min-width: 200px;
  max-width: 500px;
  height: 100%;

  display: flex;
  flex-direction: column;
  @media (min-width: 500px) {
    border-left: 1px solid var(--light-color);
  }
`;

const ShopHeader = styled.h1`
  text-align: center;
  min-height: var(--header-height);
  height: var(--header-height);
  border-bottom: 1px solid var(--light-color);
  padding-top: 10px;
  margin: 0;
`;

const News = styled.section`
  text-align: center;
  border-top: 1px solid var(--light-color);
  border-bottom: 1px solid var(--light-color);
  padding: 5px;
  margin-top: auto;
  margin-bottom: 0;
  min-height: 50px;
`;

function generateNews(
  totalRevenue,
  programsShipped,
  buildingCounts,
  upgradesPurchased
) {
  const messagePool = [];

  // Messages based on total revenue
  if (totalRevenue >= 1000000) {
    messagePool.push("I think it's time to take a break");
  } else if (totalRevenue >= 500000) {
    messagePool.push("Your app has started to achieve sentience.");
  } else if (totalRevenue >= 100000) {
    messagePool.push("The whole country is using your app!");
  } else if (totalRevenue >= 50000) {
    messagePool.push(
      "Your apps have been placed under government surveillance."
    );
  } else if (totalRevenue >= 10000) {
    messagePool.push("Your apps sell very well in distant countries.");
  } else if (totalRevenue >= 5000) {
    messagePool.push("Your apps are talked about for miles around.");
  } else if (totalRevenue >= 1000) {
    messagePool.push(
      "Your app gets an A on your class assignment. Great success!"
    );
  } else if (totalRevenue >= 500) {
    messagePool.push("Your apps are renowned in the whole town!");
  } else if (totalRevenue >= 100) {
    messagePool.push("You receive an award for one of your apps!");
  } else if (totalRevenue >= 50) {
    messagePool.push("Your apps are popular in the neighborhood.");
  } else if (totalRevenue >= 25) {
    messagePool.push("People are starting to talk about your apps.");
  } else if (totalRevenue >= 10) {
    messagePool.push("Your apps are popular in your classroom.");
  } else if (totalRevenue >= 5) {
    messagePool.push(
      "You publish your first app online. It gets a couple views."
    );
  } else if (totalRevenue >= 1) {
    messagePool.push(
      "A random user stars your app on GitHub. You have no idea who they are."
    );
  } else if (totalRevenue >= 0.5) {
    messagePool.push("Your friends agree to try out your app.");
  } else {
    messagePool.push("Your first app goes straight to the garbage collector.");
  }

  // Messages based on upgrades
  if (upgradesPurchased.includes("typing6")) {
    messagePool.push(
      "You type faster than you can think. Make sure to take breaks!"
    );
  } else if (upgradesPurchased.includes("typing5")) {
    messagePool.push(
      "You learn a new Vim shortcut that speeds up your workflow dramatically."
    );
  } else if (upgradesPurchased.includes("typing4")) {
    messagePool.push(
      "You copy-paste a snippet directly from StackOverflow without citing it. No one notices."
    );
  } else if (upgradesPurchased.includes("typing3")) {
    messagePool.push(
      "Your shiny new keyboard is holding up against your relentless typing."
    );
  } else if (upgradesPurchased.includes("typing2")) {
    messagePool.push("You've mastered the art of tab completion.");
  } else if (upgradesPurchased.includes("typing1")) {
    messagePool.push(
      "You're typing much faster these days. The lessons must be paying off."
    );
  }

  // Use empty message if nothing else is available
  if (messagePool.length <= 0) {
    messagePool.push("");
  }

  // Hardcode the first message
  if (programsShipped === 0) {
    messagePool.length = 0;
    messagePool.push(
      "You want to code an app. But nobody wants to use your app."
    );
  }

  const messageIndex = Math.floor(Math.random() * messagePool.length);
  const messageToDisplay = messagePool[messageIndex];
  return messageToDisplay;
}
