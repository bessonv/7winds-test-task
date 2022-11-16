import TableProps from "./Table.types";

export default function Table({ data }: TableProps): JSX.Element {
  return (
    <div>
      <div>table header</div>
      <ul>
        {data.map((el) => (
          <li key={el.id}>el.name</li>
        ))}
      </ul>
    </div>
  );
}
