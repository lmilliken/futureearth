import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import ProposalRow from "./components/ProposalRow";

import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitStatus: "new",
      proposals: [],
      selected: null,
      displayModal: false
    };

    this.getProposals = this.getProposals.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  async componentWillMount() {
    const data = await this.getProposals();
    this.setState({ proposals: data.data.returnedStuff });
  }

  async getProposals() {
    return axios
      .get("http://localhost:8081/proposals")
      .then(res => res)
      .catch(err => console.log(err));
  }

  handleRowClick() {
    this.setState({
      displayModal: true
    });
    console.log("row clicked App.js");
    console.log("state after click", this.state);
  }

  render() {
    let proposals = this.state.proposals.map(aProposal => {
      return (
        <ProposalRow
          key={aProposal._id}
          props={aProposal}
          ahandleRowClick={this.handleRowClick}
        />
      );
    });
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Proposal Administration Portal</h1>
        </header>
        <p>Hi Craig</p>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="text-left">Title</th>
              <th className="text-left">Name</th>
              <th className="text-left">Country Work</th>
              <th className="text-left">Country Citizenship</th>
              <th className="text-left">Tags</th>
              <th className="text-left">Notes</th>
            </tr>
          </thead>
          <tbody>{proposals}</tbody>
        </table>

        {this.state.displayModal === "true" && (
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>One fine body...</Modal.Body>

            <Modal.Footer>
              <Button>Close</Button>
              <Button bsStyle="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        )}
      </div>
    );
  }
}

export default App;
