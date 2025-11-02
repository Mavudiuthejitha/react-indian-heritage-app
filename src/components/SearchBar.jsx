import React from "react";
import { Form, InputGroup } from "react-bootstrap";

export default function SearchBar({ value, onChange, placeholder="Search..." }) {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </InputGroup>
  );
}
