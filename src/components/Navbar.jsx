import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar as BNavbar, Nav, Container } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";
import DarkModeToggle from "./DarkModeToggle";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user } = useAppContext();

  return (
    <BNavbar expand="lg" className="app-navbar">
      <Container>
        <BNavbar.Brand as={Link} to="/">
          Indian Heritage Explorer
        </BNavbar.Brand>
        <BNavbar.Toggle aria-controls="nav" />
        <BNavbar.Collapse id="nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/explore">Explore</Nav.Link>
            <Nav.Link as={NavLink} to="/virtual-tours">Virtual Tours</Nav.Link>
            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            <DarkModeToggle />
            {user ? (
              <Nav.Link as={NavLink} to="/dashboard">Hi, {user.name}</Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
}
