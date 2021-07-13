import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SubsectionButtons from './SubsectionButtons'
import { sectionRouteMarks } from '../../../data/constants/SectionRouteMarks'



class HeaderSecondLayer extends Component {

    render() {

        const RouteByButtons = () => {
            return sectionRouteMarks.map(sectionRouteMark => 
                <Route Key={sectionRouteMark} exact path={'/' + sectionRouteMark} component={() => <SubsectionButtons subsection={sectionRouteMark} />} />
            )
        }

        return (
            <Switch>
                <Route exact path='/' component={() => <SubsectionButtons subsection='main' />} />
                <RouteByButtons />
            </Switch>
        )
    }
}

export default HeaderSecondLayer;