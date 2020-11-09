import React from "react";
import "./App.css";
import Web from "./Web";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./Welcome";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/video">
            <h1>Advertisment Analysis</h1>
            <Web />
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
