import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import "../styles/Transaction.css";

export default function Transaction() {
  const [selectedUser, setSelectedUser] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [toast, setToast] = useState("");

  const users = ["GPay - John Doe", "PhonePe - Alice", "Paytm - Bob", "Bank - XYZ"];

  // Fetch transactions from backend
  useEffect(() => {
    fetch("http://localhost:4003/transactions")
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error(err));
  }, []);

  const handleSend = async () => {
    if (!selectedUser || !amount) return;

    const newTransaction = { name: selectedUser, amount: parseFloat(amount) };

    try {
      const res = await fetch("http://localhost:4003/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });
      const savedTransaction = await res.json();

      setTransactions([savedTransaction, ...transactions]);
      setToast("Transaction Completed!");
      setTimeout(() => setToast(""), 3000);

      setSelectedUser("");
      setAmount("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="transaction-container">
      <TopNav />

      {/* Send Money Form */}
      <div className="transaction-card">
        <h3>Send Money</h3>
        <label>Select User/Bank</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">-- Select --</option>
          {users.map((user, index) => (
            <option key={index} value={user}>{user}</option>
          ))}
        </select>

        <label>Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleSend}>Send</button>
      </div>

      {/* Toast Notification */}
      {toast && <div className="toast">{toast}</div>}

      {/* Transaction History */}
      <div className="transactions-section">
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
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <tr key={t._id}>
                  <td>{t.name}</td>
                  <td>{new Date(t.date).toLocaleString()}</td>
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
