import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingSpinner({ text="Loading..." }) {
  return (
    <div className="center" style={{gap:8}}>
      <Spinner animation="border" role="status" />
      <span className="text-muted">{text}</span>
    </div>
  );
}
