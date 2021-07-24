/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:33:12
 * @modify date 2021-07-24 21:14:33
 */

import React, { Component } from 'react';
import { Container } from 'reactstrap';

import './HeaderComponent.scss'
import HeaderFirstLayer from './first_layer/HeaderFirstLayer.jsx';
import HeaderSecondLayer from './second_layer/HeaderSecondLayer.jsx';

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