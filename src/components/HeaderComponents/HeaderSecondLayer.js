import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './HeaderSecondLayer.scss'

const mapStateToProps = state => {
    return {
        localization: state.localization,
    }
}

class HeaderSecondLayer extends Component { 

}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSecondLayer);