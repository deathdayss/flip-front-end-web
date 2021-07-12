import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import './HeaderComponent.scss'
import HeaderFirstLayer from './HeaderFirstLayer';

class Header extends Component {

  render() {
    return (
      <div id='header-border'>
        <Container fluid >
          <HeaderFirstLayer />
          {/* TODO: the second lines in the main page */}
          <Switch>
            <Route path='/' />
            <Route path='/fanmade' />
            <Route path='/real_word' />
            <Route path='/traditional' />
          </Switch>
        </Container>
      </div>
    )
  }
}

export default Header;