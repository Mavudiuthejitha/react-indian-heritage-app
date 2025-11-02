import React from "react";
import { useAppContext } from "../context/AppContext";

export default function Dashboard() {
  const { user, favorites } = useAppContext();

  if (!user) {
    return <div className="alert alert-info">Please <a href="/login">login</a> to access dashboard features.</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Role: <strong>{user.role}</strong></p>

      <section>
        <h4>Your Saved Sites</h4>
        {favorites.length === 0 ? (
          <p className="text-muted">No saved sites yet. Explore sites and save favorites.</p>
        ) : (
          <div className="card-grid">
            {favorites.map(f => (
              <div className="card p-2" key={f.id}>
                <img src={f.image} alt={f.name} style={{height:120, objectFit:"cover"}} />
                <div className="p-2">
                  <h6>{f.name}</h6>
                  <small className="text-muted">{f.location}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
