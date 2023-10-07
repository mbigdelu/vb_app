import { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

function CustomNavbar(props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScreenLarge, setIsScreenLarge] = useState(props.data);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function linkClassGenerator() {
    let className = "";

    if (isScreenLarge && !isScrolled) {
      className += " text-prim";
    } else {
      className += " text-black";
    }
    return className;
  }

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`px-2 ${
        !isScreenLarge
          ? "bg-prim"
          : isScrolled
          ? "py-4 bg-prim"
          : "bg-opacity-10 bg-transparent"
      }`}
    >
      <div className="container-fluid">
        <Navbar.Brand className={linkClassGenerator()} href="/">
          {/* <img src={logo} alt="Logo" className="logo" /> */}
          VB APP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className={linkClassGenerator()}>
              Home
            </Nav.Link>

            <Nav.Link href="/about" className={linkClassGenerator()}>
              About
            </Nav.Link>

            <Nav.Link href="/new-game/setup" className={linkClassGenerator()}>
              Game Analyze
            </Nav.Link>

            <Nav.Link href="/player-analyze" className={linkClassGenerator()}>
              Player Analyze
            </Nav.Link>

            <LinkContainer to="/test" className={linkClassGenerator()}>
              <Nav.Link>Test</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact" className={linkClassGenerator()}>
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="d-flex flex-row">
            <Nav.Link href="#!">
              <i className="fas fa-shopping-cart"></i>
            </Nav.Link>
            <Nav.Link href="#!">
              <i className="fab fa-twitter"></i>
            </Nav.Link>
            <Nav.Link href="#!">
              <i className="fab fa-instagram"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default CustomNavbar;
