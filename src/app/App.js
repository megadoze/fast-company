import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./components/main";
import NotFound from "./components/not-found";
import Login from "./components/login";
// import Users from "./components/users";
import UsersLayout from "./components/usersLayout ";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={UsersLayout} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </div>
    );
}
export default App;
