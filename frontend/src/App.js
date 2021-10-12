import React from "react";
import Home from "./components/Home.js/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
