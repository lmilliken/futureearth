import React, { Component } from "react";

import Investigator from "./components/Investigator";
import InvestigatorCo from "./components/InvestigatorCo";

const axios = require("axios");
const uuidv1 = require("uuid/v1");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //statuses: new, completed, error, invalidFile, pending
      submitStatus: "new",
      submitEndMessage: "",
      investigatorCo: [
        {
          key: uuidv1(),
          firstName: "",
          lastName: "",
          email: "",
          institution: "",
          countryCitizenship: "",
          countryWork: ""
        },
        {
          key: uuidv1(),
          firstName: "",
          lastName: "",
          email: "",
          institution: "",
          countryCitizenship: "",
          countryWork: ""
        }
      ]
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleLeadChange = this.handleLeadChange.bind(this);
    this.handleCoChange = this.handleCoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAdd() {
    var coInvestigators = this.state.investigatorCo;
    coInvestigators.push({
      key: uuidv1(),
      firstName: "",
      lastName: "",
      email: "",
      institution: "",
      countryCitizenship: "",
      countryWork: ""
    });
    this.setState(
      {
        investigatorCo: coInvestigators
      },
      () => {
        console.log("new state: ", this.state);
      }
    );
  }

  handleLeadChange(_, field, value) {
    //we actually don't need to do anything, but we need this here still
    // var newLead = this.state.investigatorLead.slice()
    // newLead[0][field] = value
    // this.setState({investigatorLead: newLead}, ()=>{console.log("updated state: ", this.state)})
  }

  handleCoChange(index, field, value) {
    // console.log("handle co change at index: ", index)
    // console.log("handle co change at field: ", field)
    // console.log("handle co change at value: ", value)
    var tempArray = this.state.investigatorCo;
    tempArray[index][field] = value;
    this.setState({ investigatorCo: tempArray }, () => {
      console.log("updated state: ", this.state);
    });
  }

  handleRemove(index) {
    console.log("index", index);
    var coInvestigators = this.state.investigatorCo.slice();
    coInvestigators.splice(index, 1);
    console.log("new co investigators: ", coInvestigators);

    this.setState({ investigatorCo: coInvestigators }, () => {
      console.log("updated state after remove: ", this.state);
    });
  }

  handleSubmit(event) {
    //"https://pegasus2018-server.herokuapp.com/submit"  "http://localhost:8081/submit"
    event.preventDefault();
    this.setState({ submitStatus: "pending" });

    console.log("submit!");
    const data = new FormData(event.target);
    ///check if investigators is array or a single person
    // console.log("data: ", event.target);
    // fetch("http://localhost:8081/submit", {
    //   method: "POST",
    //   body: data
    // })

    axios
      .post("https://pegasus2018-server.herokuapp.com/submit", data)
      .then(response => {
        console.log({ response });
        if (response.status === 200) {
          this.setState({ submitStatus: "completed" });
        } else if (response.status === 400) {
          this.setState({
            submitStatus: "error",
            submitEndMessage:
              response.statusText +
              " Please contact Laurel Milliken at laurel.milliken@futureearth.org"
          });
        } else if (response.status === 401) {
          this.setState({
            submitStatus: "invalidFile",
            submitEndMessage: response.statusText
          });
        }

        // console.log("status: ", this.state.submitEndMessage);
      })
      .catch(err => {
        console.log(err);
      });
  } //handleSubmit

  render() {
    console.log("environment: ", process.env.NODE_ENV);
    if (this.state.submitStatus === "completed") {
      return (
        <center>
          <p>Thank you for submitting you application. It has been received.</p>
        </center>
      );
    } else if (
      this.state.submitStatus === "new" ||
      this.state.submitStatus === "pending" ||
      this.state.submitStatus === "invalidFile" ||
      this.state.submitStatus === "error"
    ) {
      var coInvestigators = this.state.investigatorCo.map((item, index) => {
        return (
          <InvestigatorCo
            key={item.key}
            index={index}
            firstName={item.firstName}
            lastName={item.lastName}
            email={item.email}
            institution={item.institution}
            countryCitizenship={item.countryCitizenship}
            countryWork={item.countryWork}
            handleChange={this.handleCoChange}
            remove={this.handleRemove}
          />
        );
      });

      return (
        <div className="App container">
          <form
            encType="multipart/form-data"
            id="pegasusForm"
            onSubmit={this.handleSubmit}
          >
            <div className="container form-row">
              <div className="form-group col-md-12">
                <label htmlFor="proposalTitle">Full Title of Proposal:</label>
                <input
                  required
                  className="form-control"
                  type="text"
                  name="title"
                  id="proposalTitle"
                />
              </div>
            </div>

            <h4>Lead Principal Investigator</h4>
            <div id="investigator-lead">
              <Investigator handleChange={this.handleLeadChange} />
            </div>

            <h4>Co-Investigator(s)</h4>
            <div id="investigators-list">{coInvestigators}</div>
            <center>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.handleAdd}
              >
                Add a Co-Investigator
              </button>
            </center>

            <h4>File Uploads</h4>
            <p>
              NOTE: Only .pdf files will be accepted. You can use this{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://smallpdf.com/pdf-converter"
              >
                tool
              </a>{" "}
              to convert your files to .pdf format.
            </p>
            <div className="form-group">
              <label htmlFor="uploadProposal">Upload your proposal.</label>
              <input
                style={
                  this.state.submitStatus === "invalidFile"
                    ? { border: "2px dashed red" }
                    : {}
                }
                id="uploadProposal"
                type="file"
                name="uploadProposal"
                accept="application/pdf"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="uploadBudget">Upload your budget.</label>
              <input
                style={
                  this.state.submitStatus === "invalidFile"
                    ? { border: "2px dashed red" }
                    : {}
                }
                id="uploadBudget"
                type="file"
                name="uploadBudget"
                accept="application/pdf"
                required
              />
            </div>

            <center>
              <input type="checkbox" name="checkbox" value="check" id="agree" />{" "}
              By submitting this form I agree to research, innovation,
              sustainability, and the Oxford comma.
              <br />
              {this.state.submitStatus === "error" && (
                <p style={errorStyle}>{this.state.submitEndMessage}</p>
              )}
              {this.state.submitStatus === "invalidFile" && (
                <p style={errorStyle}>{this.state.submitEndMessage}</p>
              )}
              {this.state.submitStatus === "pending" && (
                <div
                  className="progress"
                  style={{ width: "200px", margin: "auto" }}
                >
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="20"
                    aria-valuemin="0"
                    aria-valuemax="20"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                style={submitStyle}
              >
                Submit
              </button>
            </center>
          </form>
        </div>
      );
    } else {
      return (
        <p>
          Oops, something went wrong. Please contact Laurel Milliken at
          laurel.milliken@futureearth.org
        </p>
      );
    }
  } //render
} //app

const invalidFile = {
  border: "2px dashed red"
};

const errorStyle = {
  color: "red",
  fontWeight: "bold",
  marginTop: "16px",
  marginBottom: "0px"
};

const submitStyle = {
  margin: "15px"
};

export default App;
