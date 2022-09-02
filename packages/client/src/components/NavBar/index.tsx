import React from "react";
import { Navbar, NavbarProps, Nav } from "rsuite";
import { UserBlock } from "../UserBlock";
import { useIsDraft } from "./hooks";
import { NavLink } from "./NavLink";

export const NavBar: React.FC<NavbarProps> = (props) => {
  const {isDraft} = useIsDraft()
  return (
    <Navbar {...props}>
      <Navbar.Brand as="div">Tyorka.com admin</Navbar.Brand>
      <Navbar>
        <Nav>
          <Nav.Item to="/products/" as={NavLink}>
            Products
          </Nav.Item>
          <Nav.Item as={NavLink} to="/gallery/">
            Gallery
          </Nav.Item>
          <Nav.Item as={NavLink} to="/shop/">
            Shop
          </Nav.Item>
          <Nav.Item as={NavLink} to="/publication/">
            Publication{isDraft && ' *'}
          </Nav.Item>
        </Nav>
        <Nav pullRight>
          <UserBlock />
        </Nav>
      </Navbar>
    </Navbar>
  );
};
