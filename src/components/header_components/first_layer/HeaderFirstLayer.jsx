/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:32:41
 * @modify date 2021-07-24 21:14:19
 */

import { Popover, Button, Input} from 'antd';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'reactstrap';
import { Control, Form } from 'react-redux-form';
import { Link } from 'react-router-dom';

import { fetchHeaderSearch } from '../../../redux/actions/creators/SearchAction'
import { toggleLanguage } from '../../../redux/actions/creators/LocalizationAction'
import { headerRightBtnInfos } from '../../../data/public_related/HeaderRightContentPath'
import { headerState } from '../../../data/constants/HeaderState'
import './HeaderFirstLayer.scss'
import LoginForm from '../../login_components/LoginForm';

const mapDispatchToProps = dispatch => ({
    toggleLanguage: (lang) => dispatch(toggleLanguage(lang)),
    fetchHeaderSearch: (values) => dispatch(fetchHeaderSearch(values))
})

const mapStateToProps = state => {
    return {
        localization: state.localization,
        authentication: state.authentication,
        headerState: state.headerState
    }
}

// TODO: Check Login State
// const loginBeforeAfter = (userInfo) => {
//     if (userInfo === null) {
//         return (
//             <div>Not Login</div>
//         )
//     }
//     else {
//         <div>Logined</div>
//     }
// }

class HeaderFirstLayer extends Component {

    handleRankBtn = () => { }
    // TODO: press the search button
    headerSearch = value => { this.props.toggleLanguage(this.props.localization.lang) }
    componentDidMount() { }

    render() {


        //TODO: Change the link here
        const HeaderRightContent = ({ login, btnsInfo }) => {
            if (login) {
                return btnsInfo.map((btnInfo, index) => {
                    if (index != btnsInfo.length - 1) {
                        return (
                            <Link to='/TobeChanged1' key={btnInfo[0]} className={'my-link me-' + btnInfo[2]}>
                                <img src={btnInfo[0]} height={btnInfo[1]} width={btnInfo[1]} />
                            </Link>
                        )
                    }
                    else {
                        return (
                            // <Link to='/TobeChanged2' key={btnInfo[0]} className={'my-link me-lg-4 me-xl-5'}>
                            <Popover
                                title={
                                    ""
                                }
                                content={
                                    <ul style={{textAlign:'left', padding: 0, margin: 0}}>
                                        {/* <li><a href="/login">Login</a></li> */}
                                        {/* <li><a href="/signup">Sign-up</a></li> */}
                                        <h3> Welcome </h3>
                                        Account:  <Input/> <br/>
                                        Password: <Input/>
                                        <li><a href="/signup">if you don't have an account</a></li> <br />
                                        <Button> Login </Button>
                                    </ul>
                                }
                                key={btnInfo[0]}
                                className={'my-link me-lg-4 me-xl-5'}
                                trigger='hover'
                                placement="leftTop"
                            >
                                {/* <Button type="primary"> 123</Button> */}
                                <img src={btnInfo[0]} height={btnInfo[1]} width={btnInfo[1]} />
                            </Popover>
                            // </Link>
                        )
                    }
                })
            }
            else {
                return (
                    <>
                        <button id='header-signup-btn' className='theme-color-0-btn me-md-3'>
                            {this.props.localization.words.header.signup}
                        </button>
                        <button id='header-login-btn' className='me-md-5'>
                            {this.props.localization.words.header.login}
                        </button>
                    </>
                )
            }
        }

        return (
            <Row id={this.props.headerState.headerState === headerState.NORMAL ? 'header-first-line' : 'header-first-line-have-second'} >
                <Col xs='3' md='2' lg='1' id='logo' className='my-auto'>
                    <Link to='/' className='my-link' onClick={this.handleRankBtn}>
                        <img src='images/header/logo.svg' />
                    </Link>
                    {/* TODO: change Link */}
                    <Link to='/TobeChanged3' id='rank-btn-hide' className='my-link ms-3' onClick={this.handleRankBtn}>
                        <img src='images/header/header_rank_btn.svg' height='28' width='28' />
                    </Link>
                </Col>
                <Col xs='auto' md='5' lg='7' xl={{ size: '6', offset: '1' }} className='my-auto text-end'>
                    <Link to='/' id='rank-btn' className='my-link' onClick={this.handleRankBtn}>
                        <img src='images/header/header_rank_btn.svg' height='28' width='28' />
                    </Link>
                    <Form model='headerSearchBar' onSubmit={this.headerSearch}
                        className='my-auto' id='header-search-bar-form'>
                        <Control.text id='header-search-bar' model=".searchWord"
                            placeholder={this.props.localization.words.header.headerSearchbarHolder}
                        />
                        <button className='my-btn'>
                            <img id='header-search-submit-btn-image' src='images/header/header_search_btn.svg' />
                        </button>
                    </Form>
                </Col>
                <Col xs='8' md='5' lg='4' xl='4' className='header-user-btn my-auto text-end'>
                    <HeaderRightContent login={true} btnsInfo={headerRightBtnInfos} />
                </Col>
            </Row>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderFirstLayer);