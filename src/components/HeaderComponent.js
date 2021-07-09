import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import { toggleLanguage } from '../redux/actions/creators/LocalizationAction'
import { Chinese } from '../data/words/Chinese'
import './HeaderComponent.scss'

const mapDispatchToProps = dispatch => ({
  toggleLanguage: (lang) => dispatch(toggleLanguage(lang))
})

const mapStateToProps = state => {
  return {
    localization: state.localization,
    authentication: state.authentication
  }
}

const loginBeforeAfter = (userInfo) => {
  if (userInfo === null) {
    return (
      <div>Not Login</div>
    )
  }
  else {
    <div>Logined</div>
  }
}

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='header-border' >
      <Container fluid className = 'header-first-line' >
        <Row>
          <Col xs='auto' sm='4' className='logo ' >
            <img src='images/header/logo.svg' />
          </Col>
          <Col xs='auto' sm='4' className='search-bar text-center text-md-right'>
            1234
          </Col>
          <Col xs='auto' sm='4' className='header-user-buttons'>
            <Container>
              <Row>
                <Col>
                12345
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));