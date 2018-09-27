import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import ProposalRow from "./components/ProposalRow";
import ProposalModal from "./components/ProposalModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitStatus: "new",
      proposals: [],
      reviewersAll: [],
      selected: {},
      displayModal: false
    };
    this.getProposals = this.getProposals.bind(this);
    this.getReviewers = this.getReviewers.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async componentWillMount() {
    const data = await this.getProposals();
    this.setState({ proposals: data.data.returnedStuff });
    const reviewers = await this.getReviewers();
    this.setState({ reviewersAll: reviewers.data.returnedStuff });
  }

  async getProposals() {
    return axios
      .get("http://localhost:8081/proposals")
      .then(res => res)
      .catch(err => console.log(err));
  }

  async getReviewers() {
    return axios
      .get("http://localhost:8081/reviewers")
      .then(res => res)
      .catch(err => console.log(err));
  }

  handleRowClick(id) {
    let selectedProposal = this.state.proposals.filter(
      proposal => proposal._id === id
    );

    this.setState(
      {
        displayModal: true,
        selected: selectedProposal[0]
      },
      () => {
        console.log("new state", this.state);
      }
    );
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
          ahandleRowClick={() => this.handleRowClick(aProposal._id)}
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
          <ProposalModal
            {...this.state.selected}
            key={this.state.selected._id}
            reviewersAll={this.state.reviewersAll}
            handleModalClose={this.handleClose}
            handleModalSave={this.handleSave}
          />
        )}
      </div>
    );
  }
}

export default App;
