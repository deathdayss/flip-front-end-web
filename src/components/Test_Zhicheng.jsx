/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:33:59
 * @modify date 2021-07-24 21:16:47
 */

import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import {Helmet} from "react-helmet"

const mapStateToProps = state => {
    return {
        authentication: state.authentication,
        localization: state.localization
    }
}
export const Test = (props) => {
    const history = useHistory();
    const pressButton = () => {
        // history.push('/')
        console.log('authentication: ', props.authentication.isLoading)
    }
    return (
        <>
            <Helmet lang = 'zh'>
                <title>My Title</title>
            </Helmet>
            {props.localization.words.header.all}
            <Button outline onClick={pressButton}>Redirect to the default address</Button>
        </>
    )
}

export default connect(mapStateToProps)(Test)