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
import { headerRightContentPath } from '../data/public_related/HeaderRightContentPath';
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
        // const HeaderRightBtns = headerRightContentPath.map(path => {
        //   return (
        //     <Link key={path} className='my-link me-4'>
        //       <img src={path} height='25' width='25' />
        //     </Link>
        //   )
        // })
        // return (
        //   <>
        //     <Link to='/' id='rank-btn-hide' className='my-link me-4' onClick={this.handleRankBtn}>
        //       <img src='images/header/header_rank_btn.svg' height='25' width='25' />
        //     </Link>
        //     {HeaderRightBtns}
        //   </>
        // )
        return headerRightContentPath.map(path => {
          return (
            <Link key={path} className='my-link me-4'>
              <img src={path} height='25' width='25' />
            </Link>
          )
        })
      }
      else {
        return (
          <>
            <button id='header-signup-btn' className='theme-color-0-btn me-md-3'>
              {this.props.localization.words.header.signup}
            </button>
            <button id='header-login-btn' className='theme-color-0-btn'>
              {this.props.localization.words.header.login}
            </button>
          </>
        )
      }
    }

    return (
      <div id='header-border'>
        <Container fluid >
          <Row id='header-first-line' >
            <Col xs='3' md = '2' lg = '1' id='logo' className='my-auto'>
              <img src='images/header/logo.svg' />
              <Link to='/' id='rank-btn-hide' className='my-link ms-4' onClick={this.handleRankBtn}>
                <img src='images/header/header_rank_btn.svg' height='25' width='25' />
              </Link>
            </Col>
            <Col xs='auto' md='4' lg='6' xl={{ size: '6', offset: '1' }} className='my-auto text-end'>
              <Link to='/' id='rank-btn' className='my-link' onClick={this.handleRankBtn}>
                <img src='images/header/header_rank_btn.svg' height='25' width='25' />
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
            <Col xs='8' md='6' lg='4' xl='4' className='header-user-btn my-auto text-end'>
              <HeaderRightContent login={true} />
            </Col>
          </Row>
          {/* TODO: the second lines in the main page */}
          <Switch>
            <Route path='/fanmade' />
            <Route path='/real_word' />
            <Route path='/traditional' />
          </Switch>
        </Container>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));