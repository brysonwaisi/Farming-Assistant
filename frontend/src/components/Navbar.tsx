import React from 'react'
import { Button, Container, Nav, Navbar as NavBs} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <NavBs sticky="top" className="bg-white shadow-sm mb-3" >
      <Container>
        <Nav className='me-auto'>
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        <Button style={{ width: '3rem', height: '3rem', position: 'relative'}}
        variant="outline-primary"
        className='rounded-circle'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.142 4L6.01 16.136A1.002 1.002 0 0 0 7.016 17H18a1 1 0 0 0 .958-.713l3-10A1 1 0 0 0 21 5H6.32l-.33-2.138a.993.993 0 0 0-.346-.627a.997.997 0 0 0-.66-.235H3a1 1 0 1 0 0 2h1.142zm3.716 11l-1.23-8h13.028l-2.4 8H7.858zM10 20a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm9 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0z"/></svg>
        <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{
          color: 'white',
          width: '1.5rem',
          height: '1.5rem',
          position: 'absolute',
          bottom: 0,
          right: 0,
          transform: 'translate(25%, 25%)'
        }}>5</div>
        </Button>
      </Container>
    </NavBs>
  )
}
