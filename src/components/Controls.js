import styled from "styled-components";
import Tooltip from "./Tooltip";

// The header above the code editor which displays statistics and
// lets the user ship the current program
export default function Controls({
  linesOfCode,
  bugs,
  bugMultiplier,
  bonusMultiplier,
  money,
  profit,
  profitPerLine,
  totalRevenue,
  programsShipped,
  onShipProgram
}) {
  // Bug text is in red if it is greater than 0
  const bugText =
    bugs > 0 ? (
      <strong className="bug-text">{bugs}</strong>
    ) : (
      <span>{bugs}</span>
    );

  return (
    <Wrapper>
      <StatColumn align="left">
        <Stat key="code" label="Lines: " value={linesOfCode}>
          <p>
            Lines of code completed. More code means more money, but also higher
            chance for bugs.
          </p>
        </Stat>
        <Stat key="bugs" label="Bugs: " value={bugText}>
          <p>
            Technical debt incurred by the program that is{" "}
            <strong>beyond your ability to fix.</strong> Longer programs
            generate more bugs, damaging your profits.
          </p>
        </Stat>
      </StatColumn>
      <StatColumn align="right">
        <Stat key="money" label="" value={money} type="money">
          <p>Current balance.</p>
          <p>
            Total revenue earned:{" "}
            <strong className="money-text">${totalRevenue.toFixed(2)}</strong>
          </p>
        </Stat>
      </StatColumn>
      <ShipItButton
        linesOfCode={linesOfCode}
        profitPerLine={profitPerLine}
        bugMultiplier={bugMultiplier}
        bonusMultiplier={bonusMultiplier}
        profit={profit}
        programsShipped={programsShipped}
        onShipProgram={onShipProgram}
      ></ShipItButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 5px;
  border-bottom: 1px solid var(--light-color);
  min-height: var(--header-height);
  max-height: var(--header-height);

  .controls-button {
    margin-left: 10px;
    font-weight: bold;
    font-size: 0.7em;
    padding: 2px;
    text-align: center;
    height: 100%;
    cursor: pointer;
  }

  .controls-button.disabled {
    opacity: 0.5;
  }

  .ship-it-button {
    background-color: green;
    color: var(--light-color);
    border: 2px solid var(--light-color);
    width: 90px;
  }

  .ship-it-button:not(.disabled):hover {
    background-color: var(--dark-color);
    border-color: green;
    color: green;
  }

  .ship-it-tooltip {
    width: 100px;
  }

  @media (min-width: 500px) {
    .ship-it-tooltip {
      width: 180px;
    }
  }
  @media (min-width: 800px) {
    .ship-it-button {
      width: 110px;
      font-size: 0.9em;
    }

    .ship-it-tooltip {
      width: 250px;
    }
  }
`;

const StatColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: ${(p) => p.align};
  white-space: nowrap;
  margin-left: 2px;
  margin-right: 2px;

  .stat-tooltip {
    width: 120px;
    white-space: normal;
  }

  @media (min-width: 800px) {
    .stat-tooltip {
      width: 180px;
    }
  }
`;

function Stat({ label, value, type = "standard", children }) {
  const tooltip = <div className="stat-tooltip">{children}</div>;
  return (
    <Tooltip content={tooltip} direction="bottom">
      <div className="stat-container">
        <span className="stat-label">{label}</span>
        {type === "money" ? (
          <span className="stat-value money-text">${value.toFixed(2)}</span>
        ) : (
          <span className="stat-value">{value}</span>
        )}
      </div>
    </Tooltip>
  );
}

function ShipItButton({
  linesOfCode,
  profitPerLine,
  profit,
  bugMultiplier,
  bonusMultiplier,
  onShipProgram,
  programsShipped
}) {
  const isDisabled = linesOfCode <= 0;

  // Calculate display values for profit calculation
  const bugPenalty = Math.round((1 - bugMultiplier) * 100);
  const lineBonus = Math.round((bonusMultiplier - 1) * 100);
  const tooltip = (
    <div className="ship-it-tooltip">
      <p>Ship your program for money.</p>
      <p>
        <span className="money-text">${profitPerLine.toFixed(2)}/line</span>
        <br />* {linesOfCode} lines
        {bugMultiplier < 1 && (
          <>
            <br />
            <span className="bug-text"> - {bugPenalty}% bug penalty</span>
          </>
        )}
        {bonusMultiplier > 1 && (
          <>
            <br />
            <span>+ {lineBonus}% line bonus</span>
          </>
        )}
        <br />
        <span>
          = <strong className="money-text">${profit.toFixed(2)}</strong>
        </span>
      </p>
      <p>
        Total programs shipped: <strong>{programsShipped}</strong>
      </p>
    </div>
  );
  return (
    <Tooltip content={tooltip} direction="bottom">
      <button
        className={
          "controls-button ship-it-button" + (isDisabled ? " disabled" : "")
        }
        onClick={(e) => {
          if (!isDisabled) {
            onShipProgram();
          }
          e.preventDefault();
        }}
      >
        Ship It!
        <span>
          {" "}
          (<span className="money-text">+${profit.toFixed(2)}</span>)
        </span>
      </button>
    </Tooltip>
  );
}
