import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import "../styles/Dashboard.css";

export default function Wallet() {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const userId = "user123"; // Replace with actual user ID
        const res = await fetch(`http://localhost:4002/wallet/dashboard/${userId}`);
        
        const contentType = res.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
          data = await res.json();
        } else {
          const text = await res.text();
          throw new Error(`Expected JSON but got: ${text}`);
        }

        if (!res.ok) throw new Error(data.message || "Failed to load wallet data");

        setWalletData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const { balance, currency = "USD", linkedAccounts = [], transactions = [] } = walletData;

  return (
    <div className="dashboard-container">
      <TopNav />
      
      {/* Wallet Balance Card */}
      <div className="credit-card">
        <div className="card-chip"></div>
        <div className="card-number">{currency} {balance}</div>
        <div className="card-name-expiry">
          <span>Wallet Balance</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Linked Accounts */}
      <div className="stats-section">
        <div className="stat-card">
          <h3>Linked Accounts</h3>
          {linkedAccounts.length > 0 ? (
            linkedAccounts.map((acc, idx) => <p key={idx}>{acc}</p>)
          ) : (
            <p>No linked accounts</p>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-section">
        <h2>Wallet Transactions</h2>
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
              transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{new Date(t.date).toLocaleDateString()}</td>
                  <td className={t.amount < 0 ? "negative" : "positive"}>
                    {t.amount < 0 ? `-$${Math.abs(t.amount)}` : `+$${t.amount}`}
                  </td>
                  <td className={t.status === "Completed" ? "completed" : "pending"}>
                    {t.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No wallet transactions</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
