import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SubsectionButtons from './SubsectionButtons'
import { sectionRouteMarks } from '../../../data/constants/SectionRouteMarks'



class HeaderSecondLayer extends Component {

    render() {

        const RouteByButtons = () => {
            return sectionRouteMarks.map(sectionRouteMark => 
                <Route key={sectionRouteMark} exact path={'/' + sectionRouteMark} component={() => <SubsectionButtons sectionRouteMark={sectionRouteMark} />} />
            )
        }

        return (
            <Switch>
                <Route exact path='/' component={() => <SubsectionButtons sectionRouteMark='main' />} />
                <RouteByButtons />
            </Switch>
        )
    }
}

export default HeaderSecondLayer;