/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:32:57
 * @modify date 2021-07-24 21:14:21
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SectionButtons from './SectionButtons.jsx'
// import { sectionRouteMarks } from '../../../data/constants/SectionRouteMarks'



class HeaderSecondLayer extends Component {

    render() {

        return (
            <Switch>
                <Route exact path='/' component={SectionButtons} />
            </Switch>
        )
    }
}

export default HeaderSecondLayer;