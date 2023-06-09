import styled from "styled-components";
import Tooltip from "./Tooltip";
import { UPGRADES } from "../data/Upgrades";
import { useState } from "react";

// UI to buy upgrades
export default function UpgradesShop({
  money,
  upgradesUnlocked,
  upgradesPurchased,
  onPurchaseUpgrade
}) {
  const [selectedUpgradeTab, setSelectedUpgradeTab] = useState("unlocked");
  return (
    <Wrapper>
      <UpgradesTabSelector>
        <button
          disabled={selectedUpgradeTab === "unlocked"}
          onClick={() => {
            setSelectedUpgradeTab("unlocked");
          }}
        >
          Unlocked
        </button>
        <button
          disabled={selectedUpgradeTab === "purchased"}
          onClick={() => {
            setSelectedUpgradeTab("purchased");
          }}
        >
          Purchased
        </button>
      </UpgradesTabSelector>
      <UpgradesList>
        {selectedUpgradeTab === "unlocked" &&
          upgradesUnlocked.map((upgradeId, index) => {
            return (
              <Upgrade
                key={upgradeId}
                upgradeId={upgradeId}
                upgradesPurchased={upgradesPurchased}
                money={money}
                onPurchaseUpgrade={onPurchaseUpgrade}
              ></Upgrade>
            );
          })}
        {selectedUpgradeTab === "purchased" &&
          upgradesPurchased.map((upgradeId, index) => {
            return (
              <Upgrade
                key={upgradeId}
                upgradeId={upgradeId}
                upgradesPurchased={upgradesPurchased}
                money={money}
                onPurchaseUpgrade={onPurchaseUpgrade}
              ></Upgrade>
            );
          })}
      </UpgradesList>
    </Wrapper>
  );
}

const Wrapper = styled.section``;

const UpgradesTabSelector = styled.div`
  display: flex;

  button {
    color: var(--dark-color);
    background-color: #ccc;
    border-radius: 0;
    flex: 1;
  }

  button:disabled {
    background-color: #666;
    color: var(--light-color);
  }
`;

const UpgradesList = styled.ul`
  margin: 0;
  width: 50%;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  min-height: 50px;
  float: right;
  justify-content: flex-end;
  --upgrade-icon-color: var(--light-color);

  .upgrade {
    --icon-size: 45px;
    width: var(--icon-size);
    height: var(--icon-size);
    line-height: var(--icon-size);
    border: 2px solid #888888;
    margin: 2px;
    font-size: 2em;
    text-align: center;
    background-color: #333;
    cursor: pointer;

    /* Prevent highlighting */
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .upgrade.disabled {
    opacity: 0.5;
  }

  .upgrade:hover {
    border-color: var(--upgrade-icon-color);
  }

  .upgrade-tooltip {
    width: 170px;
    text-align: left;

    @media (min-width: 500px) {
      width: 290px;
    }

    @media (min-width: 800px) {
      width: 350px;
    }
  }

  .upgrade-tooltip-header {
    display: flex;
    flex-direction: row;
  }

  .upgrade-tooltip-title {
    color: var(--upgrade-icon-color);
    font-size: 1em;
    margin-top: 0;
    margin-bottom: 10px;
    margin-right: 5px;
    overflow: hidden;

    /* Prefer to break words, but hyphenate
    by character if needed */
    word-wrap: break-word;
    hyphens: auto;

    @media (min-width: 500px) {
      font-size: 1.2em;
    }
  }

  .upgrade-tooltip-cost {
    margin-right: 0;
    margin-left: auto;
  }

  .upgrade-tooltip p {
    margin: 0;
  }

  .upgrade-tooltip-description {
    margin-bottom: 10px;
  }

  .upgrade-tooltip-flavor {
    text-align: right;
  }

  @media (min-width: 500px) {
    margin: 0;
    width: 100%;
    float: left;
    justify-content: flex-start;
  }
`;

function Upgrade({ upgradeId, upgradesPurchased, money, onPurchaseUpgrade }) {
  const upgrade = UPGRADES[upgradeId];
  const icon = upgrade.icon ?? "❓";
  // Subtract 0.01 from the price for marketing purposes
  const price = upgrade.price ? upgrade.price - 0.01 : 0;
  const priceStr = price > 0 ? "$" + price.toFixed(2) : "Free";
  const canAfford = money >= price;
  const alreadyPurchased = upgradesPurchased.includes(upgradeId);

  // Can only purchase if not already purchased and can afford
  const isDisabled = alreadyPurchased || !canAfford;

  // Create tooltip
  const tooltip = (
    <div
      className="upgrade-tooltip"
      style={{ "--upgrade-icon-color": upgrade.color }}
    >
      <header className="upgrade-tooltip-header">
        <h2 className="upgrade-tooltip-title">
          <span role="img" aria-label={upgrade.name}>
            {icon}
          </span>
          {" " + upgrade.name}
        </h2>
        <div
          className={
            "upgrade-tooltip-cost " +
            (canAfford ? "money-text" : "money-text-disabled")
          }
        >
          {priceStr}
        </div>
      </header>

      <div className="upgrade-tooltip-description">{upgrade.description}</div>
      {upgrade.flavor && (
        <p className="upgrade-tooltip-flavor">
          <span className="flavor-text">{upgrade.flavor}</span>
          {upgrade.flavorAuthor && (
            <span className="flavor-author-text"> -{upgrade.flavorAuthor}</span>
          )}
        </p>
      )}
    </div>
  );

  return (
    <li>
      <Tooltip content={tooltip} direction="left">
        <div
          className={"upgrade" + (isDisabled ? " disabled" : "")}
          style={{ "--upgrade-icon-color": upgrade.color }}
          onClick={() => {
            if (!isDisabled) {
              onPurchaseUpgrade(upgradeId);
            }
          }}
        >
          <span role="img" aria-label={upgrade.name}>
            {icon}
          </span>
        </div>
      </Tooltip>
    </li>
  );
}
