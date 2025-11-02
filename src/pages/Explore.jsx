import React, { useEffect, useState } from "react";
import HeritageCard from "../components/HeritageCard";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Explore() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/heritageData.json")
      .then(res => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then(data => {
        setSites(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = sites.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.location.toLowerCase().includes(query.toLowerCase()));

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2>Explore Heritage Sites</h2>
      <SearchBar value={query} onChange={setQuery} placeholder="Search by name or city" />
      <div className="card-grid">
        {filtered.map(site => <HeritageCard item={site} key={site.id} />)}
      </div>
    </div>
  );
}
