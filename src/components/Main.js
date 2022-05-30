import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

function Main(props) {
    // 这里的props可以拿到is和handle
    const { isLoggedIn, handleLoggedIn } = props;

    const showLogin = () => {
        //case1如果已经登录了, 那就去home, case2 没有登录, show login
        return isLoggedIn ? (
            //要与url一致, 所以使用Redirect
            <Redirect to="/home" />
        ) : (
            <Login handleLoggedIn={handleLoggedIn} />
        );
    };

    //判断两个case: 是login了, 显示home, 不是就去登录界面吧
    const showHome = () => {
        return isLoggedIn ? <Home /> : <Redirect to="/login" />;
    };
    return (
        <div className="main">
            {/*这里的switch有一个排他性, 不允许这个模糊匹配, 只显示url完全路径匹配的*/}
            <Switch>
                {/* "/" 根路径的配置*/}
                <Route path="/" exact render={showLogin} />
                <Route path="/login" render={showLogin} />
                <Route path="/register" component={Register} />
                <Route path="/home" render={showHome} />
            </Switch>
        </div>
    );
}
export default Main;




