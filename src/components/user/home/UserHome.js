import React from 'react'
import { message } from 'antd';

function UserHome() {
    message.info('您已进入用户主页', 0.6);
    return (
        <div>
            <h1>UserHome</h1>
        </div>
    )
}

export default UserHome
