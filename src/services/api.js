import axios from 'axios';

const AUTH_BASE = 'http://localhost:4001';
const WALLET_BASE = 'http://localhost:4002';
const TRANSACTION_BASE = 'http://localhost:4003';

// Auth
export const signup = (data) => axios.post(`${AUTH_BASE}/signup`, data);
export const login = (data) => axios.post(`${AUTH_BASE}/login`, data);

// JWT helper
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Wallet
export const getWallet = () => axios.get(`${WALLET_BASE}/wallet`, getAuthHeaders());

// Transactions
export const getTransactions = () =>
  axios.get(`${TRANSACTION_BASE}/transactions`, getAuthHeaders());
