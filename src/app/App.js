import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layuots/main";
import NotFound from "./layuots/not-found";
import Login from "./layuots/login";
import Users from "./layuots/users";
import EditUserForm from "./components/page/editPage/editUserForm";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?/edit" component={EditUserForm} />
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Main} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}
export default App;
