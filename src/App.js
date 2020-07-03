import React from "react";
import "./App.css";
import Main from "./layout/main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import listActivity from "./components/getActivity";
import updateActivity from "./components/editActivity";
import postActivity from "./components/postActivity";

const token = JSON.parse(sessionStorage.getItem("persisted_state_hook:token"));

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Main>
          {(() => {
            if (!token) {
              return (
                <Switch>
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                </Switch>
              );
            } else {
              return (
                <>
                  <Switch>
                    <Route path="/activity" component={listActivity} />
                    <Route
                      path="/update/activity/:id"
                      component={updateActivity}
                    />

                    <Route path="/post/activity" component={postActivity} />
                  </Switch>
                </>
              );
            }
          })()}
        </Main>
      </Switch>
    </Router>
  );
};

export default App;
