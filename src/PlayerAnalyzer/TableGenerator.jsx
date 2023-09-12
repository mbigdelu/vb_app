import { useState } from "react";

function TableGenerator(props) {
  const [tableData, setTableData] = useState({ tableArray: props.data });

  console.log(tableData);

  return (
    <table class="table table-primary table-striped ">
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
