
import React, { Component } from 'react';
import './index.css'
import { Route, Link, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import Null_Component from './Null_Component';
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    SettingOutlined,
    ProfileOutlined
} from '@ant-design/icons';
import UserHome from './home/UserHome';


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class UserHeader extends Component {
    render() {
        return (
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]}>
                    <Menu.Item key="1">临时</Menu.Item>
                    <Menu.Item key="2">测试</Menu.Item>
                    <Menu.Item key="3">菜单</Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default UserHeader;

