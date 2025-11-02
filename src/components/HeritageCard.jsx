import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "../styles/Cards.css";

export default function HeritageCard({ item }) {
  const { favorites, toggleFavorite } = useAppContext();
  const isFav = favorites.some(f => f.id === item.id);

  return (
    <Card className="heritage-card shadow-sm">
      <img src={item.image} alt={item.name} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{item.location}</Card.Subtitle>
        <Card.Text>{item.short}</Card.Text>
        <div className="d-flex justify-content-between">
          <Button as={Link} to={`/heritage/${item.id}`} variant="outline-primary" size="sm">
            View Details
          </Button>
          <Button
            variant={isFav ? "danger" : "outline-success"}
            size="sm"
            onClick={() => toggleFavorite(item)}
          >
            {isFav ? "Saved" : "Save"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
