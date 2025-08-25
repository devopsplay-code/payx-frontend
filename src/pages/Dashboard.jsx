import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const userId = "user123"; // Replace with actual logged-in user ID
        const res = await fetch(`http://localhost:4002/wallet/dashboard/${userId}`);

        // Check response content type first
        const contentType = res.headers.get("content-type");
        let data;

        if (contentType && contentType.includes("application/json")) {
          data = await res.json();
        } else {
          const text = await res.text();
          throw new Error(`Expected JSON but got: ${text}`);
        }

        if (!res.ok) throw new Error(data.message || "Failed to load dashboard");

        setDashboardData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const { balance, totalTransactions, cardNumber, cardName, cardExpiry, transactions } = dashboardData;

  return (
    <div className="dashboard-container">
      <TopNav />

      {/* Credit Card */}
      <div className="credit-card">
        <div className="card-chip"></div>
        <div className="card-number">{cardNumber}</div>
        <div className="card-name-expiry">
          <span>{cardName}</span>
          <span>{cardExpiry}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-section">
        <div className="stat-card">
          <h3>Total Balance</h3>
          <p>${balance}</p>
        </div>
        <div className="stat-card">
          <h3>Transactions Done</h3>
          <p>{totalTransactions}</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-section">
        <h2>Recent Transactions</h2>
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
            {transactions.length > 0 ? (
              transactions.map((t, index) => (
                <tr key={index}>
                  <td>{t.name}</td>
                  <td>{new Date(t.date).toLocaleDateString()}</td>
                  <td className={t.amount < 0 ? "negative" : "positive"}>
                    {t.amount < 0 ? `-$${Math.abs(t.amount)}` : `+$${t.amount}`}
                  </td>
                  <td className={t.status === "Completed" ? "completed" : "pending"}>{t.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No transactions yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
