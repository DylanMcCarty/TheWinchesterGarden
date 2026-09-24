import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { SITE_NAME } from "../config";

export default function NavBar() {
  return (
    <Navbar bg="success" data-bs-theme="dark" expand="md" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          🌱 {SITE_NAME}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/directory">
              Directory
            </Nav.Link>
            <Nav.Link as={NavLink} to="/submit">
              Add Your Farm
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
