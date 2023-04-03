import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "atomic-router-react";
import { Home, Profile, Tags, Gallery, Projects, Login } from "~routes";
import { useEffect, useState } from "react";
import { retry } from "../helpers/interceptor";
import { historyWatch } from "../routes/router";

export function NavBar(props: {}) {
  const [user, setUser] = useState<string | undefined>(undefined);
  const [path, setPath] = useState<string>("");

  historyWatch((u) => setPath(u.location.pathname));

  useEffect(() => {
    retry(
      "GET",
      `${import.meta.env.VITE_AUTH_URL}/user/me`,
      undefined,
      (rUser) => setUser(rUser.data.username),
      () => Login.route.open()
    );
  }, [path]);
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow"
      sticky="top"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand>
          <span className="text-primary fw-bold">K3</span>Env's admin UI
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        {user && (
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
              <Nav.Link as={Link} to={Projects.route}>
                Projects
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>{user}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}
