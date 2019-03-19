import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import FilterPanel from "./components/FilterPanel";
import AppliedFilters from "./components/AppliedFilters";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" />
          <span>Nectar</span>
        </header>

        <main>
          <FilterPanel />
          <div style={{ marginTop: "250px" }}>
            <AppliedFilters />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
