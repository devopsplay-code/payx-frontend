import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      setMessage("Signup successful!");
      setIsError(false);
      setTimeout(() => navigate("/"), 1500);
    } else {
      setMessage("All fields are required");
      setIsError(true);
    }
  };

  return (
    <div className="signup-page-container">
      <form onSubmit={handleSubmit} className="signup-page-card">
        <h1>Signup</h1>
        {message && <p className={isError ? "error" : "success"}>{message}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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

        <button type="submit">Signup</button>

        <p className="toggle-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </form>
    </div>
  );
}

