import React from "react";
import "./App.css";
import { useState } from "react";
import { formatDate, formatDateMin, formatTimeDifference } from "./utils";

function App() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<any[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);

    if (value === "" || /^\d+$/.test(value)) {
      setError("");
      setData([]);
    } else {
      setError("Please enter a valid integer.");
    }
  };

  const validityIMOCheck = (imo: number) => {
    const numberStr = imo.toString();
    let sum = 0;

    for (let i = 0; i < numberStr.length - 1; i++) {
      const digit = parseInt(numberStr[i], 10);
      const multiplier = 7 - i;
      const temp = digit * multiplier;
      sum += temp;
    }

    const lastDigitCheck = parseInt(numberStr[numberStr.length - 1], 10);

    if (sum % 10 !== lastDigitCheck) {
      return false;
    }

    return true;
  };

  const fetchData = async (imo: number) => {
    try {
      const response = await fetch(
        `https://uat.engineering.sgtradex.net/api/v1/pilotage/${imo}`
      );
      const json = await response.json();
      const filteredJson = json
        .filter((row: any) => !Object.values(row).includes(null))
        .reverse();

      setData(filteredJson);
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  const checkAndSend = async () => {
    if (error || query === "" || isNaN(parseInt(query, 10))) {
      setError("Please enter a valid integer.");
      return;
    }

    const numberTest = parseInt(query, 10);
    if (numberTest < 1000000 || numberTest > 9999999) {
      setError("The number must be exactly 7 digits.");
      return;
    }

    setData([]);

    setLoading(true);
    try {
      // check query
      const flag = validityIMOCheck(numberTest);
      if (!flag) {
        setError("The number is not valid.");
        setLoading(false);
        return;
      }

      // api call
      fetchData(numberTest);
    } catch (err) {
      setError("An error occurred. Please try again later.");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Pilotage Data Search</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter IMO number..."
          value={query}
          onChange={handleSearch}
        />
        <button disabled={loading} onClick={checkAndSend}>
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      <div>
        {data.length > 0 && !error && (
          <div className="data-header">
            <p>
              Checking for ID {data[0].pilotage_imo} ({data[0].pilotage_nm})
            </p>
          </div>
        )}
      </div>

      <div className="table-container">
        {error && <div className="error">{error}</div>}
        {data.length > 0 && !error && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Log Time (SGT)</th>
                <th>From-To</th>
                <th>Service Requested</th>
                <th>Vehicle Arrival</th>
                <th>Pilot Arrival</th>
                <th>Actual Service Time (Duration)</th>
                <th>Total Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.pilotage_snapshot_dt}>
                  <td>{formatDate(item.pilotage_snapshot_dt)}</td>
                  <td>
                    {item.pilotage_loc_from_code} - {item.pilotage_loc_to_code}
                  </td>
                  <td>{formatDateMin(item.pilotage_cst_dt_time)}</td>
                  <td>{formatDateMin(item.pilotage_arrival_dt_time)}</td>
                  <td>{formatDateMin(item.pilotage_onboard_dt_time)}</td>
                  <td>
                    {formatDateMin(item.pilotage_start_dt_time)} -{" "}
                    {formatDateMin(item.pilotage_end_dt_time)} &nbsp; {"("}
                    {formatTimeDifference(
                      item.pilotage_end_dt_time,
                      item.pilotage_start_dt_time,
                      false
                    )}
                    {")"}
                  </td>
                  <td>
                    {formatTimeDifference(
                      item.pilotage_end_dt_time,
                      item.pilotage_cst_dt_time,
                      true
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
