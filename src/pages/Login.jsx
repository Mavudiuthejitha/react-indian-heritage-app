import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Login() {
  const { setUser } = useAppContext();
  const [name, setName] = useState("");
  const [role, setRole] = useState("Cultural Enthusiast");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setUser({ name: name || "Guest", role });
    navigate("/dashboard");
  }

  return (
    <div style={{maxWidth:480}}>
      <h2>Login (Simulated)</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" value={role} onChange={e=>setRole(e.target.value)}>
            <option>Cultural Enthusiast</option>
            <option>Content Creator</option>
            <option>Tour Guide</option>
            <option>Admin</option>
          </select>
        </div>

        <button className="btn btn-primary" type="submit">Enter</button>
      </form>
    </div>
  );
}
