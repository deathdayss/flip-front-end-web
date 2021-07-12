import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import './header-component.scss'
import HeaderFirstLayer from './first_layer/HeaderFirstLayer';
import HeaderSecondLayer from './second_layer/HeaderSecondLayer';

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