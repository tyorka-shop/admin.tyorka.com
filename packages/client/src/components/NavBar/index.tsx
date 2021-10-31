import React from "react";
import { Link } from "@reach/router";
import { Navbar, NavbarProps, Nav } from "rsuite";

export const NavBar: React.FC<NavbarProps> = (props) => {

  return (
    <Navbar {...props}>
      <Navbar.Brand as="div">Tyorka.com admin</Navbar.Brand>
      <Navbar>
        <Nav>
          <Nav.Item to="/products/" as={Link}>
            Products
          </Nav.Item>
          <Nav.Item as={Link} to="/gallery/">
            Gallery
          </Nav.Item>
        </Nav>
      </Navbar>
    </Navbar>
  );
};
