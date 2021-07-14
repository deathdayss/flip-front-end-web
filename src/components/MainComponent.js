import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import Header from './header_components/HeaderComponent'
import { useLangToChangeWords } from '../redux/actions/creators/LocalizationAction'
import Homepage from './homepage_components/HomepageComponent'

const mapStateToProps = state => {
    return {
        localization: state.localization
    }
}

const mapDispatchToProps = dispatch => ({
    useLangToChangeWords: (lang) => dispatch(useLangToChangeWords(lang))
})

// const Test = ({match}) => {
//     console.log(match)
//     return (
//         <div>
//             12345
//         </div>
//     )
// }

class Main extends Component {
    componentDidMount() {
        // TODO: Check user login state
        this.props.useLangToChangeWords(this.props.localization.lang)
        console.log(this.props.location)
    }

    pressButton = () => {

    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/users' component= {Homepage} />
                    {/* <Route exact path='/test' component={() => <div>Hi</div>} /> */}
                    {/* <Route path='/test' component={() => <Header />} /> */}
                    {/* <Redirect to="/EN" /> */}
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))