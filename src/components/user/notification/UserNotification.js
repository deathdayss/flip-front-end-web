import React from 'react'
import { message} from 'antd';

function UserNotification() {
    message.info('您已进入动态页',0.6);
    return (
        <div>
            <h1>UserNotification</h1>
        </div>
    )
}

export default UserNotification
