import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddItem from "./components/AddItem";
import Navbar from "./components/constants/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/new">
            <AddItem />
          </Route>
          <Route exact path="/">
            <TodoList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
