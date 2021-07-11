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
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { Link } from 'react-router-dom';

import { fetchHeaderSearch } from '../redux/actions/creators/SearchAction';
import { toggleLanguage } from '../redux/actions/creators/LocalizationAction'
import './HeaderComponent.scss'

const mapDispatchToProps = dispatch => ({
  // toggleLanguage: (lang) => dispatch(toggleLanguage(lang)),
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

  const handleHeaderSearch = (values) => {
    console.log('What you want to search: ' + JSON.stringify(values))
    props.fetchHeaderSearch(values)
    // props.toggleLanguage(props.localization.lang)
  }

  const handleRankButton = () => {
    console.log('handleRankButton')
  }

  const HeaderRightContent = ({ login }) => {
    if (login) {
      return (
        <>
          <Col >
            <Link className='my-link'>
              <img src='images/header/header_upload_button.svg' />
            </Link>
          </Col>
          <Col>
            <Link className='my-link'>
              <img src='images/header/header_file_button.svg' />
            </Link>
          </Col>
          <Col>
            <Link className='my-link'>
              <img src='images/header/header_collection_button.svg' />
            </Link>
          </Col>
          <Col>
            <Link className='my-link'>
              <img src='images/header/header_remind_button.svg' />
            </Link>
          </Col>
          <Col>
            <Link className='my-link'>
              <img src='images/header/header_interaction_button.svg' />
            </Link>
          </Col>
          <Col>
            <Link className='my-link'>
              <img src='images/header/header_avatar_button.svg' />
            </Link>
          </Col>
        </>
      )
    }
    else {
      return (
        <>
          <Col xs='6' sm={{ size: 1, offset: 6 }}>
            <Button id='header-signup-button' color="primary">
              Signup
            </Button>
          </Col>
          <Col xs='6' sm={{ size: 'auto', offset: 2 }}>
            <Button id='header-login-button' color="primary">
              Login
            </Button>
          </Col>
        </>
      )
    }
  }

  return (
    <div id='header-border' >
      <Container fluid >
        <Row id='header-first-line' >
          <Col xs='1' sm='1' className='logo' >
            <img src='images/header/logo.svg' />
          </Col>
          <Col xs='5' sm='5' id='header-search' className='text-center'>
            <Link className='my-link' onClick={handleRankButton}><img src='images/header/header_rank_button.svg' /> </Link>
            <Form model='headerSearchBar' onSubmit={(values) => handleHeaderSearch(values)}
              id='header-search-bar-form'>
              <Control.text model=".searchWord" className="d-none d-sm-none d-md-inline"
              />

              <button id='header-search-submit-button' className='my-button' type="submit">
                <img src='images/header/header_search_button.svg' />
              </button>

            </Form>
          </Col>
          <Col xs={{ size: '5', offset: '1' }} sm={{ size: '5', offset: '1' }} className='header-user-buttons text-center'>
            <Container fluid>
              <Row>
                <HeaderRightContent login={true} />
              </Row>
            </Container>
          </Col>
        </Row>
         {/* TODO: the second lines in the main page */}
      </Container>
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));