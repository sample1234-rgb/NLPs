import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from "./SearchBox";

function Header(){
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    function logoutHandler(){
        dispatch(logout());
    }
  return (
    <div>
      <header>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="/"><i className="fas fa-cookie-bite"></i> Nonu Lachha Paranthas</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart</Nav.Link>
                <Nav.Link href="#/tables"><i className="fas fa-utensils" aria-hidden="true"></i> Tables</Nav.Link>
                { userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/profile"><i className="fa fa-user" aria-hidden="true"></i> Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>Log out <i class="fa fa-sign-out" aria-hidden="true"></i></NavDropdown.Item>
                </NavDropdown>
                ):(
                <Nav.Link href="#/login"><i className="fa fa-user" aria-hidden="true"></i> Login</Nav.Link>) }
                { userInfo && userInfo.isAdmin &&  (
                <NavDropdown title='Admin' id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/userlist"> Users </NavDropdown.Item>
                  <NavDropdown.Item href="#/productlist"> Products </NavDropdown.Item>
                  <NavDropdown.Item href="#/orderlist"> Orders </NavDropdown.Item>
                </NavDropdown>
                )}
              </Nav>
              <SearchBox />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default Header;
