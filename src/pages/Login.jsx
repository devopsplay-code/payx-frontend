import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch("http://localhost:4001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Invalid credentials");
        setIsError(true);
      } else {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
        setIsError(false);
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error) {
      setMessage("Server error. Try again later.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <form onSubmit={handleSubmit} className="login-page-card">
        <h1>Login</h1>

        {message && <p className={isError ? "error" : "success"}>{message}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="toggle-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </form>
    </div>
  );
}
