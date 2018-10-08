import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Select from "react-select";
import Card from "./components/Card";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      keywords: [],
      selectedThemes: [],
      selectedLeads: []
    };
    this.handleThemes = this.handleThemes.bind(this);
    this.handleLeads = this.handleLeads.bind(this);
    this.handleKeywords = this.handleKeywords.bind(this);
    this.search = this.search.bind(this);
    this.clearKeywords = this.clearKeywords.bind(this);
  }

  clearKeywords() {
    this.setState({ keywords: [] });
  }

  handleKeywords = event => {
    const words = event.target.value
      .trim()
      .split(/[,]+/)
      .join(" ");
    this.setState({ keywords: event.target.value });
  };

  search(e) {
    // console.log("search leads: ", this.state.selectedLeads);
    // https://fe-server.herokuapp.com/
    e.preventDefault();
    return axios
      .get("http://localhost:8081/mtl-consortium-search", {
        params: {
          keywords:
            this.state.keywords.length > 0
              ? this.state.keywords
                  .trim()
                  .split(/[,]+/)
                  .join(" ")
              : "",
          themes: this.state.selectedThemes,
          leads: this.state.selectedLeads
        }
      })
      .then(res => {
        console.log(res);
        this.setState({ searchResults: res.data });
      })
      .catch(err => console.log(err));
  }

  handleLeads = selectedLeads => {
    this.setState({ selectedLeads });
    console.log(`Option selected:`, selectedLeads);
  };

  handleThemes = selectedThemes => {
    this.setState({ selectedThemes });
    console.log(`Option selected:`, selectedThemes);
  };

  // getInstitutions() {
  //   return axios
  //     .get("https://fe-server.herokuapp.com/mtl-consortium")
  //     .then(res => res.data)
  //     .catch(err => console.log(err));
  // }
  render() {
    // let cards = this.state.institutions.map(member => {
    //   return <Card {...member} key={member._id} />;
    // });

    console.log("state", this.state);
    const themeOptions = [
      { value: "K_CP", label: "Consumption & Production" },
      { value: "K_DECARB", label: "Decarbonisation" },
      { value: "K_FE", label: "Finance & Economics" },
      { value: "K_FWE", label: "Food-Water-Energy" },
      { value: "K_HEALTH", label: "Health" },
      { value: "K_NA", label: "Natural Assets" },
      { value: "K_OCEAN", label: "Ocean" },
      { value: "K_RISK", label: "Risk" },
      { value: "K_URBAN", label: "Urban" }
    ];

    const leadOptions = [
      {
        value: "École de technologie supérieure",
        label: "École de technologie supérieure"
      },
      {
        value: "École polytechnique de Montréal",
        label: "École polytechnique de Montréal"
      },
      { value: "HEC Montréal", label: "HEC Montréal" },
      { value: "Université Laval", label: "Université Laval" },
      { value: "Université de Montréal", label: "Université de Montréal" },
      { value: "Université de Sherbrooke", label: "Université de Sherbrooke" },
      { value: "Université du Québec", label: "Université du Québec" },
      {
        value: "Université du Québec à Chicoutimi",
        label: "Université du Québec à Chicoutimi"
      },
      {
        value: "Université du Québec à Montréal",
        label: "Université du Québec à Montréal"
      },
      {
        value: "Université du Québec en Abitibi-Témiscamingue",
        label: "Université du Québec en Abitibi-Témiscamingue"
      },
      { value: "McGill University", label: "McGill University" },
      { value: "Concordia University", label: "Concordia University" },
      { value: "INRS", label: "INRS" },
      {
        value: "Université du Québec à Rimouski",
        label: "Université du Québec à Rimouski"
      }
    ];
    // console.log(Object.keys(themes));
    // Object.keys(themes).map(function(key, index) {
    //   console.log(key + ": " + themes[key]);
    // });

    // console.log("themese ", themesSelect);

    // {this.state.submitStatus === "pending" && (
    //   <div
    //     className="progress"
    //     style={{ width: "200px", margin: "auto" }}
    //   >
    //     <div
    //       className="progress-bar progress-bar-striped progress-bar-animated"
    //       role="progressbar"
    //       aria-valuenow="20"
    //       aria-valuemin="0"
    //       aria-valuemax="20"
    //       style={{ width: "100%" }}
    //     />
    //   </div>
    // )}

    let cards;
    if (this.state.searchResults.length > 0) {
      cards = this.state.searchResults.map(thisOne => {
        return <Card {...thisOne} key={thisOne._id} />;
      });
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Keywords"
              aria-describedby="basic-addon2"
              onChange={this.handleKeywords}
              value={this.state.keywords}
            />
            {/* <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className="css-19bqh2r"
            >
              <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
            </svg> */}

            {this.state.keywords.length > 0 && (
              <span
                id="searchclear"
                style={searchClear}
                className="glyphicon glyphicon-remove"
                onClick={this.clearKeywords}
              />
            )}
          </div>
          <div className="col-md-4">
            <Select
              // value={selectedOption}
              onChange={this.handleThemes}
              isMulti={true}
              options={themeOptions}
              placeholder="Themes"
            />
          </div>

          <div className="col-md-4">
            <Select
              // value={selectedOption}
              onChange={this.handleLeads}
              isMulti={true}
              options={leadOptions}
              placeholder="Lead Institutions"
            />
          </div>
          <div className="col-md-1">
            <button className="btn btn-primary" onClick={this.search}>
              Search
            </button>
          </div>
        </div>

        <div className="gridContainer" style={constainerStyle}>
          {cards}
        </div>
        {this.state.searchResults.length === 0 && (
          <div>Search for institutions.</div>
        )}
      </div>
    );
  }
}

const constainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
  gridGap: "15px",
  gridAutoRows: "auto"
};

const searchClear = {
  position: "absolute",
  right: "20px",
  top: "0",
  bottom: "0",
  height: "14px",
  margin: "auto",
  // marginRight: "3px",
  fontSize: "14px",
  cursor: "pointer",
  color: "#ccc"
};

export default App;
