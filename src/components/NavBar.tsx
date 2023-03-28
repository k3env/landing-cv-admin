import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "atomic-router-react";
import { Home, Profile, Tags, Gallery } from "~routes";

export function NavBar(props: {}) {
  return (
    <Navbar bg="light" expand="lg" className="shadow" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
          <span className="text-primary fw-bold">K3</span>Env's admin UI
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={Home.route}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={Gallery.route}>
              Gallery
            </Nav.Link>
            <Nav.Link as={Link} to={Profile.route}>
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to={Tags.route}>
              Tags
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
