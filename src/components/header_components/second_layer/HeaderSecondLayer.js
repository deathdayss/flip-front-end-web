import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SubsectionButtons from './SubsectionButtons'

const sectionMarks = ['fanmade', 'real_world', 'traditional']

class HeaderSecondLayer extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={() => <SubsectionButtons subsection='main' />} />
                <Route exact path='/page_id=:id' component={<SubsectionButtons subsection='main' />} />
                {() => (
                    sectionMarks.map(sectionMark => <Route path={'/' + sectionMark} component={() => <SubsectionButtons subsection={sectionMark} />} />
                    ))}
            </Switch>
        )
    }
}

export default HeaderSecondLayer;