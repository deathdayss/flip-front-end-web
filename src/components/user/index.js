
import React, { Component } from 'react';
import './index.css'
import { Route, Link, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    SettingOutlined,
    ProfileOutlined
} from '@ant-design/icons';

import Null_Component           from './Null_Component.js'
import UserHome                 from './home/UserHome.js'
import UserWork                 from './work/UserWork'
import UserNotification         from './notification/UserNotification'
import UserSubscription         from './subscription/UserSubscription'
import UserSetting              from './setting/UserSetting'



const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


class UserFrame extends Component {
    render() {
        // const user_uniqueKey = this.props.match.params.userUniqueKey
        // console.log("Retrieved user unique key: " + user_uniqueKey)
        return (

            <Layout className="layout_root">
                <Header className="header">
                    <div className="logo" />

                    
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]}>
                        <Menu.Item key="1">临时</Menu.Item>
                        <Menu.Item key="2">测试</Menu.Item>
                        <Menu.Item key="3">菜单</Menu.Item>
                    </Menu>

                </Header>
                <Content style={{ padding: '50px 50px' }}>
                    {/* REMOVED BREAD SCRUMB */}
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb> */}
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                {/* REMOVED THE SUBLIST ITEMS */}
                                {/* <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                        <Menu.Item key="1">option1</Menu.Item>
                                        <Menu.Item key="2">option2</Menu.Item>
                                        <Menu.Item key="3">option3</Menu.Item>
                                        <Menu.Item key="4">option4</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                        <Menu.Item key="5">option5</Menu.Item>
                                        <Menu.Item key="6">option6</Menu.Item>
                                        <Menu.Item key="7">option7</Menu.Item>
                                        <Menu.Item key="8">option8</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                        <Menu.Item key="9">option9</Menu.Item>
                                        <Menu.Item key="10">option10</Menu.Item>
                                        <Menu.Item key="11">option11</Menu.Item>
                                        <Menu.Item key="12">option12</Menu.Item>
                                    </SubMenu> */}

                                {/* TODO: 设置onClick事件跳转 */}
                                <Menu.Item key="menu_home" icon={<UserOutlined />}>                     <Link to="/user/home">          主页  </Link> </Menu.Item>
                                <Menu.Item key="menu_work" icon={<LaptopOutlined />}>                   <Link to="/user/work">          作品  </Link> </Menu.Item>
                                <Menu.Item key="menu_notification" icon={<NotificationOutlined />}>     <Link to="/user/notification">  动态  </Link> </Menu.Item>
                                <Menu.Item key="menu_subscription" icon={<ProfileOutlined />}>          <Link to="/user/subscription">  关注  </Link> </Menu.Item>
                                <Menu.Item key="menu_setting" icon={<SettingOutlined />}>               <Link to="/user/setting">       设置  </Link> </Menu.Item>
                            </Menu>
                        </Sider>

                        {/* ========================================================================== */}
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>

                            {/* Only display one of the following content */}
                            <Switch>
                                <Route exact path="/user/work"              component={UserWork} />
                                <Route exact path="/user/home"              component={UserHome} />
                                <Route exact path="/user/notification"      component={UserNotification} />
                                <Route exact path="/user/subscription"      component={UserSubscription} />
                                <Route exact path="/user/setting"           component={UserSetting} />
                            </Switch>
                            
                            {/* If you choose to put in DOM children instead */}
                            {/* {this.props.children} */}

                            {/* DOM CHILDREN EXAMPLE */}
                            {/* <UserFrame>
                                <Switch>
                                    <Route exact path='/'                       component={Homepage} />
                                    <Route exact path="/user/work"              component={UserWork} />
                                    <Route exact path="/user/home"              component={UserHome} />
                                    <Route exact path="/user/notification"      component={UserNotification} />
                                    <Route exact path="/user/subscription"      component={UserSubscription} />
                                    <Route exact path="/user/setting"           component={UserSetting} />
                                    <Route exact path='/upload/file'            component={DragUpload}/>           
                                </Switch>
                            </UserFrame> */}

                        </Content>
                        {/* ========================================================================== */}
                    </Layout>
                </Content>

                {/* REMOVED FOOTER */}
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
        );
    }
}

export default UserFrame;

