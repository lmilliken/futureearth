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
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
    console.log("proposal", this);
    this.setState({ displayModal: true }, () => {
      console.log("state after click", this.state);
    });
  }

  handleClose() {
    this.setState({ displayModal: false }, () => {});
  }

  handleSave() {
    this.setState({ displayModal: false }, () => {});
  }

  render() {
    let proposals = this.state.proposals.map(aProposal => {
      return (
        <ProposalRow
          {...aProposal}
          key={aProposal._id}
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

        {this.state.displayModal === true && (
          <Modal.Dialog bsSize="large">
            <Modal.Header>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>One fine body...</Modal.Body>

            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
              <Button onClick={this.handleSave} bsStyle="primary">
                Save
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        )}
      </div>
    );
  }
}

export default App;
