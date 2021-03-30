import React from "react";
import "./App.css";
import Web from "./Web";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Survey from "./Survey";
import End from "./End";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/video">
            <h1>Reklam - Duygu Analizi</h1>
            <Web />
          </Route>
          <Route path="/survey">
            <Survey />
          </Route>
          <Route path="/end">
            <End />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
