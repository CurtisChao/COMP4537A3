import React, { useState } from "react";
import axios from "axios";
import MyTable from "../components/MyTable";

import BarChart from "../components/BarChart";

function Report() {
  const [data, setData] = useState([]);
  const [barChartData, setBarChartData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [thead, setThead] = useState([]);
  const [title, setTitle] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    authorization: `Refresh ${localStorage.getItem("token")}`,
  };

  const handleUniqueUsers = async () => {
    setBarChartData({});
    setTableData([]);
    const res = await axios.get(
        "http://localhost:6001/api/v1/admin/uniqueUsers",
        { headers }
    );

    // Set the table headers
    setThead(["User ID"]);

    // Format the data for the table
    const formattedData = res.data.map((userId) => [userId]);
    setTableData(formattedData);
  };


  const handleTopUsers = async () => {
    setData([]);
    setTableData([]);
    const res = await axios.get(
      "http://localhost:6001/api/v1/admin/topUsers",
      {
        headers,
      }
    );
    console.log(res.data);
    setTitle("Top API users");
    setBarChartData({
      labels: res.data.map((user) => user._id),
      datasets: [
        {
          label: "Number of requests",
          data: res.data.map((user) => user.count),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  };

  const handleTopUsersPerEndpoint = async () => {
    setData([]);
    setBarChartData({});
    const res = await axios.get(
      "http://localhost:6001/api/v1/admin/topUsersPerEndpoint",
      { headers }
    );
    setTitle("Top users per endpoint");
    console.log(res.data);
    const data = res.data.map((e) => [e._id.endpoint, e._id.user, e.count]);
    setThead(["Endpoint", "User", "Count"]);
    setTableData(data);
  };

  const handle4xxErrorByEndpoint = async () => {
    const res = await axios.get(
      "http://localhost:6001/api/v1/admin/errorsByEndpoint",
      { headers }
    );
    console.log(res.data);
    const data = res.data.map((e) => [e._id, e.count]);
    setThead(["Endpoint", "Count"]);
    setTableData(data);
  };

  const handleRecent4xx5xxErrors = async () => {
    const res = await axios.get(
      "http://localhost:6001/api/v1/admin/recentErrors",
      { headers }
    );
    console.log(res.data);
    setThead(["Endpoint", "User", "Status", "Timestamp"]);
    const data = res.data.map((e) => [
      e.endpoint,
      e.user,
      e.status,
      e.timestamp,
    ]);
    setTableData(data);
  };

  return (
    <>
      <button onClick={handleUniqueUsers}>Unique API users</button>
      <button onClick={handleTopUsers}>Top API users</button>
      <button onClick={handleTopUsersPerEndpoint}>
        Top users per endpoint
      </button>
      <button onClick={handle4xxErrorByEndpoint}>4xx Error By Endpoint</button>
      <button onClick={handleRecent4xx5xxErrors}>Recent 4xx/5xx Errors</button>

      {data && <div>{data.join(", ")}</div>}
      {Object.keys(barChartData).length > 0 && (
        <>
          <BarChart data={barChartData} title={title} />
        </>
      )}
      {tableData.length > 0 && <MyTable heads={thead} rows={tableData} />}
      {/* <BarChart data={barChartData} title={title} /> */}
    </>
  );
}

export default Report;