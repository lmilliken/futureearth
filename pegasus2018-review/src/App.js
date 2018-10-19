import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import ProposalRow from "./components/ProposalRow";
import ReviewModal from "./components/ReviewModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusOK: true,
      assignedProposals: [],
      selected: {},
      displayModal: false
    };
    this.getAssignedProposals = this.getAssignedProposals.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ displayModal: false }, () => {});
  }

  async handleSave(reviewers, tags, notes) {
    this.setState({ displayModal: false }, () => {});
  }

  handleRowClick(id) {
    let selectedProposal = this.state.assignedProposals.filter(
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

  async componentWillMount() {
    console.log("component will mount");
    const data = await this.getAssignedProposals();

    this.setState({ assignedProposals: data }, () =>
      console.log("state: ", this.state)
    );
  }

  async getAssignedProposals() {
    // let HLAuthToken = this.getCookieValue("HLAuthToken");
    // if (!HLAuthToken) {
    //   return this.setState({
    //     statusOK: false,
    //     statusMessage: "Error: User has no HLAuthToken.  Please contact Laurel."
    //   });
    // }

    console.log("token: ", this.getCookieValue("HLAuthToken"));

    const options = {
      method: "GET",
      url: "http://localhost:8081/reviewers/assigned",
      headers: {
        HLAuthToken:
          this.getCookieValue("HLAuthToken") ||
          "8FeaXCM0MWDFIO3TRHX5+d81h2TX2qB93Hl+2BWqa+UQ+Ww1xjHwo2eZOaIG5KZPxySUydkGQIgauKBrOHhmEb+RusZM89wHlR6SiU1QH8N5pHyDrD7QhACUD/ryC+Wa"
      }
    };

    return axios(options)
      .then(res => res.data.assignedReviews)
      .catch(err => {
        console.log("there is an error", err.response);
        let errorMessage = err;
        if (err.response) {
          errorMessage = err.response.statusText;
        }
        this.setState({
          statusOK: false,
          statusMessage: errorMessage
        });
      });
  }

  getCookieValue(cookieName) {
    var b = document.cookie.match(
      "(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]+)"
    );
    return b ? b.pop() : null;
  }

  render() {
    if (this.state.statusOK === false) {
      return (
        <p className="error-message">{this.state.statusMessage.toString()}</p>
      );
    } else {
      let incompleteProposals = this.state.assignedProposals.map(aProposal => {
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
          <p>Please complete a review of the following proposals:</p>
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="text-left">Title</th>
                <th className="text-left">Lead</th>
                <th className="text-left">Tags</th>
              </tr>
            </thead>
            <tbody>{incompleteProposals}</tbody>
          </table>

          {this.state.displayModal === true && (
            <ReviewModal
              {...this.state.selected}
              key={this.state.selected._id}
              handleModalClose={this.handleClose}
              handleModalSave={this.handleSave}
            />
          )}
        </div>
      );
    }
  }
}

export default App;
