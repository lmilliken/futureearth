import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import ProposalRow from "./components/ProposalRow";
import ProposalModal from "./components/ProposalModal";

let SERVER_URL = "http://localhost:8081";
// process.env.NODE_ENV === "production"
//   ? "https://pegasus2018-server.herokuapp.com"
//   : "http://localhost:8081";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const proposals = await this.getProposals();
    this.setState({ proposals });
    const reviewers = await this.getReviewers();
    this.setState({ reviewersAll: reviewers });
  }

  async getProposals() {
    return axios
      .get(`${SERVER_URL}/proposals`)
      .then(res => res.data)
      .catch(err => console.log(err));
  }
  //"http://localhost:8081/reviewers"

  async getReviewers() {
    return axios
      .get(`${SERVER_URL}/reviewers`)
      .then(res => res.data)
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
        console.log("state after click: ", this.state);
      }
    );
  }

  handleClose() {
    this.setState({ displayModal: false }, () => {});
  }

  handleSave(reviewers, tags, notes) {
    this.saveProposal(this.state.selected._id, reviewers, tags, notes);
  }

  saveProposal(id, assignedReviewers, tags, notes) {
    return axios
      .post(`http://localhost:8081/adminupdate/${id}`, {
        assignedReviewers,
        tags,
        notes
      })
      .then(async res => {
        console.log("here", res);
        const proposals = await this.getProposals();
        this.setState({
          proposals,
          displayModal: false
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    console.log("state: ", this.state);
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
