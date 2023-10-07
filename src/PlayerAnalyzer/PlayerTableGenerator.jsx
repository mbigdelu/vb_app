import { useState } from "react";

function TableGenerator(props) {
  const [tableData, setTableData] = useState({ tableArray: props.data });

  return (
    <table
      class={`table mb-3 table-striped  table-borderless  ${props.bgColorClass}`}
    >
      <tbody>
        {tableData.tableArray.map((row) => {
          return (
            <tr key={row.name}>
              <th scope="row">{row.name}</th>
              <td>{row.value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableGenerator;
