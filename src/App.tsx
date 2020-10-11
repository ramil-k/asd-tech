import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Login } from "./components/login.component";
import { useToken } from "./services/login.service";
import { Time } from "./components/time.component";

export function App() {
  const token = useToken();

  console.log(token);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/">
          {!token ? <Redirect to="/login" /> : <Time />}
        </Route>
        <Route exact={true} path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
