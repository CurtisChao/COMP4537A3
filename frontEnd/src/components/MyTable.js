import React from "react";
import Table from "react-bootstrap/Table";

function MyTable({ heads, rows }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {heads.map((head) => {
            return <th>{head}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr>
              {row.map((cell) => {
                return <td>{cell}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default MyTable;