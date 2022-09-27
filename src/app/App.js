import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layuots/main";
import NotFound from "./layuots/not-found";
import Login from "./layuots/login";
import Users from "./layuots/users";
import EditUserPage from "./components/page/editPage/editUserPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfessionProvider } from "./hooks/useProfessions";
import { QualityProvider } from "./hooks/useQualities";

function App() {
    return (
        <div>
            <NavBar />
            <QualityProvider>
                <ProfessionProvider>
                    <Switch>
                        <Route
                            path="/users/:userId?/edit"
                            component={EditUserPage}
                        />
                        <Route path="/users/:userId?" component={Users} />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/" exact component={Main} />
                        <Route path="/404" component={NotFound} />
                        <Redirect to="/404" />
                        <Route component={NotFound} />
                    </Switch>
                </ProfessionProvider>
            </QualityProvider>
            <ToastContainer />
        </div>
    );
}
export default App;
