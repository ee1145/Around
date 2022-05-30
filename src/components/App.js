//这里的useState hook function for 记录登录还是登出状态
import React, { useState } from "react";
import TopBar from "./TopBar";
import Main from "./Main";

import { TOKEN_KEY } from "../constants";
import "../styles/App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        //看看TOKEN_KEY是否存在, 从而判断是已经登录了->持久登录, 还是没有登录
        localStorage.getItem(TOKEN_KEY) ? true : false
    );

    // 子向父传第三步
    const logout = () => {
        console.log("log out");
        localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
    };

    // 这个函数是用来接受login.js回传回来的Token
    const loggedIn = (token) => {
        if (token) {
            //存在browser的, 如果有这个token就可以持久登录
            //Key- TOKEN_KEY, value - token
            localStorage.setItem(TOKEN_KEY, token);
            setIsLoggedIn(true);
        }
    };
    return (
        <div className="App">
            {/*isLoggedIN是记录登录状态, handleLogout是接受了TopBar里的handlelgoout*/}
            <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} />
            <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
            <Main />
        </div>
    );
}

export default App;
