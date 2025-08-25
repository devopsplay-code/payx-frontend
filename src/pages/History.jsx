import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import "../styles/History.css";

export default function History() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:4004/history"); // History microservice endpoint
        if (!res.ok) throw new Error("Failed to fetch history data");
        const data = await res.json();
        setHistoryData(data.transactions || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="history-container">
      <TopNav />

      <div className="history-card">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {historyData.length > 0 ? (
              historyData.map((h, index) => (
                <tr key={index}>
                  <td>{h.name}</td>
                  <td>{new Date(h.date).toLocaleString()}</td>
                  <td className={h.amount < 0 ? "negative" : "positive"}>
                    {h.amount < 0 ? `-$${Math.abs(h.amount)}` : `+$${h.amount}`}
                  </td>
                  <td className={h.status === "Success" ? "success" : "pending"}>
                    {h.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No history found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
