import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

export default function TopNav() {
  return (
    <nav className="top-nav">
      <div className="nav-logo">PayX</div>
      <ul className="nav-links">
        <li>
          <Link to="/dashboard" className="nav-item">
            {/* Dashboard Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" />
            </svg>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/wallet" className="nav-item">
            {/* Wallet Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 7H3v14h18V7zm0-2c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h18zM16 13c0 .55-.45 1-1 1H5v-2h10c.55 0 1 .45 1 1z" />
            </svg>
            <span>Wallet</span>
          </Link>
        </li>
        <li>
          <Link to="/transaction" className="nav-item">
            {/* Transaction Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h18v2H3V6zm0 5h12v2H3v-2zm0 5h6v2H3v-2z" />
            </svg>
            <span>Transaction</span>
          </Link>
        </li>
        <li>
          <Link to="/history" className="nav-item">
            {/* History Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3a9 9 0 0 0-9 9H1l4 4 4-4H6a7 7 0 1 1 7 7v-2l5 5 5-5v2a9 9 0 0 0-9-9z" />
            </svg>
            <span>History</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
