import styled from "styled-components";
import Tooltip from "./Tooltip";
import { BUILDINGS } from "../data/Buildings";

export default function BuildingsShop({
  money,
  totalRevenue,
  buildingCounts,
  upgradesPurchased,
  onPurchaseBuilding
}) {
  // Unlock buildings incrementally based on totalRevenue
  let buildingIndex;
  for (buildingIndex = 1; buildingIndex < BUILDINGS.length; ++buildingIndex) {
    if (totalRevenue < BUILDINGS[buildingIndex - 1].basePrice) {
      break;
    }
  }

  return (
    <BuildingsList>
      {BUILDINGS.map((building, index) => {
        return (
          <Building
            key={building.id}
            building={building}
            count={buildingCounts[building.id]}
            upgradesPurchased={upgradesPurchased}
            money={money}
            onPurchaseBuilding={onPurchaseBuilding}
            hidden={index > buildingIndex}
          ></Building>
        );
      })}
    </BuildingsList>
  );
}

const BuildingsList = styled.div`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--light-color);

  .Tooltip-Wrapper {
    display: block;
  }

  .building {
    padding: 10px;
    background-color: inherit;
    color: inherit;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid var(--light-color);
    border-left: 1px solid var(--light-color);
    margin-left: -1px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    cursor: pointer;

    /* Prevent highlighting */
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10+ */
    user-select: none;
  }

  .building-name {
    font-size: 1.1em;
    font-weight: bold;
  }

  /* Using a custom disabled class instead
   * of the property so that tooltips still
   * function (mouse events are disabled
   * as well
   */
  button.disabled {
    opacity: 0.8;
  }

  .building-count {
    font-size: 1.7em;
    margin-left: 5px;
  }

  .building-tooltip {
    width: 190px;
    text-align: left;

    @media (min-width: 500px) {
      width: 290px;
    }

    @media (min-width: 800px) {
      width: 350px;
    }
  }

  .building-tooltip p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .building-tooltip-header {
    display: flex;
    flex-direction: row;
  }

  .building-tooltip-title {
    font-size: 1.5em;
    margin-top: 0;
    margin-bottom: 5px;
    margin-right: 5px;
    overflow: hidden;

    /* Prefer to break words, but hyphenate
    by character if needed */
    word-wrap: break-word;
    hyphens: auto;
  }

  .building-tooltip-cost {
    margin-right: 0;
    margin-left: auto;
    font-size: 1.1em;
  }

  .building-tooltip-stats {
    padding-left: 15px;
    font-size: 0.9em;
    margin-bottom: 0;
  }
`;

function Building({
  building,
  count,
  upgradesPurchased,
  money,
  onPurchaseBuilding,
  hidden
}) {
  const price = building.basePrice * Math.pow(1.15, count);
  const priceStr = "$" + price.toFixed(2);
  const numUpgrades = upgradesPurchased.filter((upgradeId) =>
    building.upgrades.includes(upgradeId)
  ).length;
  const profitPerLine = building.baseBonus * (1 + 0.2 * numUpgrades);
  const totalProfitPerLine = profitPerLine * count;
  const unitProfitPerLineStr =
    "$" +
    (profitPerLine < 0.01
      ? profitPerLine.toFixed(3)
      : profitPerLine.toFixed(2));
  const totalProfitPerLineStr =
    "$" +
    (totalProfitPerLine < 0.01
      ? totalProfitPerLine.toFixed(3)
      : totalProfitPerLine.toFixed(2));
  const isDisabled = money < price;

  const tooltip = hidden ? (
    <div className="building-tooltip">
      <h2 className="building-tooltip-title">???</h2>
    </div>
  ) : (
    <div className="building-tooltip">
      <header className="building-tooltip-header">
        <h2 className="building-tooltip-title">{building.name}</h2>
        <div
          className={
            "building-tooltip-cost " +
            (isDisabled ? "money-text-disabled" : "money-text")
          }
        >
          {priceStr}
        </div>
      </header>

      <p className="building-tooltip-description">{building.description}</p>
      {building.flavor && <p className="flavor-text">{building.flavor}</p>}
      <ul className="building-tooltip-stats">
        <li>
          Each {building.singular} produces
          <strong> {unitProfitPerLineStr}</strong> per line
        </li>
        {count > 0 && (
          <li>
            <strong>{count}</strong> {building.plural} producing
            <strong> {totalProfitPerLineStr}</strong> per line
          </li>
        )}
      </ul>
    </div>
  );

  // https://upmostly.com/tutorials/how-to-use-media-queries-in-react
  // Need to refresh on resize since I'm not using an effect that
  // updates dynamically, but it's enough to help out on smaller screen devices.
  const isLargeScreen = window.matchMedia("(min-width: 500px").matches;
  const tooltipDirection = isLargeScreen ? "left" : "bottom";

  return (
    <li>
      <Tooltip content={tooltip} direction={tooltipDirection}>
        <button
          className={"building" + (isDisabled ? " disabled" : "")}
          onClick={() => {
            if (!isDisabled) {
              onPurchaseBuilding(building, price);
            }
          }}
        >
          <div className="building-info">
            <div className="building-name">
              {hidden ? "???" : building.name}
            </div>
            {hidden || (
              <div
                className={
                  "building-price " +
                  (isDisabled ? "money-text-disabled" : "money-text")
                }
              >
                ${price.toFixed(2)}
              </div>
            )}
          </div>

          <div className="building-count">{count}</div>
        </button>
      </Tooltip>
    </li>
  );
}
