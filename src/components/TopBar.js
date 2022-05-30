
import React from 'react';
import logo from "../assets/images/logo.svg";

//引入logout icon
import { LogoutOutlined } from '@ant-design/icons';

function TopBar(props) {
    // 通过props传递的状态值
    const { isLoggedIn, handleLogout } = props;
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="App-title">Zhuomin Li's Around Web</span>
            {
                isLoggedIn ?
                    <LogoutOutlined className='logout' onClick={handleLogout}/>
                    :
                    null
            }
        </header>
    );
}

export default TopBar;