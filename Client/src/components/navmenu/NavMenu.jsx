import React from "react";
import { Navbar, Container } from "react-bootstrap";


const NavMenu = (props) => {

  return (
    <header>
      <Navbar className="mb-4" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>{props.name}</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavMenu;
