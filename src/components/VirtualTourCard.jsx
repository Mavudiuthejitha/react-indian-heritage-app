import React from "react";
import { Card, Button } from "react-bootstrap";

export default function VirtualTourCard({ tour }) {
  return (
    <Card className="shadow-sm">
      <img src={tour.image} alt={tour.title} style={{height:160, objectFit:"cover"}} />
      <Card.Body>
        <Card.Title>{tour.title}</Card.Title>
        <Card.Text>{tour.short}</Card.Text>
        <Button variant="primary" size="sm" href={tour.url} target="_blank" rel="noreferrer">Open Tour</Button>
      </Card.Body>
    </Card>
  );
}
