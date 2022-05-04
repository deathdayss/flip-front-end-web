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
import request from 'umi-request';
import { API_SEARCH_HISTORY, API_SEARCH_HOTTOPIC } from "../../Config";

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
  const [shouldSearchHintDisplay, set_SearchHintDisplay] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [recentlySearch, set_RecentlySearch] = useState(["GTA", "RDR2", "Cyberpunk2077"]);
  const [hotTopic, set_HotTopic] = useState(["GTA", "RDR2", "Cyberpunk2077"]);
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
        <div style={{ backgroundColor: '#C9B8FF', borderRadius: '10px', color: 'white', marginTop: '10px', marginBottom: '20px' }}>{props.name}</div>
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
              <div>
                {!isLoggedIn ?
                  (
                    <div className='main-menu-popup-login'>

                      <div className='main-menu-popup-item-login' onClick={openLogin} style={{ backgroundColor: '#F6EAFF', cursor: 'pointer', lineHeight: '60px' }}>Log in</div>
                      <div className='main-menu-popup-item-login'>
                        <div>First time using this?<br /> Click to <span style={{ color: '#DC06FF', textDecoration: 'underline', cursor: 'pointer' }} onClick={openSignup}>Sign up</span></div>
                      </div>
                    </div>
                  ) :
                  (<div className="main-menu-popup">
                    <div className="personal-social-info-groups main-menu-popup-item">
                      <PersonalSocialInfo name='Followed' value='0' />
                      <PersonalSocialInfo name='Liked' value='0' />
                    </div>
                    <div className='main-menu-popup-item' style={{ backgroundColor: '#EEE' }}>
                      <img src="images/header/personal_center.svg" height="30px" width="30px" style={{ marginRight: "10px" }}></img>
                      <span>Personal Center</span>
                    </div>
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

  const SearchTag = (props) => {
    return (
      <div onClick={() => { props.addToSearchValue(props.tagName) }} style={{ color: 'white', cursor: 'pointer', backgroundColor: '#C9B8FF', display: 'inline-block', margin: '5px', borderRadius: '10px' }}>
        <span style={{ margin: '10px' }}>{props.tagName}</span>
      </div>
    )
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

  const openSearchHint = () => {
    if(shouldSearchHintDisplay){
      set_SearchHintDisplay(false);
      return;
    }
    let recentlySearch_request;
    let hotTop_request;
    if (isLoggedIn) {
      recentlySearch_request = request(`${API_SEARCH_HISTORY}`, {
        method: "get",
        headers: {
          token: JSON.parse(localStorage.getItem('user')).token
        }
      });
      recentlySearch_request.then((res) => {
        set_RecentlySearch(res.history);
      }, (err) => {
        console.log(err);
        set_RecentlySearch([]);
      });
    } else {
      recentlySearch_request = Promise.resolve();
    }

    hotTop_request = request(`${API_SEARCH_HOTTOPIC}`, {
      method: "get",
    });

    hotTop_request.then((res) => {
      set_HotTopic(res.words);
    }, (err) => {
      console.log(err);
      set_HotTopic([]);
    });
   Promise.all([recentlySearch_request, hotTop_request]).then(()=>{
      set_SearchHintDisplay(true);
    })
    
  }

  const addToSearchValue = (value) => {
    setSearchValue(value);
  }

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
        <div className='search-outer-div' onClick={openSearchHint}>
          <Search placeholder={props.localization.words.header.headerSearchbarHolder} onSearch={onSearch} style={{ width: '400px' }}
            value={searchValue}
            onChange={onSearchChange} />
          {shouldSearchHintDisplay && (<div className='search-popup'>
            {isLoggedIn && (
              <div style={{ marginBottom: '50px' }}>
                <p>recently search</p>
                <div style={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }}>
                  {recentlySearch.map((item) =>
                    <SearchTag tagName={item} addToSearchValue={addToSearchValue} />)
                  }
                </div>
              </div>
            )}
            <div>
              <p>hot topic</p>
              <div style={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }}>
                {hotTopic.map((item) =>
                  <SearchTag tagName={item} addToSearchValue={addToSearchValue} />)
                }
              </div>
            </div>
          </div>)}
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