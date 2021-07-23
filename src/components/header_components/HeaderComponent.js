/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:33:12
 * @modify date 2021-07-23 20:33:12
 */

import React, { Component } from 'react';
import { Container } from 'reactstrap';

import './HeaderComponent.scss'
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