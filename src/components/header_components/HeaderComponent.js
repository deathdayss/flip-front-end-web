import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import './header-component.scss'
import HeaderFirstLayer from './HeaderFirstLayer';
import HeaderSecondLayer from './HeaderSecondLayer';

class Header extends Component {

  render() {
    return (
      <div id='header-border'>
        <Container fluid >
          <HeaderFirstLayer />
          < HeaderSecondLayer />
        </Container>
      </div>
    )
  }
}

export default Header;