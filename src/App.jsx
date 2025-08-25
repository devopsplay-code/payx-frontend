import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import Transaction from './pages/Transaction';
import History from './pages/History';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<Dashboard onLogout={() => console.log('Logout clicked')} />}
        />
        <Route path="/wallet" element={<Wallet/>} />
        <Route path="/transaction" element={<Transaction/>} />
        <Route path="/history" element={<History/>} />
      </Routes>
    </Router>
  );
}

export default App;
