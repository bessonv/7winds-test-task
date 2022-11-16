import RowProps from "./Row.types";

export default function Row({ data }: RowProps): JSX.Element {
  const { rowName, salary, materials, mainCosts, estimatedProfit } = data;
  return (
    <li className="table-row">
      <div className="table-row__level"></div>
      <div className="talbe-row__name">{rowName}</div>
      <div className="talbe-row__salary">{salary}</div>
      <div className="talbe-row__materials">{materials}</div>
      <div className="talbe-row__coasts">{mainCosts}</div>
      <div className="talbe-row__profit">{estimatedProfit}</div>
    </li>
  );
}
