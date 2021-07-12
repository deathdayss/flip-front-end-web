import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SubsectionButtons from './SubsectionButtons'
import {sectionRouteMarks} from '../../../data/constants/SectionRouteMarks'

class HeaderSecondLayer extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={() => <SubsectionButtons subsection='main' />} />
                <Route exact path='/page_id=:id' component={<SubsectionButtons subsection='main' />} />
                {() => (
                    sectionRouteMarks.map(sectionRouteMark => <Route path={'/' + sectionRouteMark} component={() => <SubsectionButtons subsection={sectionRouteMark} />} />
                    ))}
            </Switch>
        )
    }
}

export default HeaderSecondLayer;