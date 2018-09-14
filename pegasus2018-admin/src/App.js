import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitStatus: "new",
      data: {}
    };

    this.getProposals = this.getProposals.bind(this);
  }

  async componentWillMount() {
    console.log("component is about to mount!");
    const data = await this.getProposals();
    console.log("data", data);
    this.setState({ data: data });
    console.log("state", this.state);
  }

  async getProposals() {
    const data = await fetch("http://localhost:8081/proposals", {
      method: "GET"
    })
      .then(response => {
        response.json().then(data => {
          console.log("datat", data);
          return data;
        });
      })
      .catch(err => {
        console.log(err);
      });

    return data;
  }

  render() {
    const tableBody = (
      <tr>
        <td>Alvin</td>
        <td>Eclair</td>
        <td>$0.87</td>
        <td>Somewhere</td>
      </tr>
    );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <table className="highlight">
          <thead>
            <tr>
              <th>Title</th>
              <th>Name</th>
              <th>Country Work</th>
              <th>Country Citizenship</th>
            </tr>
          </thead>

          <tbody>{tableBody}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
