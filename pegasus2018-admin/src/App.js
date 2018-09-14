import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import ProposalRow from "./components/ProposalRow";

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
    console.log("component is about to mount!");
    const data = await this.getProposals();
    this.setState({ proposals: data.data.returnedStuff });
    console.log("state", this.state);
  }

  async getProposals() {
    return axios
      .get("http://localhost:8081/proposals")
      .then(res => res)
      .catch(err => console.log(err));
  }

  handleRowClick() {
    // this.setState({
    //   selected: this.state.data.id,
    //   displayModal: true
    // });
    console.log("row clicked");
  }

  render() {
    let proposals = this.state.proposals.map(aProposal => {
      return <ProposalRow key={aProposal._id} props={aProposal} />;
    });

    console.log("proposals inside of render", this.state.proposals);
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
      </div>
    );
  }
}

export default App;
