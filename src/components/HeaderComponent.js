import React, { Component, useState } from 'react';
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

class Header extends Component {

  handleRankBtn = () => {
    console.log('handleRankButton')
  }

  // TODO: press the search button
  headerSearch = value => {
    this.props.toggleLanguage(this.props.localization.lang)
    console.log(value)
  }


  render() {
    const HeaderRightContent = ({ login }) => {
      if (login) {
        return (
          <>
            <Col >
              <Link className='my-link'>
                <img src='images/header/header_upload_btn.svg' />
              </Link>
            </Col>
            <Col>
              <Link className='my-link'>
                <img src='images/header/header_file_btn.svg' />
              </Link>
            </Col>
            <Col>
              <Link className='my-link'>
                <img src='images/header/header_collection_btn.svg' />
              </Link>
            </Col>
            <Col>
              <Link className='my-link'>
                <img src='images/header/header_remind_btn.svg' />
              </Link>
            </Col>
            <Col>
              <Link className='my-link'>
                <img src='images/header/header_interaction_btn.svg' />
              </Link>
            </Col>
            <Col>
              <Link className='my-link'>
                <img src='images/header/header_avatar_btn.svg' />
              </Link>
            </Col>
          </>
        )
      }
      else {
        return (
          <>
            {/* <Col xs='6' md = {{ size: 5, offset: 4 }} lg={{ size: 2, offset: 8 }} className=''>
              <button id='header-signup-btn' className='theme-color-0-btn'>
                {this.props.localization.words.header.signup}
              </button>
            </Col> */}
            <Col sm={{ size: '12', offset: '0' }} >
              <button id='header-signup-btn' className='theme-color-0-btn me-3'>
                {this.props.localization.words.header.signup}
              </button>
              <button id='header-login-btn' className='theme-color-0-btn'>
                {this.props.localization.words.header.login}
              </button>
            </Col>
          </>
        )
      }
    }

    return (
      <div id='header-border'>
        <Container fluid >
          {/* <Container>
            <Row>
              <Col xs = '1'>
                <div>12234123123</div>
              </Col>
              <Col xs = '11'>
                <div>2</div>
              </Col>
            </Row>
          </Container> */}
          <Row id='header-first-line' className='gx-sm-2'>
            <Col xs='auto' md='auto' xl='1' id='logo' className='my-auto'>
              <img src='images/header/logo.svg' />
            </Col>
            <Col xs='auto'  xl={{ size: '6', offset: '1' }} className='text-end'>
              <Link to='/' id='rank-btn' className='my-link' onClick={this.handleRankBtn}>
                <img src='images/header/header_rank_btn.svg' />
              </Link>
              <Form model='headerSearchBar' onSubmit={this.headerSearch}
                className='my-auto' id='header-search-bar-form'>
                <Control.text id='header-search-bar' model=".searchWord"
                  placeholder={this.props.localization.words.header.headerSearchbarHolder}
                />

                <button className='my-btn'>
                  <img id='header-search-submit-btn-image' src='images/header/header_search_btn.svg' />
                </button>

              </Form>
            </Col>
            <Col xs='auto' xl='4' className='header-user-btn my-auto text-end'>
              <Container fluid>
                <Row>
                  <HeaderRightContent login={false} />
                </Row>
              </Container>
            </Col>
          </Row>
          {/* TODO: the second lines in the main page */}
        </Container>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));