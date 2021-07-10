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
  NavbarText,
  Button
} from 'reactstrap';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';

import { toggleLanguage } from '../redux/actions/creators/LocalizationAction'
import { fetchHeaderSearch } from '../redux/actions/creators/SearchAction';

import './HeaderComponent.scss'

const mapDispatchToProps = dispatch => ({
  toggleLanguage: (lang) => dispatch(toggleLanguage(lang)),
  fetchHeaderSearch: (values) => dispatch(fetchHeaderSearch(values))
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

  const handleSearch = (values) => {
    console.log('What you want to search: ' + JSON.stringify(values))
    props.toggleLanguage(props.localization.lang)
    props.fetchHeaderSearch(values)
  }

  return (
    <div className='header-border' >
      {props.localization.words.header.all}
      <Container fluid className='header-first-line' >
        <Row>
          <Col xs='4' sm='4' className='logo' >
            <img src='images/header/logo.svg' />
          </Col>
          <Col xs='4' sm='4' className='search-bar text-center'>
            <Form model='searchBar' onSubmit={(values) => handleSearch(values)}>
              <Control.text model=".searchBar" id="searchBar" name="searchBar"
                className="form-control"
              />
              <span>
                <Button type="submit" color="primary">
                  Send Feedback
                </Button>
              </span>

            </Form>
          </Col>
          <Col xs='4' sm='4' className='header-user-buttons'>
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