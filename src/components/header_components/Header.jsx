/* eslint-disable */

/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:32:41
 * @modify date 2021-07-24 21:14:19
 */

import { Popover, Button, Input, message } from 'antd';
import React, { Component, useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'reactstrap';
import { Control, Form } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { renderToString } from 'react-dom/server'

import { fetchHeaderSearch } from '../../redux/actions/creators/SearchAction'
import { toggleLanguage } from '../../redux/actions/creators/LocalizationAction'
import { headerRightBtnInfos } from './initData'
import { headerState } from '../../data/constants/HeaderState'
import './Header.scss'
import LoginForm from '../login_components/LoginForm';
import SignUpForm from '../signup_components/SignUpForm';
import { useHistory } from 'react-router-dom';
import QueryString from 'qs';

const { Search } = Input;

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

// ==========================================================================================
// Login service
const DOMAIN = "http://175.178.159.131:8084";
const API_LOGIN = `${DOMAIN}/v1/user/login`;
// const API_SIGNUP = `${DOMAIN}/v1/user/register`;
const API_VERIFICATION_CODE = `${DOMAIN}/v1/verification/code`;//"http://175.178.159.131:8084/v1/verification/code";


// const openSignup = (mail, name, pwd, veri) => {
//     // if (veri === verificationCode) {
//     //     verificationFailureWarning = "";
//     // console.log("Attempting to signup via: " + email + " " + nickname + " " + password);
//     const signupPormise = getSignupSerive({ email: mail, nickname: name, password: pwd });
//     signupPormise.then(
//         function (value) {
//             console.log('Signup success');
//             message.info('Signup Successful', 2.0);
//             // setTimeout(function () { history.push('/'); message.info('Welcome ' + val_email + ' !', 2.0); }, 2000);
//         },
//         function (value) {
//             console.log('Signup failture');
//             message.warn('The email you used is already registered', 2.0);
//         }
//     )
//     // }
//     // else{
//     //     verificationFailureWarning = "Verification Failed";
//     // }

// }
// const getSignupSerive = (params) => {
//     return request(`${API_SIGNUP}`, {
//         method: "post",
//         data: params,
//         requestType: "form"
//     });
// }


// ==========================================================================================
// Main component
const Header = function (props) {

  const [isLoggedIn, set_IsLoggedIn] = useState(JSON.parse(localStorage.getItem('user')) ? true : false);
  const [shouldLoginDisplay, set_LoginDisplay] = useState(false);
  const [shouldSignupDisplay, set_SignupDisplay] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();

  useEffect(() => {
    const routeParams = QueryString.parse(history.location.search.substring(1));
    if (routeParams.words) {
      setSearchValue(routeParams.words);
    }
  }, [])

  const openLogin = () => {
    set_SignupDisplay(false);
    set_LoginDisplay(true);
  }
  const openSignup = () => {
    set_LoginDisplay(false);
    set_SignupDisplay(true);
  }
  const closeLogin = () => {
    set_LoginDisplay(false);
  }
  const closeSignup = () => {
    set_SignupDisplay(false);
  }
  const handle_logoutRequest = () => {
    localStorage.removeItem('user');
    set_IsLoggedIn(false);
  }


  const handleRankBtn = () => { }
  // TODO: press the search button
  const headerSearch = value => { props.toggleLanguage(props.localization.lang) }

  const PersonalSocialInfo = (props) => {
    return (
      <div style={{ width: '80px', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p>{props.name}</p>
        <p style={{ fontWeight: 'bold' }}>{props.value}</p>
      </div>
    );
  }

  const HeaderRightContent = ({ btnsInfo }) => {

    return btnsInfo.map((btnInfo, index) => {
      const IconBlock = ({ ...props }) => <Link {...props} to={btnInfo.clickLink} key={btnInfo.imgPath} className={btnInfo.className}>
        <img src={btnInfo.imgPath} height={btnInfo.width} width={btnInfo.width} />
      </Link>
      if (index != 0) {
        return <IconBlock key={btnInfo.imgPath} />

      }
      else {
        return (
          <Popover
            title=''
            content={
              <div className="main-menu-popup" >
                {!isLoggedIn ?
                  (
                    <div>
                      <div> Welcome </div>
                      <Button onClick={openLogin}>Log in</Button>
                      <div>
                        <p>Don't have an account?</p>
                        <div style={{ color: 'red', cursor: 'pointer' }} onClick={openSignup}>Sign up</div>
                      </div>
                    </div>
                  ) :
                  (<div>
                    <div className='main-menu-popup-item' style={{ fontSize: '20px' }}> game point: 9000 </div>
                    <div className="personal-social-info-groups main-menu-popup-item">
                      <PersonalSocialInfo name='Following' value='33' />
                      <PersonalSocialInfo name='Followed' value='5' />
                      <PersonalSocialInfo name='XXX' value='2' />
                    </div>
                    <div className='main-menu-popup-item' style={{ backgroundColor: '#EEE' }}>Personal Center</div>
                    <div className='main-menu-popup-item' style={{ backgroundColor: '#F6EAFF', fontWeight: 'bold', cursor: 'pointer' }} onClick={handle_logoutRequest}>Log out</div>
                  </div>
                  )}
              </div>
            }
            key={btnInfo.imgPath}
            placement="bottom"
          >
            <IconBlock />
          </Popover>
        )
      }
    })
  }


  const onSearch = (value) => {
    let search = `?words=${value}`;
    let rankMethod = 'comprehensive';
    let category = 'all';
    if (props.rankMethod) {
      rankMethod = props.rankMethod;
    }
    if (props.category) {
      category = props.category;
    }
    search += `&rankMethod=${rankMethod}&category=${category}`;
    history.push({ pathname: '/search', search });
  }

  const onSearchChange = (e) => {
    setSearchValue(e.target.value)
  };

  return (
    <div className="header-border">
      <div className='logo-container'>
        <Link to='/' className='my-link' onClick={handleRankBtn}>
          <img src='images/header/logo.svg' />
        </Link>
      </div>
      <div className='search-bar-container'>
        <Link to='/rank' id='rank-btn-hide' className='my-link' onClick={handleRankBtn}>
          <img src='images/header/header_rank_btn.svg' height='28' width='28' />
        </Link>
        <div className='search-outer-div'>
          <Search placeholder={props.localization.words.header.headerSearchbarHolder} onSearch={onSearch} style={{ width: '400px' }}
            value={searchValue}
            onChange={onSearchChange} />
        </div>
      </div>
      <div className='user-buttons-container'>
        <HeaderRightContent btnsInfo={headerRightBtnInfos} />
      </div>
      {shouldLoginDisplay && (<LoginForm set_IsLoggedIn={set_IsLoggedIn} closeLogin={closeLogin} switchToSignup={openSignup} />)}
      {shouldSignupDisplay && (<SignUpForm set_IsLoggedIn={set_IsLoggedIn} closeSignup={closeSignup} switchToLogin={openLogin} />)}
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);